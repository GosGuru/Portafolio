import React from 'react';
import { motion, Variants } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { usePortfolio } from '../hooks/usePortfolio';
import { Icon } from '../components/icons/IconMap';

const LoadingSpinner = () => (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600">Cargando Portafolio...</p>
    </div>
);

const HomePage = () => {
    const { loading, error, heroData, services, projects, aboutMeData, contactData } = usePortfolio();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };
    
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
             <div className="h-screen w-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
                <h2 className="text-2xl font-bold text-red-600">Error al Cargar el Contenido</h2>
                <p className="mt-2 text-gray-700">No se pudo obtener la información del portafolio desde la base de datos.</p>
                <div className="mt-4 text-sm text-left text-gray-600 bg-red-100 border border-red-200 p-4 rounded-md max-w-2xl w-full">
                    <p className="font-bold">Detalle del error:</p>
                    <code className="block whitespace-pre-wrap mt-1">{error}</code>
                </div>
                <p className="mt-4 text-sm text-gray-500 max-w-2xl w-full text-left">
                    <strong>Sugerencia:</strong> Este error a menudo es causado por las políticas de Seguridad a Nivel de Fila (RLS) en Supabase. Asegúrese de que las tablas (<code className="text-xs bg-gray-200 p-1 rounded">hero</code>, <code className="text-xs bg-gray-200 p-1 rounded">services</code>, etc.) tengan una política de RLS que permita el acceso de lectura (<code className="text-xs bg-gray-200 p-1 rounded">SELECT</code>) al rol <code className="text-xs bg-gray-200 p-1 rounded">anon</code>. Revise la consola del navegador para más detalles técnicos.
                </p>
            </div>
        );
    }
    
    if (!heroData || !services || !projects || !aboutMeData || !contactData) {
        return <div className="h-screen w-screen flex items-center justify-center text-red-500">Faltan datos para mostrar el portafolio. Compruebe si la base de datos está poblada.</div>;
    }

    return (
        <div className="bg-gray-50">
            <Header />
            <main>
                {/* Hero Section */}
                <section id="home" className="relative text-center py-24 md:py-32 lg:py-40 bg-white">
                     <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
                     <div className="container mx-auto px-6 relative">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div className="inline-flex items-center space-x-4 mb-6">
                               <div className="text-blue-500 text-3xl font-black">&lt;/&gt;</div>
                               <div className="text-green-500 text-3xl font-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 011 1v-.5z" />
                                </svg>
                               </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight">
                                {heroData.titleLine1}
                                <span className="text-blue-500 relative inline-block mx-2">
                                    {heroData.titleLine2}
                                    <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/30 -mb-1"></span>
                                </span>
                            </h1>
                            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                                {heroData.subtitle}
                            </p>
                            <a href={heroData.ctaLink} onClick={(e) => handleScroll(e, heroData.ctaLink)} className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300">
                                {heroData.ctaText}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </section>
                
                {/* Services Section */}
                <section id="services" className="py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <motion.div initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mis Servicios</h2>
                            <p className="mt-4 text-lg text-gray-600">Soluciones digitales pensadas para potenciar tu presencia online.</p>
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {services.map((service) => (
                                <motion.div key={service.id} variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-start space-x-6">
                                    <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
                                        <Icon name={service.icon} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                                        <p className="text-gray-600">{service.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
                
                {/* Projects Section */}
                <section id="projects" className="py-20 md:py-28 bg-white">
                    <div className="container mx-auto px-6">
                        <motion.div initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mis Proyectos Destacados</h2>
                            <p className="mt-4 text-lg text-gray-600">Una muestra de mi trabajo y las soluciones que he construido.</p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* About Me Section */}
                <section id="about" className="py-20 md:py-28">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <motion.div initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Un Poco Sobre Mí</h2>
                        </motion.div>
                        <motion.div 
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {aboutMeData.points.map((point) => (
                                <motion.div key={point.id} variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Icon name={point.icon} />
                                    </div>
                                    <p className="text-gray-700 text-lg">{point.text}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 md:py-28 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                            <div className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                               </svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">¿Tenés una idea?</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Hacela realidad conmigo. Escribime por WhatsApp o enviame un email para empezar a construir tu proyecto.</p>
                            <div className="mt-8 flex justify-center items-center space-x-4">
                                <a href={contactData.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                       <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.834 8.834 0 01-4.196-1.125l-2.434.812a1 1 0 00-1.152 1.151l.812-2.434A8.834 8.834 0 012 10c0-4.418 3.582-8 8-8s8 3.582 8 8zm-5-1a1 1 0 10-2 0v2a1 1 0 102 0v-2zm-4 0a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd" />
                                    </svg>
                                    WhatsApp
                                </a>
                                <a href={contactData.emailLink} className="inline-flex items-center px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow-md border border-orange-500 hover:bg-orange-50 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    Email
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;