import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminLoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const { error: authError } = await login(password);
        
        setIsLoading(false);

        if (authError) {
            setError(authError.message === 'Invalid login credentials' ? 'Contraseña incorrecta.' : authError.message);
        } else {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
                    <p className="text-gray-500">Acceso seguro</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
