import React from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';

interface TopBarProps {
  progress: number;
  onReset: () => void;
  isPracticeMode: boolean;
  onToggleMode: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ progress, onReset, isPracticeMode, onToggleMode }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center gap-4 w-1/3">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
            <span>PROGRESO DEL CURSO</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
                onClick={() => isPracticeMode && onToggleMode()}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${!isPracticeMode ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Demostración
            </button>
            <button
                onClick={() => !isPracticeMode && onToggleMode()}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${isPracticeMode ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Práctica
            </button>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Reiniciar todos los estilos"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </div>
    </header>
  );
};
