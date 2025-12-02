import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AllNews = () => {
    const allNews = [
        {
            id: 1,
            title: "Digitalisierung im Kreistag: Neue Initiativen für moderne Verwaltung",
            date: "29.11.2025",
            excerpt: "Die FDP-FWG Fraktion setzt sich für eine umfassende Digitalisierung der Verwaltungsprozesse ein. Bürgerdienste sollen künftig auch online verfügbar sein.",
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
            category: "Digitalisierung"
        },
        {
            id: 2,
            title: "Bildungsoffensive: Mehr Investitionen in Schulen und Kitas",
            date: "25.11.2025",
            excerpt: "Unsere Fraktion fordert verstärkte Investitionen in die Bildungsinfrastruktur. Moderne Lernumgebungen sind der Schlüssel für die Zukunft unserer Kinder.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            category: "Bildung"
        },
        {
            id: 3,
            title: "Wirtschaftsförderung: Unterstützung für lokale Unternehmen",
            date: "20.11.2025",
            excerpt: "Die FDP-FWG Fraktion präsentiert ein umfassendes Konzept zur Förderung des Mittelstands und der Startups in Minden-Lübbecke.",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
            category: "Wirtschaft"
        },
        {
            id: 4,
            title: "Verkehrspolitik: Verbesserung der Infrastruktur im Kreis",
            date: "15.11.2025",
            excerpt: "Neue Konzepte für bessere Verkehrsanbindungen und nachhaltige Mobilität stehen im Fokus unserer aktuellen Arbeit im Kreistag.",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
            category: "Verkehr"
        },
        {
            id: 5,
            title: "Klimaschutz konkret: Energieeffizienz in öffentlichen Gebäuden",
            date: "10.11.2025",
            excerpt: "Die Fraktion hat einen Antrag zur energetischen Sanierung aller kreiseigenen Gebäude eingebracht. Klimaschutz beginnt vor der eigenen Haustür.",
            image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
            category: "Klimaschutz"
        },
        {
            id: 6,
            title: "Bürgerbeteiligung stärken: Neue Formate für Dialog",
            date: "05.11.2025",
            excerpt: "Mit innovativen Beteiligungsformaten wollen wir die Bürgerinnen und Bürger noch stärker in politische Entscheidungsprozesse einbinden.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
            category: "Bürgerbeteiligung"
        },
        {
            id: 7,
            title: "Kulturförderung: Investitionen in die kreative Szene",
            date: "01.11.2025",
            excerpt: "Kunst und Kultur sind wichtige Standortfaktoren. Die FDP-FWG Fraktion setzt sich für bessere Förderung lokaler Kulturschaffender ein.",
            image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
            category: "Kultur"
        },
        {
            id: 8,
            title: "Gesundheitsversorgung: Sicherung der medizinischen Infrastruktur",
            date: "28.10.2025",
            excerpt: "Die Sicherstellung einer wohnortnahen medizinischen Versorgung ist ein zentrales Anliegen unserer Fraktion. Wir setzen uns für den Erhalt und Ausbau der Gesundheitseinrichtungen ein.",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
            category: "Gesundheit"
        },
        {
            id: 9,
            title: "Tourismus fördern: Potenziale der Region besser nutzen",
            date: "22.10.2025",
            excerpt: "Minden-Lübbecke hat touristisch viel zu bieten. Mit gezielten Maßnahmen wollen wir die Region als attraktives Reiseziel noch bekannter machen.",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
            category: "Tourismus"
        }
    ];

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allNews.map((item) => (
                            <Link
                                key={item.id}
                                to={`/news/${item.id}`}
                                className="bg-white border border-gray-200"
                            >
                                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                                    <img
                                        src={item.image}
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
                                        {item.date}
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
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AllNews;
