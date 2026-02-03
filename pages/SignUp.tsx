import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { RoutePath } from '../types';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: 'Marry Doe',
    phone: 'Marry Doe',
    email: 'Marry Doe',
    password: 'Marry Doe',
    companyName: 'Marry Doe',
    isAgency: 'yes' // 'yes' | 'no'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, isAgency: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = signup({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
      password: formData.password,
      companyName: formData.companyName,
      isAgency: formData.isAgency === 'yes'
    });

    if (success) {
      navigate(RoutePath.PROFILE);
    } else {
      setError('An account with this email already exists.');
    }
  };

  return (
    <Layout className="px-6 pt-10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-popx-text leading-tight">
          Create your <br /> PopX account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col h-full pb-8">
        <div className="flex-1">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Input 
            label="Full Name" 
            name="fullName"
            placeholder="Marry Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          
          <Input 
            label="Phone number" 
            name="phone"
            placeholder="Marry Doe"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <Input 
            label="Email address" 
            name="email"
            type="email"
            placeholder="Marry Doe"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input 
            label="Password" 
            name="password"
            type="password"
            placeholder="Marry Doe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input 
            label="Company name" 
            name="companyName"
            placeholder="Marry Doe"
            value={formData.companyName}
            onChange={handleChange}
          />

          <div className="mb-8">
            <label className="text-sm font-medium text-popx-text block mb-3">
              Are you an Agency?<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer gap-2">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.isAgency === 'yes' ? 'border-popx-primary bg-popx-primary' : 'border-gray-400'}`}>
                  {formData.isAgency === 'yes' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <input 
                  type="radio" 
                  name="isAgency" 
                  className="hidden" 
                  checked={formData.isAgency === 'yes'} 
                  onChange={() => handleRadioChange('yes')} 
                />
                <span className="text-sm text-popx-text">Yes</span>
              </label>

              <label className="flex items-center cursor-pointer gap-2">
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.isAgency === 'no' ? 'border-popx-primary bg-popx-primary' : 'border-gray-400'}`}>
                   {formData.isAgency === 'no' && <div className="w-2 h-2 rounded-full bg-white" />}
                 </div>
                <input 
                  type="radio" 
                  name="isAgency" 
                  className="hidden" 
                  checked={formData.isAgency === 'no'} 
                  onChange={() => handleRadioChange('no')} 
                />
                <span className="text-sm text-popx-text">No</span>
              </label>
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-auto">
          Create Account
        </Button>
      </form>
    </Layout>
  );
};