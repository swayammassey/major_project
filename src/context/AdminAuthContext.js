import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'major_project_admin_session';

const MOCK_CREDENTIALS = {
  email: 'admin@ds.gcet.edu',
  password: 'Admin@123',
};

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.isAuthenticated && parsed?.email) {
        setAdmin({
          email: parsed.email,
          name: parsed.name || 'Department Admin',
        });
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = ({ email, password }) => {
    if (email !== MOCK_CREDENTIALS.email || password !== MOCK_CREDENTIALS.password) {
      return { ok: false, message: 'Invalid credentials. Use the mock credentials shown on page.' };
    }

    const session = {
      isAuthenticated: true,
      email,
      name: 'Department Admin',
      at: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setAdmin({ email: session.email, name: session.name });
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin),
      mockCredentials: MOCK_CREDENTIALS,
      login,
      logout,
    }),
    [admin]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
