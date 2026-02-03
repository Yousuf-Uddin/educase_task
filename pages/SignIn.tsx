import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { RoutePath } from '../types';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const isFormValid = formData.email.length > 0 && formData.password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError('');

    // Simulate network delay for better UX
    setTimeout(() => {
      const success = login(formData.email, formData.password);
      setLoading(false);
      
      if (success) {
        navigate(RoutePath.PROFILE);
      } else {
        setError('Invalid email address or password');
      }
    }, 800);
  };

  return (
    <Layout className="px-6 pt-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-popx-text mb-4">
          Signin to your <br /> PopX account
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <Input 
          label="Email Address" 
          name="email"
          type="email" 
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input 
          label="Password" 
          name="password"
          type="password" 
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="mt-8">
          <Button 
            type="submit" 
            variant={isFormValid ? 'primary' : 'disabled'}
            className={loading ? 'opacity-70' : ''}
            disabled={!isFormValid || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </Layout>
  );
};