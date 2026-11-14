import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(password);

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let generated = '';
    for (let i = 0; i < 14; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
    setShowPassword(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'reset') {
      setResetSent(true);
      return;
    }
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 mb-3 font-bold text-xl">
            TM
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {mode === 'signup'
              ? 'Create Admin Account'
              : mode === 'reset'
              ? 'Reset Password'
              : 'Tele-Mama Admin'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {mode === 'signup'
              ? 'Sign up to manage peer support groups'
              : mode === 'reset'
              ? 'Enter your email to receive a password reset link'
              : 'Sign in to access the onboarding queue'}
          </p>
        </div>

        {resetSent && mode === 'reset' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <p className="text-sm font-semibold text-emerald-800">Reset link sent!</p>
            <p className="text-xs text-emerald-600 mt-1">
              Check <strong>{email}</strong> for instructions to reset your password.
            </p>
            <button
              onClick={() => {
                setResetSent(false);
                setMode('signin');
              }}
              className="mt-4 text-xs bg-emerald-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder="admin@telemama.org"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm lowercase"
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.027 10.027 0 013.68-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243m4.242 4.242L3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {mode === 'signup' && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Strength:</span>
                      <span className={`font-semibold ${strengthScore <= 1 ? 'text-red-500' : strengthScore <= 3 ? 'text-amber-500' : 'text-emerald-600'}`}>
                        {strengthScore <= 1 ? 'Weak' : strengthScore <= 3 ? 'Medium' : 'Strong'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden flex">
                      <div className={`h-full transition-all duration-300 ${strengthScore <= 1 ? 'w-1/3 bg-red-500' : strengthScore <= 3 ? 'w-2/3 bg-amber-500' : 'w-full bg-emerald-500'}`}></div>
                    </div>
                    <div className="text-right">
                      <button type="button" onClick={generateStrongPassword} className="text-xs text-teal-600 hover:underline font-medium cursor-pointer">
                        Suggest strong password
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="mt-1.5 text-right">
                    <button type="button" onClick={() => setMode('reset')} className="text-xs text-teal-600 hover:underline font-medium cursor-pointer">
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition-all text-sm shadow-md mt-2 cursor-pointer"
            >
              {mode === 'signup' ? 'Sign Up' : mode === 'reset' ? 'Send Reset Link' : 'Sign In'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center border-t border-slate-100 pt-4 text-xs text-slate-500">
          {mode === 'reset' ? (
            <button type="button" onClick={() => setMode('signin')} className="text-teal-600 font-semibold hover:underline cursor-pointer">
              Remembered your password? Sign In
            </button>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('signin')} className="text-teal-600 font-semibold hover:underline ml-1 cursor-pointer">
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an admin account?{' '}
              <button type="button" onClick={() => setMode('signup')} className="text-teal-600 font-semibold hover:underline ml-1 cursor-pointer">
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}