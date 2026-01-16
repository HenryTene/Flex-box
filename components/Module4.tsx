import React, { useState } from 'react';
import { AlignCenter, AlignLeft, AlignRight, AlignJustify, Code2 } from 'lucide-react';

interface Module4Props {
  onComplete: () => void;
}

export const Module4: React.FC<Module4Props> = ({ onComplete }) => {
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [alignContent, setAlignContent] = useState('stretch');
  const [hasWrapped, setHasWrapped] = useState(false);

  // Tracking unique values visited
  const [visitedJustify, setVisitedJustify] = useState<string[]>([]);
  const [visitedAlign, setVisitedAlign] = useState<string[]>([]);

  const updateJustify = (val: string) => {
      setJustifyContent(val);
      if(!visitedJustify.includes(val)) setVisitedJustify([...visitedJustify, val]);
      checkCompletion([...visitedJustify, val], visitedAlign);
  };

  const updateAlign = (val: string) => {
    setAlignItems(val);
    if(!visitedAlign.includes(val)) setVisitedAlign([...visitedAlign, val]);
    checkCompletion(visitedJustify, [...visitedAlign, val]);
  };

  const checkCompletion = (j: string[], a: string[]) => {
      if(j.length >= 5 && a.length >= 4) {
          onComplete();
      }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-800">4. Propiedades de Alineación</h2>
        <p className="text-sm text-gray-600 mt-1">Distribuyendo el espacio extra en los ejes.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Controls */}
        <div className="w-full md:w-80 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto space-y-8">
            
            {/* Justify Content */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    justify-content
                    <span className="text-[10px] bg-red-100 text-red-700 px-1 rounded">Eje Principal</span>
                </label>
                <div className="space-y-1">
                    {['flex-start', 'flex-end', 'center', 'space-between', 'space-around'].map(val => (
                        <button
                            key={val}
                            onClick={() => updateJustify(val)}
                            className={`w-full text-left text-sm px-3 py-2 rounded border ${
                                justifyContent === val ? 'bg-brand-100 border-brand-500 text-brand-800' : 'bg-white text-gray-600'
                            }`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">{visitedJustify.length}/5 explorados</div>
            </div>

            {/* Align Items */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    align-items
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1 rounded">Eje Transversal</span>
                </label>
                 <div className="space-y-1">
                    {['stretch', 'flex-start', 'flex-end', 'center'].map(val => (
                        <button
                            key={val}
                            onClick={() => updateAlign(val)}
                            className={`w-full text-left text-sm px-3 py-2 rounded border ${
                                alignItems === val ? 'bg-brand-100 border-brand-500 text-brand-800' : 'bg-white text-gray-600'
                            }`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">{visitedAlign.length}/4 explorados</div>
            </div>

            {/* Align Content (Conditional) */}
            <div className={`transition-opacity ${!hasWrapped ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    align-content
                    <span className="text-[10px] bg-gray-200 px-1 rounded">Multi-línea (Wrap)</span>
                </label>
                <select 
                    value={alignContent}
                    onChange={(e) => setAlignContent(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                >
                    {['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'].map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>
                <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="forceWrap" checked={hasWrapped} onChange={(e) => setHasWrapped(e.target.checked)} />
                    <label htmlFor="forceWrap" className="text-xs">Activar Wrap y más items</label>
                </div>
            </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-slate-100 p-8 flex flex-col relative overflow-hidden">
            <div className="flex-1 flex items-center justify-center">
                <div 
                    className="bg-white border-2 border-dashed border-slate-300 rounded shadow-xl relative"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: hasWrapped ? 'wrap' : 'nowrap',
                        justifyContent: justifyContent as any,
                        alignItems: alignItems as any,
                        alignContent: alignContent as any,
                        width: '100%',
                        height: '500px',
                        maxWidth: '600px',
                        gap: hasWrapped ? '10px' : '0'
                    }}
                >
                    {/* Generated Items - different heights to show align-items */}
                    {(hasWrapped ? [1,2,3,4,5,6,7,8,9,10,11,12] : [1,2,3,4,5]).map((i) => (
                         <div 
                            key={i}
                            className="bg-brand-500 text-white font-bold flex items-center justify-center rounded border border-brand-600 shadow-sm px-4"
                            style={{
                                minHeight: i % 2 === 0 ? '60px' : '100px', // Varying heights
                                minWidth: '60px',
                                margin: hasWrapped ? '0' : '5px'
                            }}
                        >
                            {i}
                        </div>
                    ))}

                    {/* Axes Indicators */}
                    <div className="absolute -top-6 left-0 right-0 h-4 border-b border-red-400 flex justify-center">
                        <span className="text-[10px] text-red-500 bg-slate-100 px-1 -mb-2">Main Axis (justify-content)</span>
                    </div>
                    <div className="absolute top-0 bottom-0 -left-6 w-4 border-r border-indigo-400 flex items-center">
                        <span className="text-[10px] text-indigo-500 bg-slate-100 px-1 -ml-2 rotate-180" style={{writingMode: 'vertical-rl'}}>Cross Axis (align-items)</span>
                    </div>
                </div>
            </div>

            {/* Code Panel Module 4 */}
            <div className="mt-6 bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-700 w-full max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-700 pb-2 mb-3">
                    <Code2 size={14} /> CSS de Alineación
                </div>
                <div>
                    <div><span className="text-yellow-400">.contenedor</span> {'{'}</div>
                    <div className="pl-4">
                        <span className="text-sky-300">display</span>: <span className="text-green-300">flex</span>;
                    </div>
                    <div className="pl-4">
                        <span className="text-sky-300">justify-content</span>: <span className="text-green-300 font-bold">{justifyContent}</span>;
                    </div>
                    <div className="pl-4">
                        <span className="text-sky-300">align-items</span>: <span className="text-green-300 font-bold">{alignItems}</span>;
                    </div>
                    {hasWrapped && (
                        <div className="pl-4">
                            <span className="text-sky-300">align-content</span>: <span className="text-green-300 font-bold">{alignContent}</span>;
                        </div>
                    )}
                    <div>{'}'}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};