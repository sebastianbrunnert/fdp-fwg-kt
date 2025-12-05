require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ============ AUTH ROUTES ============

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = bcrypt.compareSync(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ============ NEWS ROUTES ============

// Get all news
app.get('/api/news', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY date DESC').all();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single news
app.get('/api/news/:id', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create news (protected)
app.post('/api/news', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { title, date, excerpt, content, category, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const stmt = db.prepare(`
      INSERT INTO news (title, date, excerpt, content, image, category, author)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(title, date, excerpt, content, image, category, author);
    
    const newNews = db.prepare('SELECT * FROM news WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update news (protected)
app.put('/api/news/:id', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { title, date, excerpt, content, category, author } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
      // Delete old image if it exists
      const oldNews = db.prepare('SELECT image FROM news WHERE id = ?').get(req.params.id);
      if (oldNews && oldNews.image && oldNews.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, oldNews.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const stmt = db.prepare(`
      UPDATE news 
      SET title = ?, date = ?, excerpt = ?, content = ?, image = ?, category = ?, author = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(title, date, excerpt, content, image, category, author, req.params.id);
    
    const updatedNews = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete news (protected)
app.delete('/api/news/:id', authenticateToken, (req, res) => {
  try {
    const news = db.prepare('SELECT image FROM news WHERE id = ?').get(req.params.id);
    if (news && news.image && news.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, news.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const stmt = db.prepare('DELETE FROM news WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ MEMBERS ROUTES ============

// Get all members
app.get('/api/members', (req, res) => {
  try {
    const members = db.prepare('SELECT * FROM members ORDER BY order_position ASC').all();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single member
app.get('/api/members/:id', (req, res) => {
  try {
    const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create member (protected)
app.post('/api/members', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { name, role, phone, email, order_position, is_core_member } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const stmt = db.prepare(`
      INSERT INTO members (name, role, phone, email, image, order_position, is_core_member)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      name,
      role,
      phone || null,
      email || null,
      image || null,
      order_position || 999,
      is_core_member !== undefined ? is_core_member : 1
    );
    
    const newMember = db.prepare('SELECT * FROM members WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update member (protected)
app.put('/api/members/:id', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { name, role, phone, email, order_position, is_core_member } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
      // Delete old image if it exists
      const oldMember = db.prepare('SELECT image FROM members WHERE id = ?').get(req.params.id);
      if (oldMember && oldMember.image && oldMember.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, oldMember.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const stmt = db.prepare(`
      UPDATE members 
      SET name = ?, role = ?, phone = ?, email = ?, image = ?, order_position = ?, is_core_member = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(name, role, phone, email, image, order_position, is_core_member, req.params.id);
    
    const updatedMember = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete member (protected)
app.delete('/api/members/:id', authenticateToken, (req, res) => {
  try {
    const member = db.prepare('SELECT image FROM members WHERE id = ?').get(req.params.id);
    if (member && member.image && member.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, member.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const stmt = db.prepare('DELETE FROM members WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CONTACT ROUTES ============

// Submit contact form (public) - Send email instead of storing
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Alle Felder sind erforderlich' });
    }

    // Send email
    const mailOptions = {
      from: process.env.SMTP_USER || 'webseite@fdp-fwg-kt.de',
      to: 'info@fdp-fwg-kt.de',
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage über die FDP-FWG Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Diese Nachricht wurde über das Kontaktformular auf fdp-fwg-kt.de gesendet.</p>
      `,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Ihre Nachricht wurde erfolgreich gesendet!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.' });
  }
});

// ============ SERVER ============

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🔐 Default login: username=admin, password=PXREFf6ghtNkVBaDkz0Y`);
});
