import React from 'react';

export default function Navbar({ currentView, setCurrentView, user, handleLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('capture')}>
          <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-lg shadow-sm">
            LM
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">LeadFlow</span>
        </div>

        <nav className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('capture')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
              currentView === 'capture' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Public Form
          </button>

          {user ? (
            <>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  currentView === 'dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dashboard
              </button>
              <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                <span className="text-xs bg-slate-100 border border-slate-300 font-semibold text-slate-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
            >
              Team Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}