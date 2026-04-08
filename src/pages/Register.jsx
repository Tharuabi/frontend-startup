import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', userType: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await api.post('/api/register', formData);
      setMessage(res.data.message || 'Registration successful!');
      setMessageType('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const planets = [
    { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', color: '#6366f1', style: 'w-11 h-11 rounded-full', anim: 'animate-[orbitA_8s_linear_infinite]' },
    { icon: 'M3 3h18v18H3zM3 9h18M9 21V9', color: '#f59e0b', style: 'w-9 h-9 rounded-xl', anim: 'animate-[orbitB_12s_linear_infinite]' },
    { icon: 'M12 20V10M18 20V4M6 20v-4', color: '#10b981', style: 'w-9 h-9 rounded-full', anim: 'animate-[orbitC_15s_linear_infinite]' },
    { icon: 'M12 8v4l3 3 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', color: '#ef4444', style: 'w-8 h-8 rounded-lg', anim: 'animate-[orbitD_10s_linear_infinite]' },
    { icon: 'M2 7l10 5 10-5M12 22V12', color: '#8b5cf6', style: 'w-7 h-7 rounded-full', anim: 'animate-[orbitE_7s_linear_infinite]' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center relative overflow-hidden px-4 py-10">

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: Math.random()*2+1+'px', height: Math.random()*2+1+'px',
              left: Math.random()*100+'%', top: Math.random()*100+'%',
              opacity: Math.random()*.6+.2 }} />
        ))}
      </div>

      {/* Orbital system — left side */}
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] hidden lg:block">
        {/* Orbit rings */}
        {[230,300,390].map(s => (
          <div key={s} className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-white/[0.06]"
              style={{ width: s, height: s }} />
          </div>
        ))}
        {/* Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#1e1b4b] border-2 border-indigo-500 flex items-center justify-center animate-pulse">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
        </div>
        {/* Planets — use actual CSS keyframes in tailwind.config for these */}
        {planets.map((p, i) => (
          <div key={i} className={`absolute inset-0 flex items-center justify-center`}>
            <div className={`flex items-center justify-center ${p.style} ${p.anim}`}
              style={{ background: p.color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d={p.icon}/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Register card — right side */}
      <div className="relative z-10 w-full max-w-[390px] ml-auto mr-[4%] bg-white rounded-[22px] p-8 animate-[floatCard_.6s_cubic-bezier(.22,.68,0,1.15)_both]">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase">MicroStartupX</span>
        </div>

        <h1 className="text-[1.4rem] font-bold text-[#0f0c2e] tracking-tight leading-tight mb-1">
          Create your account
        </h1>
        <p className="text-xs text-gray-400 mb-6">
          Start investing in tomorrow's startups today
        </p>

        {/* Message */}
        {message && (
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-xs font-medium mb-4 ${
            messageType === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {messageType === 'success' ? '✓' : '⚠'} {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {[
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a strong password' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label className="block text-[.67rem] font-bold tracking-[.1em] text-gray-400 uppercase mb-1.5">
                {label}
              </label>
              <input id={id} type={type} name={id}
                value={formData[id === 'password' ? 'password' : id]}
                onChange={handleChange} placeholder={placeholder} required
                className="w-full px-3.5 py-2.5 rounded-[10px] border-[1.5px] border-gray-200 bg-gray-50 text-sm text-[#0f0c2e] placeholder-gray-300 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(99,102,241,.12)]"
              />
            </div>
          ))}

          <div>
            <label className="block text-[.67rem] font-bold tracking-[.1em] text-gray-400 uppercase mb-1.5">
              Account Type
            </label>
            <select name="userType" value={formData.userType} onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-[10px] border-[1.5px] border-gray-200 bg-gray-50 text-sm text-[#0f0c2e] outline-none appearance-none transition-all focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(99,102,241,.12)]">
              <option value="user">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 mt-1 rounded-[12px] bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(79,70,229,.4)] active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4 text-gray-300 text-xs">
          <div className="flex-1 h-px bg-gray-100"/><span>or</span><div className="flex-1 h-px bg-gray-100"/>
        </div>
        <p className="text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;