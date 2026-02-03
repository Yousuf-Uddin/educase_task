import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Welcome } from './pages/Welcome';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { RoutePath } from './types';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={RoutePath.WELCOME} element={<Welcome />} />
          <Route path={RoutePath.SIGNIN} element={<SignIn />} />
          <Route path={RoutePath.SIGNUP} element={<SignUp />} />
          <Route path={RoutePath.PROFILE} element={<Profile />} />
          <Route path="*" element={<Navigate to={RoutePath.WELCOME} replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;