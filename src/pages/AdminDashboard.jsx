import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText, Plus, Edit2, Trash2, X } from 'lucide-react';
import { API_BASE_URL, getImageUrl } from '../utils/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('news');
    const [news, setNews] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editItem, setEditItem] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'news') {
                const response = await fetch(`${API_BASE_URL}/api/news`);
                const data = await response.json();
                setNews(data);
            } else if (activeTab === 'members') {
                const response = await fetch(`${API_BASE_URL}/api/members`);
                const data = await response.json();
                setMembers(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const handleDelete = async (id, type) => {
        if (!confirm('Wirklich löschen?')) return;

        try {
            await fetch(`${API_BASE_URL}/api/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            alert('Fehler beim Löschen');
        }
    };

    const handleSave = async (formData, type) => {
        try {
            const isEdit = editItem !== null;
            const url = isEdit
                ? `${API_BASE_URL}/api/${type}/${editItem.id}`
                : `${API_BASE_URL}/api/${type}`;

            const method = isEdit ? 'PUT' : 'POST';

            const form = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== undefined) {
                    form.append(key, formData[key]);
                }
            });

            await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: form
            });

            setShowForm(false);
            setEditItem(null);
            fetchData();
        } catch (error) {
            alert('Fehler beim Speichern');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b-2 border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-600">FDP-FWG Kreistagsfraktion</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-600"
                        >
                            <LogOut className="w-5 h-5" />
                            Abmelden
                        </button>
                    </div>
                </div>
            </nav>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors ${activeTab === 'news'
                                ? 'border-pink-600 text-pink-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FileText className="w-5 h-5" />
                            Nachrichten ({news.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors ${activeTab === 'members'
                                ? 'border-pink-600 text-pink-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Users className="w-5 h-5" />
                            Mitglieder ({members.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Add Button */}
                <div className="mb-6">
                    <button
                        onClick={() => {
                            setEditItem(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white font-medium rounded hover:bg-pink-700"
                    >
                        <Plus className="w-5 h-5" />
                        {activeTab === 'news' ? 'Nachricht hinzufügen' : 'Mitglied hinzufügen'}
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-pink-600"></div>
                    </div>
                ) : (
                    <>
                        {/* News Table */}
                        {activeTab === 'news' && (
                            <NewsTable
                                news={news}
                                onEdit={(item) => { setEditItem(item); setShowForm(true); }}
                                onDelete={(id) => handleDelete(id, 'news')}
                            />
                        )}

                        {/* Members Table */}
                        {activeTab === 'members' && (
                            <MembersTable
                                members={members}
                                onEdit={(item) => { setEditItem(item); setShowForm(true); }}
                                onDelete={(id) => handleDelete(id, 'members')}
                            />
                        )}
                    </>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <FormModal
                    item={editItem}
                    type={activeTab}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditItem(null); }}
                />
            )}
        </div>
    );
};

// News Table Component
const NewsTable = ({ news, onEdit, onDelete }) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Titel</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Kategorie</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Datum</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Autor</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Aktionen</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {news.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                        <td className="px-6 py-4 text-right">
                            <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Members Table Component
const MembersTable = ({ members, onEdit, onDelete }) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Rolle</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Kernfraktion</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Aktionen</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {members.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.is_core_member ? 'Ja' : 'Nein'}</td>
                        <td className="px-6 py-4 text-right">
                            <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Form Modal Component
const FormModal = ({ item, type, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        item || (type === 'news'
            ? { title: '', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', category: 'Allgemein', author: '', image: null }
            : { name: '', role: '', phone: '', email: '', order_position: 999, is_core_member: 1, image: null })
    );
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formData };
        if (imageFile) {
            data.image = imageFile;
        }
        onSave(data, type);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {item ? 'Bearbeiten' : 'Neu erstellen'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {type === 'news' ? (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-2">Titel</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Datum</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Kategorie</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Autor</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Kurzbeschreibung</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    rows="2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Inhalt</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    rows="6"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Bild</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full px-4 py-2 border rounded"
                                />
                                {formData.image && !imageFile && (
                                    <img src={formData.image.startsWith('http') ? formData.image : `${API_BASE_URL}${formData.image}`} alt="Current" className="mt-2 h-32 object-cover" />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Rolle</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Telefon</label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Reihenfolge</label>
                                    <input
                                        type="number"
                                        value={formData.order_position}
                                        onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Kernfraktion</label>
                                    <select
                                        value={formData.is_core_member}
                                        onChange={(e) => setFormData({ ...formData, is_core_member: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 border rounded focus:border-pink-600 focus:outline-none"
                                    >
                                        <option value={1}>Ja</option>
                                        <option value={0}>Nein</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Bild</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full px-4 py-2 border rounded"
                                />
                                {formData.image && !imageFile && (
                                    <img src={formData.image.startsWith('http') ? formData.image : `${API_BASE_URL}${formData.image}`} alt="Current" className="mt-2 h-32 object-cover" />
                                )}
                            </div>
                        </>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-pink-600 text-white font-bold rounded hover:bg-pink-700"
                        >
                            Speichern
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300"
                        >
                            Abbrechen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
