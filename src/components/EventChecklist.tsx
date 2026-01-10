'use client';

import { useState, useEffect } from 'react';
import { Check, X, Plus, Trash2, Printer, Share2 } from 'lucide-react';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
}

export interface EventChecklist {
  id: string;
  eventName: string;
  eventDate: string;
  items: ChecklistItem[];
  lastModified: string;
}

interface EventChecklistProps {
  eventId?: string;
  eventName?: string;
  onSave?: (checklist: EventChecklist) => void;
}

const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // Pre-Event Planning
  { id: '1', text: 'Confirm event date and time', completed: false, category: 'Planning' },
  { id: '2', text: 'Confirm event location and address', completed: false, category: 'Planning' },
  { id: '3', text: 'Get contact information (name, phone, email)', completed: false, category: 'Planning' },
  { id: '4', text: 'Discuss theme and design preferences', completed: false, category: 'Planning' },
  { id: '5', text: 'Estimate number of participants', completed: false, category: 'Planning' },
  { id: '6', text: 'Agree on pricing and payment terms', completed: false, category: 'Planning' },
  { id: '7', text: 'Send booking confirmation email', completed: false, category: 'Planning' },
  
  // Materials & Supplies
  { id: '8', text: 'Check face paint supplies', completed: false, category: 'Supplies' },
  { id: '9', text: 'Check henna supplies', completed: false, category: 'Supplies' },
  { id: '10', text: 'Pack brushes and sponges', completed: false, category: 'Supplies' },
  { id: '11', text: 'Pack glitter (if requested)', completed: false, category: 'Supplies' },
  { id: '12', text: 'Pack design books/reference materials', completed: false, category: 'Supplies' },
  { id: '13', text: 'Pack hand sanitizer and wipes', completed: false, category: 'Supplies' },
  { id: '14', text: 'Pack mirror', completed: false, category: 'Supplies' },
  { id: '15', text: 'Pack table cover/cloth', completed: false, category: 'Supplies' },
  
  // Equipment & Setup
  { id: '16', text: 'Pack folding table and chairs', completed: false, category: 'Equipment' },
  { id: '17', text: 'Pack signage/banner', completed: false, category: 'Equipment' },
  { id: '18', text: 'Pack payment processing equipment', completed: false, category: 'Equipment' },
  { id: '19', text: 'Charge phone/tablet', completed: false, category: 'Equipment' },
  { id: '20', text: 'Pack business cards', completed: false, category: 'Equipment' },
  
  // Day Before
  { id: '21', text: 'Confirm event details with client', completed: false, category: 'Day Before' },
  { id: '22', text: 'Check weather forecast (for outdoor events)', completed: false, category: 'Day Before' },
  { id: '23', text: 'Prepare and pack all materials', completed: false, category: 'Day Before' },
  { id: '24', text: 'Plan route and check travel time', completed: false, category: 'Day Before' },
  
  // Event Day
  { id: '25', text: 'Arrive 30 minutes early for setup', completed: false, category: 'Event Day' },
  { id: '26', text: 'Set up workspace', completed: false, category: 'Event Day' },
  { id: '27', text: 'Display design examples', completed: false, category: 'Event Day' },
  { id: '28', text: 'Take photos during event', completed: false, category: 'Event Day' },
  
  // Post-Event
  { id: '29', text: 'Pack up all materials', completed: false, category: 'Post-Event' },
  { id: '30', text: 'Process payment', completed: false, category: 'Post-Event' },
  { id: '31', text: 'Send thank you email', completed: false, category: 'Post-Event' },
  { id: '32', text: 'Request feedback/review', completed: false, category: 'Post-Event' },
  { id: '33', text: 'Upload event photos to portfolio', completed: false, category: 'Post-Event' },
];

export default function EventChecklist({ eventId, eventName, onSave }: EventChecklistProps) {
  const [checklist, setChecklist] = useState<EventChecklist>({
    id: eventId || crypto.randomUUID(),
    eventName: eventName || '',
    eventDate: '',
    items: [],
    lastModified: new Date().toISOString()
  });
  
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Custom');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load checklist from server or initialize with default items
  useEffect(() => {
    if (isInitialized) return; // Already initialized
    
    if (eventId && eventId !== 'new') {
      // Load existing checklist from server
      fetch('/api/checklists')
        .then(res => res.json())
        .then(data => {
          const found = data.checklists.find((c: EventChecklist) => c.id === eventId);
          if (found && found.items && found.items.length > 0) {
            setChecklist(found);
          } else {
            // Initialize with default items if not found or empty
            setChecklist(prev => ({ 
              ...prev, 
              id: eventId,
              items: DEFAULT_CHECKLIST_ITEMS 
            }));
          }
          setIsInitialized(true);
        })
        .catch(error => {
          console.error('Error loading checklist:', error);
          // Initialize with default items on error
          setChecklist(prev => ({ 
            ...prev, 
            id: eventId,
            items: DEFAULT_CHECKLIST_ITEMS 
          }));
          setIsInitialized(true);
        });
    } else {
      // New checklist - initialize with default items
      setChecklist(prev => ({ 
        ...prev, 
        items: DEFAULT_CHECKLIST_ITEMS 
      }));
      setIsInitialized(true);
    }
  }, [eventId, isInitialized]);

  // Auto-save to server with debounce
  useEffect(() => {
    if (!isInitialized) return; // Don't save until initialized
    
    const timeoutId = setTimeout(async () => {
      if (checklist.eventName && checklist.eventName.trim() !== '' && checklist.items.length > 0) {
        setIsSaving(true);
        console.log('Auto-saving checklist:', checklist.id, checklist.eventName);
        
        try {
          const response = await fetch('/api/checklists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checklist)
          });
          
          console.log('Save response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Save response data:', data);
            setLastSaved(new Date());
            
            // Update ID if this was a new checklist (don't trigger re-save)
            if (data.checklist.id !== checklist.id) {
              console.log('Updating checklist ID from', checklist.id, 'to', data.checklist.id);
              checklist.id = data.checklist.id; // Update directly without state change
            }
          } else {
            const errorData = await response.json();
            console.error('Save failed:', errorData);
            throw new Error(errorData.message || 'Failed to save checklist');
          }
        } catch (error) {
          console.error('Error saving checklist:', error);
          alert('Failed to save checklist. Check console for details.');
        } finally {
          setIsSaving(false);
        }
      }
    }, 2000); // Debounce for 2 seconds

    return () => clearTimeout(timeoutId);
  }, [checklist.eventName, checklist.eventDate, checklist.items, isInitialized]); // Only trigger on actual content changes

  const toggleItem = (itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
      lastModified: new Date().toISOString()
    }));
  };

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: crypto.randomUUID(),
        text: newItemText.trim(),
        completed: false,
        category: newItemCategory
      };
      setChecklist(prev => ({
        ...prev,
        items: [...prev.items, newItem],
        lastModified: new Date().toISOString()
      }));
      setNewItemText('');
    }
  };

  const deleteItem = (itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
      lastModified: new Date().toISOString()
    }));
  };

  const generatePrintableHTML = () => {
    const categories = Array.from(new Set(checklist.items.map(item => item.category || 'Uncategorized')));
    const completedCount = checklist.items.filter(item => item.completed).length;
    
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${checklist.eventName} - Event Checklist</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #ec4899;
      border-bottom: 3px solid #ec4899;
      padding-bottom: 10px;
    }
    .event-info {
      background: #fef3f2;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .progress {
      font-size: 18px;
      font-weight: bold;
      color: #4b5563;
    }
    .category {
      margin-top: 30px;
    }
    .category h2 {
      color: #7c3aed;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .checklist-item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
    }
    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid #9ca3af;
      border-radius: 3px;
      margin-right: 12px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .checkbox.checked {
      background: #10b981;
      border-color: #10b981;
      color: white;
      font-weight: bold;
    }
    .item-text {
      flex: 1;
    }
    .item-text.completed {
      text-decoration: line-through;
      color: #9ca3af;
    }
    @media print {
      body { padding: 10px; }
    }
  </style>
</head>
<body>
  <h1>Event Checklist: ${checklist.eventName || 'Untitled'}</h1>
  
  <div class="event-info">
    ${checklist.eventDate ? `<p><strong>Event Date:</strong> ${new Date(checklist.eventDate).toLocaleDateString()}</p>` : ''}
    <p class="progress">Progress: ${completedCount} / ${checklist.items.length} items completed (${Math.round((completedCount / checklist.items.length) * 100)}%)</p>
  </div>
`;

    categories.forEach(category => {
      const categoryItems = checklist.items.filter(item => (item.category || 'Uncategorized') === category);
      const categoryCompleted = categoryItems.filter(item => item.completed).length;
      
      html += `
  <div class="category">
    <h2>${category} (${categoryCompleted}/${categoryItems.length})</h2>
`;
      
      categoryItems.forEach(item => {
        html += `
    <div class="checklist-item">
      <div class="checkbox ${item.completed ? 'checked' : ''}">
        ${item.completed ? '✓' : ''}
      </div>
      <div class="item-text ${item.completed ? 'completed' : ''}">
        ${item.text}
      </div>
    </div>
`;
      });
      
      html += `  </div>`;
    });

    html += `
  <div style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px;">
    <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    <p>Heart & Hand Face Painting - Event Planning Checklist</p>
  </div>
</body>
</html>`;

    return html;
  };

  const printChecklist = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generatePrintableHTML());
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const shareChecklist = async () => {
    const printableHTML = generatePrintableHTML();
    const blob = new Blob([printableHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${checklist.eventName || 'checklist'}-${checklist.eventDate}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetChecklist = () => {
    if (confirm('Are you sure you want to reset all items? This cannot be undone.')) {
      setChecklist(prev => ({
        ...prev,
        items: prev.items.map(item => ({ ...item, completed: false })),
        lastModified: new Date().toISOString()
      }));
    }
  };

  const categories = Array.from(new Set(checklist.items.map(item => item.category || 'Uncategorized')));
  const completedCount = checklist.items.filter(item => item.completed).length;
  const progress = (completedCount / checklist.items.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Checklist</h2>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={checklist.eventName}
              onChange={(e) => setChecklist(prev => ({ ...prev, eventName: e.target.value, lastModified: new Date().toISOString() }))}
              placeholder="Enter event name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date
            </label>
            <input
              type="date"
              value={checklist.eventDate}
              onChange={(e) => setChecklist(prev => ({ ...prev, eventDate: e.target.value, lastModified: new Date().toISOString() }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedCount} / {checklist.items.length} items</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={printChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={shareChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Share2 size={16} />
            Share PDF
          </button>
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <X size={16} />
            Reset All
          </button>
        </div>
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryItems = checklist.items.filter(item => (item.category || 'Uncategorized') === category);
          const categoryCompleted = categoryItems.filter(item => item.completed).length;
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                <span>{category}</span>
                <span className="text-sm font-normal text-gray-500">
                  ({categoryCompleted}/{categoryItems.length})
                </span>
              </h3>
              <div className="space-y-2">
                {categoryItems.map(item => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        item.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {item.completed && <Check size={16} className="text-white" />}
                    </button>
                    <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Item */}
      <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Custom Item</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Enter new checklist item..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="Custom">Custom</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={addItem}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>

      {/* Last Modified Info */}
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500">
          Last modified: {new Date(checklist.lastModified).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
