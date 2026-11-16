import React, { useState } from 'react';
import Login from './pages/Login';
import Queue from './pages/Queue';

interface RegisteredMother {
  id: string;
  name: string;
  phone: string;
  language: string;
  condition: string;
  group: string;
  status: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'queue' | 'mothers' | 'groups' | 'create-group' | 'notifications'>('queue');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Amina Njang finished conversation onboarding and was added to queue.', time: '5m ago', read: false },
    { id: '2', message: 'Grace Mboum finished conversation onboarding and was added to queue.', time: '1h ago', read: false },
  ]);

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

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredMothers = registeredMothers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm">
              TM
            </div>
            <span className="font-bold tracking-wide text-base text-white">Tele-Mama Admin</span>
          </div>

          <nav className="flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'queue' ? 'bg-teal-600/30 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}
            >
              Queue
            </button>
            <button
              onClick={() => setActiveTab('mothers')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'mothers' ? 'bg-teal-600/30 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}
            >
              Mothers List
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'groups' ? 'bg-teal-600/30 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors relative ${activeTab === 'notifications' ? 'bg-teal-600/30 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}
            >
              Notifications
              {unreadCount > 0 && (
                <span className="ml-1.5 bg-amber-500 text-slate-950 text-xs font-bold px-1.5 py-0.2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {activeTab === 'queue' && <Queue />}

        {activeTab === 'mothers' && (
          <div className="space-y-6">
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
        )}

        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-slate-800">Peer Support Groups</h1>
                <p className="text-sm text-slate-500">List of active WhatsApp support groups.</p>
              </div>
              <button
                onClick={() => setActiveTab('create-group')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
              >
                + Create Group
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-800">PPD Support - English - Cohort A</h3>
                <p className="text-xs text-slate-500">Language: English | Topic: Postpartum Depression</p>
                <p className="text-xs text-teal-600 font-mono">Reads from: groups table</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-800">Soutien Anxiété - Français - Cohort A</h3>
                <p className="text-xs text-slate-500">Language: French | Topic: Postpartum Anxiety</p>
                <p className="text-xs text-teal-600 font-mono">Reads from: groups table</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'create-group' && (
          <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h1 className="text-xl font-bold text-slate-800">Create Support Group</h1>
            <p className="text-sm text-slate-500">Inserts a new group record into the <code className="text-teal-600 font-mono">groups</code> database.</p>
            <form onSubmit={(e) => { e.preventDefault(); setActiveTab('groups'); }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Group Name</label>
                <input type="text" required placeholder="e.g. Anxiety Group - French" className="w-full border border-slate-300 rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">WhatsApp Group Link</label>
                <input type="url" required placeholder="https://chat.whatsapp.com/..." className="w-full border border-slate-300 rounded-lg p-2 text-sm" />
              </div>
              <button type="submit" className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer">
                Save & Create
              </button>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-slate-800">Admin Notification Feed</h1>
                <p className="text-sm text-slate-500">Reads from <code className="text-teal-600 font-mono">admin_notifications</code></p>
              </div>
              <button
                onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
                className="text-xs bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md cursor-pointer"
              >
                Mark as read
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
              {notifications.map((n) => (
                <div key={n.id} className={`p-4 flex justify-between items-center ${!n.read ? 'bg-amber-50/50' : ''}`}>
                  <p className="text-sm text-slate-800">{n.message}</p>
                  <span className="text-xs text-slate-400">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
