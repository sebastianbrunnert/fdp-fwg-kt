import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center" style={{ height: '90px' }}>
                    <Link to="/" className="flex items-center space-x-4">
                        <div className="text-3xl font-bold text-gray-900">
                            FDP-FWG
                            <div className="text-sm font-normal text-gray-700">
                                Kreistagsfraktion
                            </div>
                        </div>
                    </Link>
                    <div className="hidden lg:flex items-center space-x-10">
                        <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium">
                            Start
                        </Link>
                        <Link to="/news" className="text-gray-700 hover:text-pink-600 font-medium">
                            Aktuelles
                        </Link>
                        <a href="/#fraktion" className="text-gray-700 hover:text-pink-600 font-medium">
                            Fraktion
                        </a>
                        <a href="/#kontakt" className="text-gray-700 hover:text-pink-600 font-medium">
                            Kontakt
                        </a>
                    </div>
                    <button
                        className="lg:hidden text-gray-900"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="lg:hidden pb-6">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium">
                                Start
                            </Link>
                            <Link to="/news" className="text-gray-700 hover:text-pink-600 font-medium">
                                Aktuelles
                            </Link>
                            <a href="/#fraktion" className="text-gray-700 hover:text-pink-600 font-medium">
                                Fraktion
                            </a>
                            <a href="/#kontakt" className="text-gray-700 hover:text-pink-600 font-medium">
                                Kontakt
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
