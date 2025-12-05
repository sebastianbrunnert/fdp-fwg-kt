import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { API_BASE_URL, getImageUrl } from '../utils/api';

const HomePage = () => {
    const [showExtendedFraktion, setShowExtendedFraktion] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [news, setNews] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [newsRes, membersRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/news`),
                fetch(`${API_BASE_URL}/api/members`)
            ]);

            const newsData = await newsRes.json();
            const membersData = await membersRes.json();

            setNews(newsData.slice(0, 4));
            setMembers(membersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Auto-hide success message after 5 seconds
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const kernfraktion = members.filter(m => m.is_core_member);
    const erweiterteFraktion = members.filter(m => !m.is_core_member);

    return (
        <div className="min-h-screen bg-white">
            <style>{`
        .decorative-line {
          position: relative;
        }
        .decorative-line::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 60px;
          height: 3px;
          background: #E6007E;
          transform: translateY(-50%);
        }
      `}</style>

            <Navigation />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gray-50">
                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-4 py-2 mb-6 bg-orange-600 text-white font-semibold text-sm">
                                Kreistag Minden-Lübbecke
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-gray-900" style={{ lineHeight: '1.1' }}>
                                Für <span className='text-pink-600'>Freiheit</span> und<br />
                                <span className='text-pink-600'>Verantwortung</span><br />
                                in unserem Kreis
                            </h1>
                            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore optio porro, tempora fuga eius architecto facilis, repudianda.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 font-semibold text-white bg-orange-600" onClick={() => window.location.href = '#ziele'}>
                                    Unsere Ziele
                                </button>
                                <button className="px-8 py-4 font-semibold border-2 border-gray-900 text-gray-900" onClick={() => window.location.href = '#kontakt'}>
                                    Kontakt aufnehmen
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="grid grid-cols-2 gap-6">
                                <a
                                    href="https://fdp-minden-luebbecke.de/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-6 border-l-4 border-pink-600"
                                >
                                    <img src="FDP.png" alt="FDP Logo" className="h-24 w-full object-contain" />
                                    <div className="mt-4 text-center text-sm font-medium text-pink-600 hover:underline">
                                        fdp-minden-luebbecke.de →
                                    </div>
                                </a>
                                <a
                                    href="https://www.fwg-muehlenkreis.info/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-6 border-l-4 border-orange-600"
                                >
                                    <img src="FWG.png" alt="FWG Logo" className="h-24 w-full object-contain" />
                                    <div className="mt-4 text-center text-sm font-medium text-orange-600 hover:underline">
                                        fwg-muehlenkreis.info →
                                    </div>
                                </a>
                            </div>
                            <div className="mt-6 text-center text-sm text-gray-700 font-medium">
                                Gemeinsam für Minden-Lübbecke
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vorstellung */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-3">
                            <div className="decorative-line pl-20 mb-6">
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                                    Unsere Fraktion
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                <p className="lg:pl-20">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="lg:pl-20">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="lg:pl-20 font-semibold text-pink-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit - Gemeinsam für Minden-Lübbecke!
                                </p>
                                <div className="lg:pl-20">
                                    <button
                                        className="px-8 py-4 font-semibold text-white bg-orange-600"
                                        onClick={() => window.location.href = '/Statut.docx'}
                                    >
                                        Statut herunterladen
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
                                    alt="Kreistag"
                                    className="relative border border-gray-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="ziele" className="py-24 bg-gradient-to-br from-pink-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="decorative-line pl-20 mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                            Unsere Ziele
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 border-l-4 border-pink-600">
                            <div className="text-pink-600 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-orange-600">
                            <div className="text-orange-600 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-pink-600">
                            <div className="text-pink-600 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-orange-600">
                            <div className="text-orange-600 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-pink-600">
                            <div className="text-pink-600 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-orange-600">
                            <div className="text-orange-600 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* News */}
            <section id="news" className="py-24" style={{ background: '#f8f9fa' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="decorative-line pl-20 mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                            Aktuelles aus der Fraktion
                        </h2>
                    </div>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-pink-600"></div>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {news.map((item) => (
                                <div key={item.id} className="bg-white border border-gray-200">
                                    <div className="relative overflow-hidden" style={{ height: '280px' }}>
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4 px-4 py-2 bg-orange-600 font-bold text-white text-sm">
                                            {new Date(item.date).toLocaleDateString('de-DE')}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                        <Link to={`/news/${item.id}`} className="inline-flex items-center font-semibold text-pink-600">
                                            Weiterlesen
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-16">
                        <Link to="/news" className="px-10 py-4 font-semibold border-2 border-gray-900 text-gray-900 inline-block hover:bg-gray-900 hover:text-white transition-colors">
                            ALLE NACHRICHTEN
                        </Link>
                    </div>
                </div>
            </section>

            {/* Fraktionsmitglieder */}
            <section id="fraktion" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="decorative-line pl-20 mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                            Unsere Fraktionsmitglieder
                        </h2>
                    </div>

                    <div className="mb-20">
                        <div className="grid md:grid-cols-3 gap-10">
                            {kernfraktion.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="relative inline-block mb-6">
                                        <img
                                            src={getImageUrl(member.image)}
                                            alt={member.name}
                                            className="relative w-48 h-48 object-cover border-2 border-gray-200"
                                        />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                        {member.name}
                                    </h4>
                                    <p className="font-semibold mb-6 text-orange-600">
                                        {member.role}
                                    </p>
                                    <div className="space-y-3 text-gray-700">
                                        <div className="flex items-center justify-center">
                                            <Phone className="w-4 h-4 mr-3" />
                                            <span className="text-sm">{member.phone}</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Mail className="w-4 h-4 mr-3" />
                                            <span className="text-sm">{member.email}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => setShowExtendedFraktion(!showExtendedFraktion)}
                            className="flex items-center justify-between w-full px-8 py-6 bg-white border-2 border-gray-200 mb-10"
                        >
                            <h3 className="text-2xl font-bold text-gray-900">
                                Alle Fraktionsmitglieder
                            </h3>
                            {showExtendedFraktion ?
                                <ChevronUp className="w-7 h-7 text-pink-600" /> :
                                <ChevronDown className="w-7 h-7 text-pink-600" />
                            }
                        </button>

                        {showExtendedFraktion && (
                            <div className="grid md:grid-cols-3 gap-10">
                                {erweiterteFraktion.map((member, index) => (
                                    <div key={index} className="text-center">
                                        <div className="relative inline-block mb-6">
                                            <img
                                                src={getImageUrl(member.image)}
                                                alt={member.name}
                                                className="relative w-48 h-48 object-cover border-2 border-gray-200"
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                            {member.name}
                                        </h4>
                                        <p className="text-gray-700 font-semibold mb-6">
                                            {member.role}
                                        </p>
                                        <div className="space-y-3 text-gray-700">
                                            <div className="flex items-center justify-center">
                                                <Phone className="w-4 h-4 mr-3" />
                                                <span className="text-sm">{member.phone}</span>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <Mail className="w-4 h-4 mr-3" />
                                                <span className="text-sm">{member.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Kontakt */}
            <section id="kontakt" className="py-24 bg-gradient-to-br from-pink-50 to-orange-50">
                <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                                Kontakt
                            </h2>
                            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                                Sie haben Fragen oder Anregungen? Wir freuen uns auf Ihre Nachricht!
                            </p>
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="bg-orange-600 p-3 mr-6">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg mb-1">Postanschrift</div>
                                        <div className="text-gray-700">Kreishaus Minden-Lübbecke</div>
                                        <div className="text-gray-700">Portastraße 13</div>
                                        <div className="text-gray-700">32423 Minden</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-orange-600 p-3 mr-6">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-xl text-gray-700">Lorem Ipsum</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-orange-600 p-3 mr-6">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-xl text-gray-700">info@fdp-fwg-kt.de</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-10 border border-gray-200">
                            {/* Success Message */}
                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-green-900">Nachricht erfolgreich gesendet!</p>
                                        <p className="text-sm text-green-700 mt-1">Vielen Dank für Ihre Nachricht. Wir werden uns schnellstmöglich bei Ihnen melden.</p>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start">
                                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-red-900">Fehler beim Senden</p>
                                        <p className="text-sm text-red-700 mt-1">Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-3 text-gray-900">
                                        Ihr Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 focus:border-pink-600 focus:outline-none"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-3 text-gray-900">
                                        IHRE E-MAIL
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 focus:border-pink-600 focus:outline-none"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-3 text-gray-900">
                                        Ihre Nachricht
                                    </label>
                                    <textarea
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 focus:border-pink-600 focus:outline-none"
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-5 font-bold text-white bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
