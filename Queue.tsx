import React, { useState, useEffect } from 'react';

interface Mother {
  id: string;
  full_name: string;
  phone_number: string;
  language: string;
  stage: string;
  node_conversation_state: string;
  admin_added_to_group: boolean;
  created_at: string;
}

export default function Queue() {
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updating, setUpdating] = useState(false);

  // MOCK DATA FETCH (Simulating Supabase call)
  useEffect(() => {
    const mockMothers: Mother[] = [
      {
        id: 'usr_01',
        full_name: 'Amina Njang',
        phone_number: '+237 670 123 456',
        language: 'English',
        stage: 'Postpartum Anxiety',
        node_conversation_state: 'COMPLETE',
        admin_added_to_group: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'usr_02',
        full_name: 'Grace Mboum',
        phone_number: '+237 690 987 654',
        language: 'French',
        stage: 'New Mother Support',
        node_conversation_state: 'COMPLETE',
        admin_added_to_group: false,
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'usr_03',
        full_name: 'Jessica T.',
        phone_number: '+237 655 443 322',
        language: 'English',
        stage: 'Postpartum Depression',
        node_conversation_state: 'COMPLETE',
        admin_added_to_group: false,
        created_at: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: 'usr_04',
        full_name: 'Florence Ewunkem',
        phone_number: '+237 678 112 233',
        language: 'Pidgin',
        stage: 'General Wellness',
        node_conversation_state: 'COMPLETE',
        admin_added_to_group: false,
        created_at: new Date(Date.now() - 259200000).toISOString(),
      },
    ];

    const timer = setTimeout(() => {
      setMothers(mockMothers);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Handle individual row checkbox
  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedIds.length === mothers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mothers.map((m) => m.id));
    }
  };

  // Single record update: mark admin_added_to_group = true
  const handleMarkAdded = async (id: string) => {
    setUpdating(true);
    // Simulating database update delay
    setTimeout(() => {
      setMothers((prev) => prev.filter((m) => m.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      setUpdating(false);
    }, 300);
  };

  // Batch update: mark all selected admin_added_to_group = true
  const handleBatchMarkAdded = async () => {
    if (selectedIds.length === 0) return;
    setUpdating(true);
    setTimeout(() => {
      setMothers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      setSelectedIds([]);
      setUpdating(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tele-Mama Onboarding Queue</h1>
            <p className="text-sm text-slate-500">
              Completed mother onboardings waiting for WhatsApp peer group assignment.
            </p>
          </div>

          {/* Batch Action Button */}
          {selectedIds.length > 0 && (
            <button
              onClick={handleBatchMarkAdded}
              disabled={updating}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all text-sm flex items-center justify-center gap-2"
            >
              {updating ? 'Updating...' : `Mark Selected as Grouped (${selectedIds.length})`}
            </button>
          )}
        </div>

        {/* Data Table Container */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-200">
            <p className="text-slate-500 font-medium animate-pulse">Loading queue records...</p>
          </div>
        ) : mothers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-200">
            <p className="text-emerald-600 font-semibold text-lg">All caught up!</p>
            <p className="text-slate-500 text-sm mt-1">
              No pending mothers in the onboarding queue.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === mothers.length && mothers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                    </th>
                    <th className="p-4">Mother Name</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Language</th>
                    <th className="p-4">Stage / Condition</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {mothers.map((mother) => {
                    const isSelected = selectedIds.includes(mother.id);
                    return (
                      <tr
                        key={mother.id}
                        className={`transition-colors ${
                          isSelected ? 'bg-teal-50/50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(mother.id)}
                            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{mother.full_name}</td>
                        <td className="p-4 text-slate-600 font-mono text-xs">{mother.phone_number}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {mother.language}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                            {mother.stage}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleMarkAdded(mother.id)}
                            disabled={updating}
                            className="text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                          >
                            Mark Added
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}