
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import type { Session, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
    isAuthenticated: boolean;
    session: Session | null;
    loading: boolean;
    login: (password: string) => Promise<{ error: AuthError | null }>;
    logout: () => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use a fixed email for the admin user as the UI only has a password field.
const ADMIN_EMAIL = 'admin@maximodev.com';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // v2: getSession is asynchronous.
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        fetchSession();

        // v2: onAuthStateChange returns a subscription object in the `data` property.
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        // Cleanup subscription on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const login = useCallback(async (password: string) => {
        // v2 uses signInWithPassword for password authentication.
        const { error } = await supabase.auth.signInWithPassword({ 
            email: ADMIN_EMAIL, 
            password 
        });
        return { error };
    }, []);

    const logout = useCallback(async () => {
        // signOut is similar in v2 and returns an error object.
        const { error } = await supabase.auth.signOut();
        return { error };
    }, []);

    const value = {
        isAuthenticated: !!session,
        session,
        loading,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
