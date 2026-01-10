'use client';

import { useAuth } from '@/components/WordPressAuthProvider';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EventChecklist, { EventChecklist as EventChecklistType } from '@/components/EventChecklist';
import { Calendar, Plus, Trash2, Edit2 } from 'lucide-react';

function MembersContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [checklists, setChecklists] = useState<EventChecklistType[]>([]);
  const [selectedChecklistId, setSelectedChecklistId] = useState<string | null>(null);
  const [showNewChecklistForm, setShowNewChecklistForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load checklists from server
  useEffect(() => {
    loadChecklists();

    // Check if a shared checklist is in the URL
    const sharedChecklist = searchParams.get('checklist');
    if (sharedChecklist) {
      try {
        const decoded = JSON.parse(atob(decodeURIComponent(sharedChecklist)));
        // Create a new ID for the imported checklist
        decoded.id = 'new';
        decoded.eventName = `${decoded.eventName} (Shared)`;
        setSelectedChecklistId(decoded.id);
        
        // Save to server
        saveChecklistToServer(decoded);
      } catch (error) {
        console.error('Error importing shared checklist:', error);
      }
    }
  }, [searchParams]);

  const loadChecklists = async () => {
    try {
      const response = await fetch('/api/checklists');
      if (response.ok) {
        const data = await response.json();
        setChecklists(data.checklists || []);
      }
    } catch (error) {
      console.error('Error loading checklists:', error);
      setChecklists([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChecklistToServer = async (checklist: EventChecklistType) => {
    try {
      const response = await fetch('/api/checklists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checklist)
      });
      
      if (response.ok) {
        const data = await response.json();
        await loadChecklists(); // Reload all checklists from server
        setSelectedChecklistId(data.checklist.id);
      }
    } catch (error) {
      console.error('Error saving checklist:', error);
      alert('Failed to save checklist to server');
    }
  };

  const createNewChecklist = async (eventName: string) => {
    const newChecklist: EventChecklistType = {
      id: 'new',
      eventName,
      eventDate: '',
      items: [],
      lastModified: new Date().toISOString()
    };
    
    setShowNewChecklistForm(false);
    await saveChecklistToServer(newChecklist);
  };

  const deleteChecklist = async (id: string) => {
    if (confirm('Are you sure you want to delete this checklist?')) {
      try {
        const response = await fetch(`/api/checklists?id=${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await loadChecklists();
          if (selectedChecklistId === id) {
            setSelectedChecklistId(null);
          }
        }
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
  };

  const selectedChecklist = checklists.find(c => c.id === selectedChecklistId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Members Area
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome {user?.displayName}! This is a protected members-only page.
          </p>
          
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Exclusive Member Benefits
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>✨ Early access to event bookings</li>
              <li>🎨 Special member-only designs</li>
              <li>💰 Exclusive discounts on services</li>
              <li>📸 Access to private photo galleries</li>
              <li>📋 Event planning checklists</li>
            </ul>
          </div>
        </div>

        {/* Checklist Management Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Saved Checklists Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Event Checklists
                </h2>
                <button
                  onClick={() => setShowNewChecklistForm(true)}
                  className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  title="Create new checklist"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* New Checklist Form */}
              {showNewChecklistForm && (
                <div className="mb-4 p-4 bg-pink-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Event name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          createNewChecklist(input.value.trim());
                          input.value = '';
                        }
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => setShowNewChecklistForm(false)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Checklist List */}
              <div className="space-y-2">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading checklists...</p>
                  </div>
                ) : checklists.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No checklists yet. Create one to get started!
                  </p>
                ) : (
                  checklists.map(checklist => {
                    const completedCount = checklist.items.filter(i => i.completed).length;
                    const progress = checklist.items.length > 0 
                      ? (completedCount / checklist.items.length) * 100 
                      : 0;
                    
                    return (
                      <div
                        key={checklist.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all group ${
                          selectedChecklistId === checklist.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300 bg-gray-50'
                        }`}
                        onClick={() => setSelectedChecklistId(checklist.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {checklist.eventName || 'Untitled Event'}
                            </h3>
                            {checklist.eventDate && (
                              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                <Calendar size={14} />
                                {new Date(checklist.eventDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChecklist(checklist.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        {/* Progress */}
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{completedCount}/{checklist.items.length}</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Checklist Editor */}
          <div className="lg:col-span-2">
            {selectedChecklist ? (
              <EventChecklist
                key={selectedChecklist.id}
                eventId={selectedChecklist.id}
                eventName={selectedChecklist.eventName}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                  <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No Checklist Selected
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select an existing checklist from the sidebar or create a new one to get started with your event planning.
                  </p>
                  <button
                    onClick={() => setShowNewChecklistForm(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <Plus size={20} />
                    Create New Checklist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/dashboard"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <MembersContent />
    </Suspense>
  );
}
