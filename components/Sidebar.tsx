import React from 'react';
import { ModuleId, ModuleData } from '../types';
import { BookOpen, Layout, Box, Sliders, Monitor } from 'lucide-react';

interface SidebarProps {
  currentModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  completedModules: ModuleId[];
}

const MODULES: ModuleData[] = [
  { id: ModuleId.INTRO, title: '1. Flex Box (Concepto)', description: 'Conceptos base y ejes' },
  { id: ModuleId.CONTAINER, title: '2. Contenedor (Padre)', description: 'Dirección y Wrap' },
  { id: ModuleId.ITEMS, title: '3. Ítems (Hijos)', description: 'Grow, Shrink, Basis' },
  { id: ModuleId.ALIGNMENT, title: '4. Propiedades', description: 'Alineación y Distribución' },
  { id: ModuleId.PROJECT, title: '5. Aplicación', description: 'Maquetación Final' },
];

const ICONS = {
  [ModuleId.INTRO]: BookOpen,
  [ModuleId.CONTAINER]: Layout,
  [ModuleId.ITEMS]: Box,
  [ModuleId.ALIGNMENT]: Sliders,
  [ModuleId.PROJECT]: Monitor,
};

export const Sidebar: React.FC<SidebarProps> = ({ currentModule, onSelectModule, completedModules }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col h-full border-r border-slate-700 overflow-y-auto">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-brand-500">CSS</span> Flexbox
        </h1>
        <p className="text-xs text-slate-400 mt-1">Curso Interactivo</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {MODULES.map((module) => {
          const Icon = ICONS[module.id];
          const isActive = currentModule === module.id;
          const isCompleted = completedModules.includes(module.id);

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3 group ${
                isActive
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className={`mt-1 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-brand-400'}`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="font-medium text-sm">{module.title}</div>
                <div className={`text-xs mt-0.5 ${isActive ? 'text-brand-100' : 'text-slate-500'}`}>
                  {module.description}
                </div>
              </div>
              {isCompleted && (
                <div className="ml-auto mt-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
        v1.0.0 • Modo Educativo
      </div>
    </aside>
  );
};
