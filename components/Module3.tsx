import React, { useState } from 'react';
import { MousePointer2, AlertCircle, Code2 } from 'lucide-react';

interface Module3Props {
  onComplete: () => void;
}

interface ItemState {
  grow: number;
  shrink: number;
  basis: string;
}

export const Module3: React.FC<Module3Props> = ({ onComplete }) => {
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [items, setItems] = useState<ItemState[]>([
    { grow: 0, shrink: 1, basis: 'auto' },
    { grow: 0, shrink: 1, basis: 'auto' },
    { grow: 0, shrink: 1, basis: 'auto' },
  ]);

  const [tasks, setTasks] = useState({
      growTask: false,
      shrinkTask: false,
      basisTask: false
  });

  const updateItem = (field: keyof ItemState, value: any) => {
    const newItems = [...items];
    newItems[selectedItem - 1] = {
      ...newItems[selectedItem - 1],
      [field]: value
    };
    setItems(newItems);

    // Task Validation
    if (field === 'grow' && value > 0) setTasks(prev => ({...prev, growTask: true}));
    if (field === 'shrink' && value === 0) setTasks(prev => ({...prev, shrinkTask: true}));
    if (field === 'basis' && value !== 'auto') setTasks(prev => ({...prev, basisTask: true}));

    if (tasks.growTask && tasks.shrinkTask && tasks.basisTask) {
        onComplete();
    }
  };

  const currentItem = items[selectedItem - 1];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-800">3. Ítems (Hijos)</h2>
        <p className="text-sm text-gray-600 mt-1">Cómo los elementos individuales reaccionan al espacio disponible.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Controls */}
        <div className="w-full md:w-80 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto space-y-6">
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
                    <MousePointer2 size={16}/> Selecciona un Ítem
                </label>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <button
                            key={i}
                            onClick={() => setSelectedItem(i)}
                            className={`flex-1 py-2 rounded font-bold border-2 transition-all ${
                                selectedItem === i 
                                ? 'border-brand-500 bg-brand-50 text-brand-700' 
                                : 'border-gray-200 hover:border-gray-300 text-gray-500'
                            }`}
                        >
                            Item {i}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {/* Grow */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-semibold">flex-grow</label>
                        <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded">{currentItem.grow}</span>
                    </div>
                    <input 
                        type="range" min="0" max="5" step="1"
                        value={currentItem.grow}
                        onChange={(e) => updateItem('grow', parseInt(e.target.value))}
                        className="w-full accent-brand-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">Factor de crecimiento. 0 = no crece.</p>
                </div>

                {/* Shrink */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-semibold">flex-shrink</label>
                        <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded">{currentItem.shrink}</span>
                    </div>
                    <input 
                        type="range" min="0" max="5" step="1"
                        value={currentItem.shrink}
                        onChange={(e) => updateItem('shrink', parseInt(e.target.value))}
                        className="w-full accent-brand-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">Factor de reducción. 0 = no encoge.</p>
                </div>

                 {/* Basis */}
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-semibold">flex-basis</label>
                    </div>
                    <select 
                        value={currentItem.basis}
                        onChange={(e) => updateItem('basis', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                    >
                        <option value="auto">auto</option>
                        <option value="100px">100px</option>
                        <option value="200px">200px</option>
                        <option value="50%">50%</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Tamaño base antes de crecer/encoger.</p>
                </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200">
                <p className="font-bold flex items-center gap-1 mb-1"><AlertCircle size={12}/> Tareas:</p>
                <ul className="list-disc ml-4 space-y-1">
                    <li className={tasks.growTask ? 'line-through opacity-50' : ''}>Asigna <strong>grow &gt; 0</strong> a un ítem.</li>
                    <li className={tasks.shrinkTask ? 'line-through opacity-50' : ''}>Asigna <strong>shrink = 0</strong> para evitar que encoja.</li>
                    <li className={tasks.basisTask ? 'line-through opacity-50' : ''}>Cambia el <strong>basis</strong> de un ítem.</li>
                </ul>
            </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-slate-100 p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center">
                <p className="mb-4 text-sm text-gray-500 font-medium">Contenedor estrecho (400px) para forzar shrink</p>
                
                <div 
                    className="bg-white border-2 border-dashed border-slate-400 rounded-lg p-2 flex transition-all shadow-xl"
                    style={{
                        width: '400px', // Fixed narrow width to demonstrate shrink
                        height: '200px'
                    }}
                >
                    {items.map((item, idx) => (
                        <div 
                            key={idx}
                            className={`
                                h-full flex items-center justify-center text-white font-bold rounded shadow-sm border
                                transition-all duration-300 overflow-hidden relative
                                ${selectedItem === idx + 1 ? 'bg-brand-600 border-brand-800 ring-2 ring-brand-400 ring-offset-1 z-10' : 'bg-brand-400 border-brand-500 opacity-80'}
                            `}
                            style={{
                                flexGrow: item.grow,
                                flexShrink: item.shrink,
                                flexBasis: item.basis,
                                minWidth: '50px' // Basic visibility
                            }}
                        >
                            <div className="text-center z-10 relative">
                                <span className="text-lg block">#{idx + 1}</span>
                                <span className="text-[10px] opacity-75 font-mono block">g:{item.grow} s:{item.shrink}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                 <div className="mt-8 grid grid-cols-3 gap-4 w-[400px]">
                    {items.map((item, idx) => (
                         <div key={idx} className="text-center text-xs text-gray-500 font-mono">
                            Item {idx+1}: {item.basis}
                         </div>
                    ))}
                </div>
            </div>

            {/* Code Panel Module 3 */}
            <div className="mt-6 bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-700 w-full max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-700 pb-2 mb-3">
                    <Code2 size={14} /> CSS para Item #{selectedItem}
                </div>
                <div>
                    <div><span className="text-yellow-400">.item-{selectedItem}</span> {'{'}</div>
                    <div className="pl-4">
                        <span className="text-sky-300">flex-grow</span>: <span className="text-green-300 font-bold">{currentItem.grow}</span>;
                    </div>
                    <div className="pl-4">
                        <span className="text-sky-300">flex-shrink</span>: <span className="text-green-300 font-bold">{currentItem.shrink}</span>;
                    </div>
                    <div className="pl-4">
                        <span className="text-sky-300">flex-basis</span>: <span className="text-green-300 font-bold">{currentItem.basis}</span>;
                    </div>
                    <div>{'}'}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};