import React from 'react';

export default function LoginForm({ loginData, setLoginData, handleLoginSubmit, loginError }) {
  return (
    <div className="max-w-sm mx-auto my-12 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portal Login</h1>
        <p className="text-sm text-slate-500 mt-1">Enter credentials to access lead pipeline.</p>
      </div>

      {loginError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {loginError}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Username</label>
          <input
            type="text"
            required
            placeholder="admin or member"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-black text-white font-medium py-2.5 rounded-lg shadow transition text-sm"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        Default Seeder Credentials:<br/>
        Admin: <code className="text-slate-600">admin / admin123</code> | Member: <code className="text-slate-600">member / member123</code>
      </div>
    </div>
  );
}