
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white py-8">
            <div className="container mx-auto px-6 text-center text-gray-500">
                <p className="mb-2">
                    Hecho con <span className="text-red-500">❤️</span> por Maximo Gallo desde Durazno, Uruguay.
                </p>
                <p>&copy; {new Date().getFullYear()} Maximo Gallo. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
