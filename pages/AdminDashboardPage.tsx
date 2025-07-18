import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';
import { HeroData, Service, Project } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboardPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const portfolio = usePortfolio();
    
    // Local form state
    const [currentHero, setCurrentHero] = useState<HeroData | null>(portfolio.heroData);
    const [currentService, setCurrentService] = useState<Service | null>(null);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    
    const [isSaving, setIsSaving] = useState(false);

    // Sync local form state when context data loads/changes
    useEffect(() => {
        setCurrentHero(portfolio.heroData);
    }, [portfolio.heroData]);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const handleHeroSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentHero) return;
        setIsSaving(true);
        try {
            await portfolio.updateHeroData(currentHero);
            alert('Sección Principal actualizada!');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar la Sección Principal.');
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentService) return;
        setIsSaving(true);
        try {
            await portfolio.updateService(currentService);
            alert('Servicio actualizado!');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el servicio.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProject) return;
        setIsSaving(true);
        try {
            await portfolio.updateProject(currentProject);
            alert('Proyecto actualizado!');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el proyecto.');
        } finally {
            setIsSaving(false);
        }
    };

    // Mock analytics data
    const analyticsData = [
        { name: 'Ene', visits: 400, clicks: 240 }, { name: 'Feb', visits: 300, clicks: 139 },
        { name: 'Mar', visits: 200, clicks: 980 }, { name: 'Abr', visits: 278, clicks: 390 },
        { name: 'May', visits: 189, clicks: 480 }, { name: 'Jun', visits: 239, clicks: 380 },
    ];

    const trafficSourceData = [
      { name: 'Directo', value: 400 }, { name: 'Google', value: 300 },
      { name: 'LinkedIn', value: 300 }, { name: 'Otros', value: 200 },
    ];


    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition">
                    Cerrar Sesión
                </button>
            </header>

            <main className="p-8">
                {/* Analytics Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Analítica del Sitio</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                             <h3 className="font-bold mb-4">Visitas y Clics (Últimos 6 meses)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} name="Visitas"/>
                                    <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clics en CTA"/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                             <h3 className="font-bold mb-4">Fuentes de Tráfico</h3>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={trafficSourceData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" width={80}/>
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" name="Visitantes"/>
                                </BarChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Content Management Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Gestión de Contenido</h2>
                    <div className="space-y-8">
                        {/* Hero Editor */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Sección Principal (Hero)</h3>
                            {currentHero && (
                                <form onSubmit={handleHeroSubmit}>
                                    <fieldset disabled={isSaving} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" value={currentHero.titleLine1} onChange={e => setCurrentHero({...currentHero, titleLine1: e.target.value})} className="w-full p-2 border rounded" placeholder="Título Línea 1"/>
                                            <input type="text" value={currentHero.titleLine2} onChange={e => setCurrentHero({...currentHero, titleLine2: e.target.value})} className="w-full p-2 border rounded" placeholder="Título Línea 2"/>
                                        </div>
                                        <textarea value={currentHero.subtitle} onChange={e => setCurrentHero({...currentHero, subtitle: e.target.value})} className="w-full p-2 border rounded" placeholder="Subtítulo"></textarea>
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300">
                                            {isSaving ? 'Guardando...' : 'Actualizar Principal'}
                                        </button>
                                    </fieldset>
                                </form>
                            )}
                        </div>

                        {/* Services Editor */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Servicios</h3>
                            <select onChange={e => setCurrentService(portfolio.services.find(s => s.id === e.target.value) || null)} className="w-full p-2 border rounded mb-4">
                                <option value="">Selecciona un servicio para editar</option>
                                {portfolio.services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                            </select>
                            {currentService && (
                                <form onSubmit={handleServiceSubmit}>
                                    <fieldset disabled={isSaving} className="space-y-4">
                                        <input type="text" value={currentService.title} onChange={e => setCurrentService({...currentService, title: e.target.value})} className="w-full p-2 border rounded" />
                                        <textarea value={currentService.description} onChange={e => setCurrentService({...currentService, description: e.target.value})} className="w-full p-2 border rounded" rows={3}></textarea>
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300">
                                            {isSaving ? 'Guardando...' : 'Actualizar Servicio'}
                                        </button>
                                    </fieldset>
                                </form>
                            )}
                        </div>

                        {/* Projects Editor */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Proyectos</h3>
                            <select onChange={e => setCurrentProject(portfolio.projects.find(p => p.id === e.target.value) || null)} className="w-full p-2 border rounded mb-4">
                                <option value="">Selecciona un proyecto para editar</option>
                                {portfolio.projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                            </select>
                            {currentProject && (
                                <form onSubmit={handleProjectSubmit}>
                                    <fieldset disabled={isSaving} className="space-y-4">
                                        <input type="text" value={currentProject.title} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full p-2 border rounded" placeholder="Título del Proyecto" />
                                        <input type="text" value={currentProject.category} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} className="w-full p-2 border rounded" placeholder="Categoría" />
                                        <input type="text" value={currentProject.imageUrl} onChange={e => setCurrentProject({...currentProject, imageUrl: e.target.value})} className="w-full p-2 border rounded" placeholder="URL de la imagen" />
                                        <h4 className="font-semibold pt-2">Problema:</h4>
                                        <textarea value={currentProject.problem} onChange={e => setCurrentProject({...currentProject, problem: e.target.value})} className="w-full p-2 border rounded" rows={4}></textarea>
                                        <h4 className="font-semibold">Solución:</h4>
                                        <textarea value={currentProject.solution} onChange={e => setCurrentProject({...currentProject, solution: e.target.value})} className="w-full p-2 border rounded" rows={4}></textarea>
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300">
                                            {isSaving ? 'Guardando...' : 'Actualizar Proyecto'}
                                        </button>
                                    </fieldset>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboardPage;
