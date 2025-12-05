import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { API_BASE_URL, getImageUrl, formatDate } from '../utils/api';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/news/${id}`);

            if (!response.ok) {
                // Redirect to home if article not found
                navigate('/');
                return;
            }

            const data = await response.json();
            setArticle(data);
        } catch (error) {
            console.error('Error fetching article:', error);
            // Redirect to home on error
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <div className="flex justify-center items-center h-96">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-pink-600"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
                    <Link to="/news" className="text-pink-600 hover:underline">Zurück zu allen Nachrichten</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Article Header */}
            <article>
                <div className="relative h-96 lg:h-[500px] bg-gray-900">
                    <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-block px-3 py-1 bg-orange-600 text-white font-bold text-sm mb-4">
                                {article.category}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    {formatDate(article.date)}
                                </div>
                                <div className="flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    {article.author}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
                    <Link to="/news" className="inline-flex items-center text-gray-700 hover:text-pink-600 mb-8">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Zurück zu allen Nachrichten
                    </Link>

                    <div
                        className="prose prose-lg max-w-none whitespace-pre-wrap"
                        style={{
                            lineHeight: '1.8'
                        }}
                    >
                        {article.content}
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                <Share2 className="w-5 h-5 mr-2" />
                                Artikel teilen
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    className="p-3 bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                                >
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-3 bg-sky-500 text-white hover:bg-sky-600"
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`, '_blank')}
                                >
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-3 bg-gray-700 text-white hover:bg-gray-800"
                                    onClick={() => window.location.href = `mailto:?subject=${article.title}&body=${window.location.href}`}
                                >
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />

            {/* Custom styles for article content */}
            <style>{`
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #374151;
          margin-bottom: 1.5rem;
        }
      `}</style>
        </div>
    );
};

export default NewsDetail;
