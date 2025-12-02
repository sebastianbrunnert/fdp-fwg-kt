import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-200 py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <div className="text-white font-bold text-xl mb-2">
                            FDP-FWG Kreistagsfraktion
                        </div>
                        <div className="text-sm mb-3">
                            © 2025 Kreistagsfraktion FDP-FWG Minden-Lübbecke
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-white">Impressum</a>
                        <a href="#" className="hover:text-white">Datenschutz</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
