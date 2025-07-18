
import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { name: 'Inicio', href: '#home' },
        { name: 'Servicios', href: '#services' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Sobre mí', href: '#about' },
        { name: 'Contacto', href: '#contact' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                        <span className="text-blue-500">&lt;</span>
                        <span>MaximoDev</span>
                        <span className="text-blue-500">&gt;</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
