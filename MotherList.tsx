import React, { useState } from 'react';

interface RegisteredMother {
  id: string;
  name: string;
  phone: string;
  language: string;
  condition: string;
  group: string;
  status: string;
}

export default function MotherList() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [registeredMothers] = useState<RegisteredMother[]>([
    {
      id: '1',
      name: 'Amina Njang',
      phone: '+237 670 123 456',
      language: 'English',
      condition: 'Postpartum Anxiety',
      group: 'PPA Support - English - Cohort B',
      status: 'Pending Group',
    },
    {
      id: '2',
      name: 'Grace Mboum',
      phone: '+237 690 987 654',
      language: 'French',
      condition: 'New Mother Support',
      group: 'Nouvelles Mamans - Français - A',
      status: 'Pending Group',
    },
    {
      id: '3',
      name: 'Jessica T.',
      phone: '+237 655 443 322',
      language: 'English',
      condition: 'Postpartum Depression',
      group: 'PPD Support - English - Cohort A',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Florence Ewunkem',
      phone: '+237 678 112 233',
      language: 'Pidgin',
      condition: 'General Wellness',
      group: 'Mama Wellness - Pidgin - Cohort A',
      status: 'Active',
    },
  ]);

  const filteredMothers = registeredMothers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">All Mothers Directory</h1>
          <p className="text-sm text-slate-500">Filterable list of registered mothers in the system.</p>
        </div>
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 w-full sm:w-64 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-100">
                <th className="py-4 px-6">Mother Name</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">Language</th>
                <th className="py-4 px-6">Stage / Condition</th>
                <th className="py-4 px-6">Assigned Group</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredMothers.map((mother) => (
                <tr key={mother.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{mother.name}</td>
                  <td className="py-4 px-6 text-slate-600 font-mono text-xs">{mother.phone}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 text-slate-700 bg-white">
                      {mother.language}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
                      {mother.condition}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{mother.group}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        mother.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {mother.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}