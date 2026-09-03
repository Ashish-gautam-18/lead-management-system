import React from 'react';

export default function PublicForm({
  captureData,
  setCaptureData,
  handleCaptureSubmit,
  captureSuccess,
  captureError
}) {
  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Get in Touch</h1>
        <p className="text-sm text-slate-500 mt-1">Leave your details and our team will connect with you.</p>
      </div>

      {captureSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
          {captureSuccess}
        </div>
      )}

      {captureError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {captureError}
        </div>
      )}

      <form onSubmit={handleCaptureSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={captureData.name}
            onChange={(e) => setCaptureData({ ...captureData, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            value={captureData.email}
            onChange={(e) => setCaptureData({ ...captureData, email: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Notes / Requirements</label>
          <textarea
            rows="3"
            placeholder="Tell us what you are looking for..."
            value={captureData.notes}
            onChange={(e) => setCaptureData({ ...captureData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg shadow transition text-sm"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}