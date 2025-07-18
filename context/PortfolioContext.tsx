import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { HeroData, Service, Project, AboutMeData, ContactData } from '../types';
import { supabase } from '../supabaseClient';

interface PortfolioContextType {
    loading: boolean;
    error: string | null;
    heroData: HeroData | null;
    services: Service[];
    projects: Project[];
    aboutMeData: AboutMeData | null;
    contactData: ContactData | null;
    updateHeroData: (data: HeroData) => Promise<void>;
    updateService: (updatedService: Service) => Promise<void>;
    updateProject: (updatedProject: Project) => Promise<void>;
}

export const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [aboutMeData, setAboutMeData] = useState<AboutMeData | null>(null);
    const [contactData, setContactData] = useState<ContactData | null>(null);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Use .maybeSingle() for singleton data to avoid errors if the table is empty.
                const [heroRes, servicesRes, projectsRes, aboutRes, contactRes] = await Promise.all([
                    supabase.from('hero').select('data').maybeSingle(),
                    supabase.from('services').select('*').order('id', { ascending: true }),
                    supabase.from('projects').select('*').order('id', { ascending: true }),
                    supabase.from('about_me').select('data').maybeSingle(),
                    supabase.from('contact').select('data').maybeSingle(),
                ]);

                // Combine all potential errors to diagnose issues.
                const errors = [heroRes.error, servicesRes.error, projectsRes.error, aboutRes.error, contactRes.error].filter(Boolean);

                if (errors.length > 0) {
                    // Throw the first encountered error to be caught by the catch block.
                    throw errors[0];
                }

                // Safely set state, falling back to null or empty array if data is missing.
                setHeroData(heroRes.data?.data as HeroData || null);
                setServices(servicesRes.data as Service[] || []);
                setProjects(projectsRes.data as Project[] || []);
                setAboutMeData(aboutRes.data?.data as AboutMeData || null);
                setContactData(contactRes.data?.data as ContactData || null);

            } catch (err: any) {
                const errorMessage = `Error: ${err.message || 'An unknown error occurred.'}`;
                console.error("Full Supabase error object:", err);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    const updateHeroData = useCallback(async (data: HeroData) => {
        // Assumes a single row with id=1 for hero data
        const { error } = await supabase.from('hero').update({ data } as any).eq('id', 1);
        if (error) throw error;
        setHeroData(data); // Optimistic UI update
    }, []);

    const updateService = useCallback(async (updatedService: Service) => {
        const { id, ...dataToUpdate } = updatedService;
        const { error } = await supabase.from('services').update(dataToUpdate as any).eq('id', id);
        if (error) throw error;
        setServices(prev => prev.map(s => s.id === id ? updatedService : s));
    }, []);

    const updateProject = useCallback(async (updatedProject: Project) => {
        const { id, ...dataToUpdate } = updatedProject;
        const { error } = await supabase.from('projects').update(dataToUpdate as any).eq('id', id);
        if (error) throw error;
        setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
    }, []);

    const value = {
        loading,
        error,
        heroData,
        services,
        projects,
        aboutMeData,
        contactData,
        updateHeroData,
        updateService,
        updateProject
    };

    return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
