import React from 'react';

import { AuthProvider } from '../components/AuthContext';
import { AppNavigator } from './App';

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
