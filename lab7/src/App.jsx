import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { AuthProvider } from "@asgardeo/auth-react";
import Home from './pages/Home.jsx';
import EmployeeManagement from './pages/EmployeeManagement.jsx';

const App = () => {
    return (
        <AuthProvider
            config={{
                clientID: "1idN8axtUaf3CPIx5utisEOzAOEa",
                baseUrl: "https://api.asgardeo.io/t/utaustin",
                signInRedirectURL: "http://localhost:5173/",
                signOutRedirectURL: "http://localhost:5173/",
                scope: ["openid", "profile"]
            }}
        >
            <AppProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
                    </Routes>
                </Router>
            </AppProvider>
        </AuthProvider>
    );
};

export default App;