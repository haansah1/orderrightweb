import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Authentication failed. Check details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen flex items-center justify-center relative">
      
      {/* Decorative Blur Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-surface-container-highest to-secondary-fixed blur-3xl mix-blend-multiply" />
      </div>

      <div className="w-full max-w-md bg-surface border border-surface-container-highest rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-surface-container-highest relative">
          <button 
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-4 font-label text-label-md transition-colors text-center relative z-10 ${
              activeTab === 'login' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Login
          </button>
          <button 
            onClick={() => { setActiveTab('signup'); setError(''); }}
            className={`flex-1 py-4 font-label text-label-md transition-colors text-center relative z-10 ${
              activeTab === 'signup' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Sign Up
          </button>
          <div 
            className={`absolute bottom-0 w-1/2 h-[3px] bg-primary transition-transform duration-300 ease-out z-20 ${
              activeTab === 'signup' ? 'translate-x-full' : 'translate-x-0'
            }`} 
          />
        </div>

        <div className="p-xl flex-grow space-y-lg">
          <div className="text-center">
            <h1 className="font-headline font-bold text-headline-lg text-primary mb-xs">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              {activeTab === 'login' ? 'Enter your details to continue.' : 'Join OrderRight for exclusive drops.'}
            </p>
          </div>

          {error && (
            <div className="p-sm bg-error-container text-on-error-container rounded-lg text-label-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-md">
            {activeTab === 'signup' && (
              <div className="flex flex-col gap-xs">
                <label className="font-label text-label-sm text-on-surface-variant">Full Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kofi Mensah"
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            )}

            <div className="flex flex-col gap-xs">
              <label className="font-label text-label-sm text-on-surface-variant">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label text-label-sm text-on-surface-variant">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary text-on-primary rounded-lg font-label text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {submitting ? 'Authenticating...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
