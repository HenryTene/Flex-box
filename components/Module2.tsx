import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ArrowLeft, ArrowUp, Code2 } from 'lucide-react';

interface Module2Props {
  onComplete: () => void;
}

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Wrap = 'nowrap' | 'wrap';

export const Module2: React.FC<Module2Props> = ({ onComplete }) => {
  const [direction, setDirection] = useState<Direction>('row');
  const [wrap, setWrap] = useState<Wrap>('nowrap');
  
  // Practice Mode States
  const [practiceStep, setPracticeStep] = useState(0); // 0: directions, 1: wrap, 2: done
  const [checkedDirections, setCheckedDirections] = useState<Direction[]>([]);
  const [checkedWrap, setCheckedWrap] = useState(false);

  useEffect(() => {
    if (!checkedDirections.includes(direction)) {
      setCheckedDirections([...checkedDirections, direction]);
    }
  }, [direction, checkedDirections]);

  const allDirectionsChecked = ['row', 'row-reverse', 'column', 'column-reverse'].every(d => 
    checkedDirections.includes(d as Direction)
  );

  useEffect(() => {
      if(allDirectionsChecked && wrap === 'wrap' && !checkedWrap) {
          setCheckedWrap(true);
      }
      
      if(allDirectionsChecked && checkedWrap) {
          onComplete();
      }
  }, [allDirectionsChecked, wrap, checkedWrap, onComplete]);

  const getArrowIcon = () => {
    switch (direction) {
      case 'row': return <ArrowRight className="text-red-500" />;
      case 'row-reverse': return <ArrowLeft className="text-red-500" />;
      case 'column': return <ArrowDown className="text-red-500" />;
      case 'column-reverse': return <ArrowUp className="text-red-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-800">2. Contenedor (Padre)</h2>
        <p className="text-sm text-gray-600 mt-1">Configuración del espacio y flujo de los elementos.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Controls Panel */}
        <div className="w-full md:w-80 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto space-y-8">
            
            {/* Direction Control */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    flex-direction
                    <span className="block text-xs font-normal text-gray-500">Dirección del eje principal</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                    {['row', 'row-reverse', 'column', 'column-reverse'].map((dir) => (
                        <button
                            key={dir}
                            onClick={() => setDirection(dir as Direction)}
                            className={`px-3 py-2 text-sm rounded-md border text-left transition-all ${
                                direction === dir 
                                ? 'bg-brand-100 border-brand-500 text-brand-800 ring-1 ring-brand-500' 
                                : 'bg-white border-gray-300 hover:border-brand-300'
                            }`}
                        >
                            <span className="font-mono text-xs block opacity-75">value:</span>
                            {dir}
                        </button>
                    ))}
                </div>
                <div className="mt-2 text-xs text-slate-500 bg-slate-100 p-2 rounded">
                    <strong>Ejercicio 1:</strong> Selecciona las 4 direcciones para ver cómo cambia el flujo.
                    <div className="mt-1 flex gap-1">
                        {['row', 'row-reverse', 'column', 'column-reverse'].map(d => (
                            <div key={d} className={`w-2 h-2 rounded-full ${checkedDirections.includes(d as Direction) ? 'bg-green-500' : 'bg-gray-300'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Wrap Control */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    flex-wrap
                    <span className="block text-xs font-normal text-gray-500">Comportamiento al faltar espacio</span>
                </label>
                <div className="flex gap-2">
                    <button
                        onClick={() => setWrap('nowrap')}
                        className={`flex-1 px-3 py-2 text-sm rounded-md border ${wrap === 'nowrap' ? 'bg-brand-100 border-brand-500 text-brand-800' : 'bg-white'}`}
                    >
                        nowrap
                    </button>
                    <button
                        onClick={() => setWrap('wrap')}
                        className={`flex-1 px-3 py-2 text-sm rounded-md border ${wrap === 'wrap' ? 'bg-brand-100 border-brand-500 text-brand-800' : 'bg-white'}`}
                    >
                        wrap
                    </button>
                </div>
                <div className="mt-2 text-xs text-slate-500 bg-slate-100 p-2 rounded">
                     <strong>Ejercicio 2:</strong> Activa 'wrap' para permitir que los elementos salten de línea.
                     {checkedWrap && <span className="text-green-600 ml-2 font-bold">✓ Completado</span>}
                </div>
            </div>
        </div>

        {/* Visualization */}
        <div className="flex-1 bg-slate-100 p-8 flex flex-col relative overflow-hidden">
            <div className="flex-1 flex items-center justify-center overflow-auto relative">
                <div className="absolute top-4 right-4 bg-white/90 p-3 rounded shadow backdrop-blur-sm text-xs z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center justify-center w-5 h-5 bg-red-100 rounded text-red-600">
                            {getArrowIcon()}
                        </div>
                        <span>Eje Principal ({direction})</span>
                    </div>
                    <div className="text-gray-500 pl-7">
                        {direction.includes('row') ? 'Horizontal' : 'Vertical'}
                    </div>
                </div>

                {/* The Container */}
                <div 
                    className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-2 transition-all duration-500 shadow-xl overflow-hidden relative"
                    style={{
                        display: 'flex',
                        flexDirection: direction,
                        flexWrap: wrap,
                        width: direction.includes('row') ? '300px' : '400px',
                        height: direction.includes('row') ? '400px' : '300px',
                        gap: '8px'
                    }}
                >
                    {/* Items */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div 
                            key={i}
                            className="bg-brand-500 text-white font-bold flex items-center justify-center rounded shadow-sm border border-brand-400 flex-shrink-0"
                            style={{
                                width: '80px',
                                height: '80px',
                                opacity: 0.9
                            }}
                        >
                            {i}
                        </div>
                    ))}
                </div>
                
                {/* Label for Container */}
                <div className="absolute bottom-4 left-4 bg-slate-800 text-white px-3 py-1 rounded text-xs">
                    Container 300px/400px
                </div>
            </div>

            {/* Code Panel Module 2 */}
            <div className="mt-6 bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-700 w-full max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-700 pb-2 mb-3">
                    <Code2 size={14} /> CSS Generado
                </div>
                <div>
                    <div><span className="text-yellow-400">.contenedor</span> {'{'}</div>
                    <div className="pl-4">
                        <span className="text-sky-300">display</span>: <span className="text-green-300">flex</span>;
                    </div>
                    <div className="pl-4">
                        <span className="text-sky-300">flex-direction</span>: <span className="text-green-300 font-bold">{direction}</span>;
                    </div>
                    <div className="pl-4">
                        <span className="text-sky-300">flex-wrap</span>: <span className="text-green-300 font-bold">{wrap}</span>;
                    </div>
                    <div>{'}'}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};