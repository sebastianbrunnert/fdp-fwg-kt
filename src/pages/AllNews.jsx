import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { API_BASE_URL, getImageUrl, formatDate } from '../utils/api';

const AllNews = () => {
    const [allNews, setAllNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/news`);
            const data = await response.json();
            setAllNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-pink-50 to-orange-50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <Link to="/" className="inline-flex items-center text-gray-700 hover:text-pink-600 mb-8">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Zurück zur Startseite
                    </Link>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Alle Nachrichten
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl">
                        Bleiben Sie auf dem Laufenden über unsere Arbeit im Kreistag Minden-Lübbecke.
                        Hier finden Sie alle Nachrichten, Pressemitteilungen und Berichte unserer Fraktion.
                    </p>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-pink-600"></div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allNews.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/news/${item.id}`}
                                    className="bg-white border border-gray-200"
                                >
                                    <div className="relative overflow-hidden" style={{ height: '220px' }}>
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-orange-600 font-bold text-white text-xs">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {formatDate(item.date)}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                        <div className="inline-flex items-center font-semibold text-pink-600">
                                            Weiterlesen
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AllNews;
