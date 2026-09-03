import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import PublicForm from './components/PublicForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const API_BASE_URL = 'http://localhost:8081/api';

export default function App() {
  const [currentView, setCurrentView] = useState('capture');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lead_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [captureData, setCaptureData] = useState({ name: '', email: '', notes: '' });
  const [captureSuccess, setCaptureSuccess] = useState('');
  const [captureError, setCaptureError] = useState('');

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashError, setDashError] = useState('');

  useEffect(() => {
    if (user && currentView === 'login') {
      setCurrentView('dashboard');
    }
  }, [user]);

  useEffect(() => {
    if (user && currentView === 'dashboard') {
      fetchLeads();
    }
  }, [user, page, statusFilter, currentView]);

  const fetchLeads = async () => {
    setLoading(true);
    setDashError('');
    try {
      let url = `${API_BASE_URL}/leads?page=${page}&size=6`;
      if (statusFilter) url += `&status=${statusFilter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setLeads(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      setDashError(err.response?.data?.error || 'Failed to fetch leads');
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureSubmit = async (e) => {
    e.preventDefault();
    setCaptureError('');
    setCaptureSuccess('');
    try {
      await axios.post(`${API_BASE_URL}/leads/public/capture`, captureData);
      setCaptureSuccess('Thank you! Your details have been submitted successfully.');
      setCaptureData({ name: '', email: '', notes: '' });
    } catch (err) {
      setCaptureError(err.response?.data?.error || 'Failed to submit lead.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('lead_user', JSON.stringify(userData));
      setLoginData({ username: '', password: '' });
      setCurrentView('dashboard');
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lead_user');
    setCurrentView('login');
  };

  const handleUpdateLead = async (leadId, updatedFields) => {
    try {
      await axios.put(`${API_BASE_URL}/leads/${leadId}/status`, updatedFields, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchLeads();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update lead');
    }
  };

  const handleDelete = async (leadId) => {
    if (window.confirm("क्या आप सच में इस Lead को डिलीट करना चाहते हैं?")) {
      try {
        await axios.delete(`${API_BASE_URL}/leads/${leadId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchLeads(); 
        alert("Lead सफलतापूर्वक डिलीट हो गया!");
      } catch (err) {
        alert(err.response?.data?.error || "Lead डिलीट नहीं हो पाया।");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans text-slate-800">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        handleLogout={handleLogout}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'capture' && (
          <PublicForm
            captureData={captureData}
            setCaptureData={setCaptureData}
            handleCaptureSubmit={handleCaptureSubmit}
            captureSuccess={captureSuccess}
            captureError={captureError}
          />
        )}

        {currentView === 'login' && (
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            handleLoginSubmit={handleLoginSubmit}
            loginError={loginError}
          />
        )}

        {currentView === 'dashboard' && user && (
          <Dashboard
            leads={leads}
            loading={loading}
            dashError={dashError}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            user={user}
            handleUpdateLead={handleUpdateLead}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Built for Digital Heroes Training Task |{' '}
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">
            digitalheroesco.com
          </a>
        </div>
      </footer>
    </div>
  );
}