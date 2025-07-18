import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import Footer from '../components/Footer';

const LoadingSpinner = () => (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600">Cargando Proyecto...</p>
    </div>
);

const ProjectDetailPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { projects, loading } = usePortfolio();
    
    if (loading) {
        return <LoadingSpinner />;
    }

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center text-center bg-white">
                <div>
                    <h1 className="text-4xl font-bold">Proyecto no encontrado</h1>
                    <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">Volver al inicio</Link>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <div className="bg-white min-h-screen">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="container mx-auto px-6 py-12">
                        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-500 transition-colors mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Proyectos
                        </Link>

                        <motion.div layoutId={`project-card-${project.id}`}>
                            <motion.h1 layoutId={`project-title-${project.id}`} className="text-4xl md:text-6xl font-black text-gray-800">{project.title}</motion.h1>
                            <motion.p layoutId={`project-category-${project.id}`} className="text-xl text-blue-500 font-medium mt-2 mb-8">{project.category}</motion.p>
                            
                            <motion.div layoutId={`project-image-${project.id}`} className="w-full rounded-xl shadow-2xl overflow-hidden mb-12">
                                <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
                            </motion.div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2">
                                <section className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">El Problema</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed">{project.problem}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">Mi Solución</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed">{project.solution}</p>
                                </section>
                            </div>

                            <aside>
                                <div className="bg-gray-50 p-6 rounded-xl shadow-lg sticky top-28">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Impacto Cuantificable</h3>
                                    <div className="space-y-4 mb-6">
                                        {project.impact.map(metric => (
                                            <div key={metric.label} className="bg-white p-4 rounded-lg shadow">
                                                <p className="text-3xl font-bold text-orange-500">{metric.value}</p>
                                                <p className="text-gray-500">{metric.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-4 pt-4 border-t">Pila Tecnológica</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{tech}</span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex space-x-4">
                                        {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">Ver Sitio</a>}
                                        {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition">Ver Código</a>}
                                    </div>
                                </div>
                            </aside>
                        </div>

                    </div>
                    <Footer />
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectDetailPage;
