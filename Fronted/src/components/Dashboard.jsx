import React from 'react';

export default function Dashboard({
  leads,
  loading,
  dashError,
  statusFilter,
  setStatusFilter,
  page,
  setPage,
  totalPages,
  user,
  handleUpdateLead,
  handleDelete
}) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'WON': return 'bg-green-100 text-green-800 border-green-200';
      case 'LOST': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Lead Pipeline</h1>
          <p className="text-xs text-slate-500">Manage and convert active leads.</p>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs font-semibold text-slate-600 uppercase">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            className="px-3 py-1.5 border border-slate-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
          </select>
        </div>
      </div>

      {dashError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {dashError}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Lead Info</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono text-xs text-slate-400">#{lead.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-500 text-xs">
                      {lead.notes || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold border rounded-full ${getStatusBadgeClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-700">
                      {lead.assignedTo ? `User #${lead.assignedTo}` : <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    
                    <td className="py-3 px-4 text-right space-x-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLead(lead.id, { status: e.target.value })}
                        className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>

                      {user.role === 'ADMIN' && (
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleUpdateLead(lead.id, { assignedTo: Number(e.target.value) });
                            }
                          }}
                          className="px-2 py-1 border border-indigo-200 bg-indigo-50 text-indigo-700 rounded text-xs focus:outline-none"
                        >
                          <option value="" disabled>Assign To...</option>
                          <option value="1">User #1 (Admin)</option>
                          <option value="2">User #2 (Member)</option>
                        </select>
                      )}

                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded text-xs font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Page <strong>{page + 1}</strong> of <strong>{totalPages || 1}</strong>
          </span>

          <div className="space-x-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              className="px-3 py-1.5 border border-slate-300 rounded bg-white font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition"
            >
              Previous
            </button>

            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1.5 border border-slate-300 rounded bg-white font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}