import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Module1 } from './components/Module1';
import { Module2 } from './components/Module2';
import { Module3 } from './components/Module3';
import { Module4 } from './components/Module4';
import { Module5 } from './components/Module5';
import { ModuleId } from './types';

function App() {
  const [currentModule, setCurrentModule] = useState<ModuleId>(ModuleId.INTRO);
  const [completedModules, setCompletedModules] = useState<ModuleId[]>([]);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const handleComplete = (id: ModuleId) => {
    if (!completedModules.includes(id)) {
      setCompletedModules(prev => [...prev, id]);
    }
  };

  const handleReset = () => {
    if(window.confirm("¿Reiniciar todo el progreso?")) {
        setCompletedModules([]);
        setCurrentModule(ModuleId.INTRO);
        setIsPracticeMode(false);
    }
  };

  const progress = (completedModules.length / 5) * 100;

  const renderModule = () => {
    switch (currentModule) {
      case ModuleId.INTRO:
        return <Module1 onComplete={() => handleComplete(ModuleId.INTRO)} />;
      case ModuleId.CONTAINER:
        return <Module2 onComplete={() => handleComplete(ModuleId.CONTAINER)} />;
      case ModuleId.ITEMS:
        return <Module3 onComplete={() => handleComplete(ModuleId.ITEMS)} />;
      case ModuleId.ALIGNMENT:
        return <Module4 onComplete={() => handleComplete(ModuleId.ALIGNMENT)} />;
      case ModuleId.PROJECT:
        return <Module5 onComplete={() => handleComplete(ModuleId.PROJECT)} />;
      default:
        return <div>Selecciona un módulo</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar 
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        completedModules={completedModules}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          progress={progress}
          onReset={handleReset}
          isPracticeMode={isPracticeMode}
          onToggleMode={() => setIsPracticeMode(!isPracticeMode)}
        />
        
        <main className="flex-1 overflow-hidden relative">
            {/* Visual indication of Practice Mode */}
            {isPracticeMode && currentModule !== ModuleId.PROJECT && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-50 text-yellow-800 text-xs py-1 px-4 text-center border-b border-yellow-200 z-10">
                    Modo Práctica Activado - Completa los ejercicios para avanzar
                </div>
            )}
            
            {renderModule()}
        </main>
      </div>
    </div>
  );
}

export default App;
