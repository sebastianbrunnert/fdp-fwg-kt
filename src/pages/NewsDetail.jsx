import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NewsDetail = () => {
    const { id } = useParams();

    // Extended news data with full content
    const newsData = {
        1: {
            title: "Digitalisierung im Kreistag: Neue Initiativen für moderne Verwaltung",
            date: "29.11.2025",
            author: "Felix Abruszat",
            category: "Digitalisierung",
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
            content: `
        <p>Die FDP-FWG Fraktion im Kreistag Minden-Lübbecke hat ein umfassendes Digitalisierungskonzept vorgestellt, das die Verwaltung des Kreises in die digitale Zukunft führen soll. "Moderne Verwaltung bedeutet serviceorientierte, schnelle und transparente Prozesse", betont Fraktionsvorsitzender Felix Abruszat.</p>

        <h3>Online-Bürgerdienste ausbauen</h3>
        <p>Im Zentrum der Initiative steht der Ausbau digitaler Bürgerdienste. Künftig sollen Anträge und Formulare nicht nur vor Ort, sondern auch bequem von zu Hause aus eingereicht werden können. "Wir wollen den Bürgerinnen und Bürgern Zeit sparen und gleichzeitig die Verwaltung effizienter machen", erklärt Claudia Herziger-Möhlmann, stellvertretende Fraktionsvorsitzende.</p>

        <h3>Digitale Ratssitzungen</h3>
        <p>Ein weiterer wichtiger Punkt ist die Einführung digitaler Ratssitzungen. Sitzungsunterlagen sollen künftig digital zur Verfügung gestellt werden, Live-Streams ermöglichen mehr Transparenz und Bürgerbeteiligung. "Die Corona-Pandemie hat gezeigt, dass digitale Sitzungen funktionieren. Diesen Weg wollen wir konsequent weitergehen", so Lars Bunge.</p>

        <h3>Investitionen in IT-Infrastruktur</h3>
        <p>Die Fraktion fordert zudem erhebliche Investitionen in die IT-Infrastruktur des Kreises. Moderne Hardware, sichere Netzwerke und professioneller Support sind die Grundlage für erfolgreiche Digitalisierung. "Wir müssen jetzt die Weichen stellen, um auch in Zukunft wettbewerbsfähig zu bleiben", betont Susanne Engelking.</p>

        <h3>Datenschutz und Sicherheit</h3>
        <p>Bei allen Digitalisierungsbemühungen steht der Schutz persönlicher Daten an erster Stelle. "Digitalisierung und Datenschutz sind kein Widerspruch, sondern müssen Hand in Hand gehen", unterstreicht Martin Klee. Die Fraktion setzt sich für höchste Sicherheitsstandards und transparente Datenverarbeitung ein.</p>

        <p>Der Antrag der FDP-FWG Fraktion wird in der nächsten Kreistagssitzung beraten. Die Fraktion ist zuversichtlich, dass das Konzept breite Unterstützung finden wird und Minden-Lübbecke zum digitalen Vorreiter in der Region werden kann.</p>
      `
        },
        2: {
            title: "Bildungsoffensive: Mehr Investitionen in Schulen und Kitas",
            date: "25.11.2025",
            author: "Claudia Herziger-Möhlmann",
            category: "Bildung",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
            content: `
        <p>Die FDP-FWG Fraktion fordert eine umfassende Bildungsoffensive für den Kreis Minden-Lübbecke. "Bildung ist die wichtigste Investition in unsere Zukunft", betont die stellvertretende Fraktionsvorsitzende Claudia Herziger-Möhlmann bei der Vorstellung des Konzepts.</p>

        <h3>Sanierung und Modernisierung</h3>
        <p>Viele Schulgebäude im Kreis sind sanierungsbedürftig. Die Fraktion schlägt ein umfassendes Sanierungsprogramm vor, das nicht nur bauliche Mängel behebt, sondern auch moderne Lernumgebungen schafft. "Unsere Kinder verdienen Schulen, in denen sie gerne lernen und sich wohlfühlen", so Lars Bunge.</p>

        <h3>Digitale Ausstattung</h3>
        <p>Zur modernen Bildung gehört auch digitale Ausstattung. Die Fraktion fordert, dass alle Schulen mit zeitgemäßer Technik ausgestattet werden – von Smartboards über Tablets bis hin zu schnellem Internet. "Digitale Kompetenz ist heute genauso wichtig wie Lesen und Schreiben", erklärt Susanne Engelking.</p>

        <h3>Mehr Betreuungsplätze</h3>
        <p>Auch im Bereich der frühkindlichen Bildung sieht die Fraktion Handlungsbedarf. Der Ausbau von Kita-Plätzen muss vorangetrieben werden, um Familien zu entlasten und Kindern optimale Startchancen zu geben. "Gute Betreuung ist nicht nur familienfreundlich, sondern auch volkswirtschaftlich sinnvoll", betont Martin Klee.</p>

        <h3>Lehrkräfte unterstützen</h3>
        <p>Die Fraktion setzt sich zudem für bessere Arbeitsbedingungen für Lehrkräfte ein. Moderne Arbeitsplätze, ausreichend Fachpersonal und kontinuierliche Fortbildungsangebote sind wichtige Faktoren, um den Lehrerberuf attraktiver zu machen.</p>

        <p>Mit diesem Konzept will die FDP-FWG Fraktion sicherstellen, dass alle Kinder und Jugendlichen im Kreis die bestmögliche Bildung erhalten und optimal auf ihre Zukunft vorbereitet werden.</p>
      `
        },
        3: {
            title: "Wirtschaftsförderung: Unterstützung für lokale Unternehmen",
            date: "20.11.2025",
            author: "Lars Bunge",
            category: "Wirtschaft",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
            content: `
        <p>Die FDP-FWG Fraktion präsentiert ein umfassendes Konzept zur Wirtschaftsförderung in Minden-Lübbecke. "Starke lokale Unternehmen sind das Rückgrat unserer Region", erklärt Lars Bunge, wirtschaftspolitischer Sprecher der Fraktion.</p>

        <h3>Bürokratieabbau vorantreiben</h3>
        <p>Ein zentrales Anliegen ist der Abbau unnötiger Bürokratie. Genehmigungsverfahren sollen beschleunigt, Anträge vereinfacht und digitale Lösungen geschaffen werden. "Unternehmer sollen sich aufs Geschäft konzentrieren können, nicht auf Formulare", so Bunge.</p>

        <h3>Startup-Förderung</h3>
        <p>Besonderes Augenmerk legt die Fraktion auf die Förderung von Startups und jungen Unternehmen. Ein Gründerzentrum mit kostengünstigen Büroflächen, Beratungsangeboten und Netzwerkmöglichkeiten soll geschaffen werden. "Innovation braucht Raum und Unterstützung", betont Felix Abruszat.</p>

        <h3>Fachkräftesicherung</h3>
        <p>Die Fraktion setzt sich zudem für Maßnahmen zur Fachkräftesicherung ein. Durch Kooperationen mit Schulen und Hochschulen, attraktive Ausbildungsangebote und gezielte Zuwanderung qualifizierter Arbeitskräfte soll dem Fachkräftemangel begegnet werden.</p>

        <h3>Gewerbeflächen entwickeln</h3>
        <p>Um Unternehmen Wachstum zu ermöglichen, fordert die Fraktion die Ausweisung neuer Gewerbeflächen in strategisch günstigen Lagen. "Wir brauchen Platz für Investitionen und Arbeitsplätze", erklärt Martin Klee.</p>

        <p>Mit diesem Wirtschaftskonzept will die FDP-FWG Fraktion Minden-Lübbecke als attraktiven Wirtschaftsstandort stärken und zukunftsfähige Arbeitsplätze sichern.</p>
      `
        },
        4: {
            title: "Verkehrspolitik: Verbesserung der Infrastruktur im Kreis",
            date: "15.11.2025",
            author: "Susanne Engelking",
            category: "Verkehr",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
            content: `
        <p>Die FDP-FWG Fraktion hat ein umfassendes Verkehrskonzept für Minden-Lübbecke vorgelegt. "Mobilität ist Freiheit – und gute Infrastruktur die Grundlage dafür", betont Susanne Engelking, verkehrspolitische Sprecherin der Fraktion.</p>

        <h3>Straßen sanieren</h3>
        <p>Viele Straßen im Kreis sind in schlechtem Zustand. Die Fraktion fordert ein ambitioniertes Sanierungsprogramm, das systematisch die größten Mängel beseitigt. "Gute Straßen sind nicht nur komfortabel, sondern auch sicherer", erklärt Engelking.</p>

        <h3>ÖPNV ausbauen</h3>
        <p>Der öffentliche Nahverkehr muss attraktiver werden. Mehr Verbindungen, längere Taktzeiten und bessere Anschlüsse sind zentrale Forderungen. "Wer aufs Auto verzichten will, braucht Alternativen", so Claudia Herziger-Möhlmann.</p>

        <h3>Radwege erweitern</h3>
        <p>Die Fraktion setzt sich für den Ausbau des Radwegenetzes ein. Sichere, durchgängige Verbindungen zwischen den Orten fördern nachhaltige Mobilität. "Das Fahrrad ist nicht nur umweltfreundlich, sondern auch gesund", betont Lars Bunge.</p>

        <h3>Elektromobilität fördern</h3>
        <p>Um die Verkehrswende zu unterstützen, fordert die Fraktion den Ausbau der Ladeinfrastruktur für Elektrofahrzeuge. Öffentliche Ladestationen an strategisch wichtigen Punkten sollen flächendeckend verfügbar sein.</p>

        <p>Mit diesem Konzept will die FDP-FWG Fraktion eine zukunftsfähige, nachhaltige und bürgerfreundliche Mobilität in Minden-Lübbecke ermöglichen.</p>
      `
        }
    };

    const article = newsData[id] || newsData[1]; // Fallback to first article

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Article Header */}
            <article>
                <div className="relative h-96 lg:h-[500px] bg-gray-900">
                    <img
                        src={article.image}
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
                                    {article.date}
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
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        style={{
                            lineHeight: '1.8'
                        }}
                    />

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

                    {/* Contact CTA */}
                    <div className="mt-16 p-8 bg-gradient-to-br from-pink-50 to-orange-50 border-l-4 border-pink-600">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Fragen oder Anregungen?
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Haben Sie Fragen zu diesem Thema oder möchten Sie mehr erfahren?
                            Kontaktieren Sie uns gerne direkt.
                        </p>
                        <Link
                            to="/#kontakt"
                            className="inline-block px-8 py-4 font-semibold text-white bg-pink-600 hover:bg-pink-700"
                        >
                            Kontakt aufnehmen
                        </Link>
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
