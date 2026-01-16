import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, CheckCircle } from 'lucide-react';

interface Module5Props {
  onComplete: () => void;
}

export const Module5: React.FC<Module5Props> = ({ onComplete }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Simulated Code Editor State
  const [containerCSS, setContainerCSS] = useState(`display: flex;
flex-direction: row;
flex-wrap: wrap;
min-height: 100vh;`);
  
  const [mainAreaCSS, setMainAreaCSS] = useState(`display: flex;
flex: 1;`);

  const [validation, setValidation] = useState({
      hasFlex: false,
      hasDirection: false,
      hasGrow: false,
      isResponsive: false
  });

  // Basic "parser" to validate the assignment
  useEffect(() => {
      const code = (containerCSS + mainAreaCSS).toLowerCase();
      
      const v = {
          hasFlex: code.includes('display: flex') || code.includes('display:flex'),
          hasDirection: code.includes('flex-direction'),
          hasGrow: code.includes('flex-grow') || code.includes('flex: 1') || code.includes('flex:1'),
          isResponsive: true // Implicitly true if they use the tool
      };
      
      setValidation(v);
      if(v.hasFlex && v.hasDirection && v.hasGrow) {
          onComplete();
      }
  }, [containerCSS, mainAreaCSS, onComplete]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-gray-800">5. Aplicación Final</h2>
            <p className="text-xs text-gray-600">Maqueta: Header, Nav, Article, Aside, Footer</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded">
            <button onClick={() => setViewMode('desktop')} className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-white shadow text-brand-600' : 'text-gray-400'}`}><Monitor size={20}/></button>
            <button onClick={() => setViewMode('mobile')} className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-white shadow text-brand-600' : 'text-gray-400'}`}><Smartphone size={20}/></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Code Editor */}
        <div className="w-full lg:w-96 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-700 overflow-y-auto">
            <div className="p-4 bg-slate-800 text-xs font-mono font-bold text-slate-400 border-b border-slate-700">style.css</div>
            
            <div className="p-4 space-y-6 flex-1 font-mono text-sm">
                
                <div>
                    <span className="text-yellow-400">.site-container</span> {'{'}
                    <textarea 
                        value={containerCSS}
                        onChange={(e) => setContainerCSS(e.target.value)}
                        className="w-full h-32 bg-slate-950 text-white p-2 mt-1 rounded border border-slate-700 focus:border-brand-500 focus:outline-none resize-none"
                    />
                    {'}'}
                </div>

                <div>
                    <span className="text-yellow-400">.main-content-area</span> {'{'}
                    <p className="text-xs text-slate-500 mb-1">// Contiene Nav, Article, Aside</p>
                    <textarea 
                        value={mainAreaCSS}
                        onChange={(e) => setMainAreaCSS(e.target.value)}
                        className="w-full h-24 bg-slate-950 text-white p-2 mt-1 rounded border border-slate-700 focus:border-brand-500 focus:outline-none resize-none"
                    />
                    {'}'}
                </div>

                <div className="p-4 bg-slate-800 rounded">
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Checklist del Logro</h4>
                    <ul className="space-y-2 text-xs">
                        <li className={`flex items-center gap-2 ${validation.hasFlex ? 'text-green-400' : 'text-slate-500'}`}>
                            <CheckCircle size={14} /> Usar display: flex
                        </li>
                        <li className={`flex items-center gap-2 ${validation.hasDirection ? 'text-green-400' : 'text-slate-500'}`}>
                            <CheckCircle size={14} /> Configurar direction
                        </li>
                        <li className={`flex items-center gap-2 ${validation.hasGrow ? 'text-green-400' : 'text-slate-500'}`}>
                            <CheckCircle size={14} /> Usar grow/shrink (flex)
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Live Preview */}
        <div className="flex-1 bg-gray-200 overflow-auto p-8 flex justify-center">
            
            {/* The Layout Implementation */}
            {/* We apply the user's string CSS as inline styles by parsing/mapping roughly or just applying specific logic for this demo */}
            {/* Since applying raw strings to inline styles is tricky in React without dangerousSetInnerHTML or parsing, we will map specific keywords to standard styles for the simulation */}
            
            <div 
                id="preview-window"
                className={`bg-white shadow-2xl transition-all duration-500 flex flex-col ${viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-4xl min-h-[600px]'}`}
            >
                {/* 
                   Dynamic Styles Injection:
                   For this educational demo, we parse the textarea string to find property:value pairs roughly.
                */}
                <style>{`
                    .demo-container { ${containerCSS} }
                    .demo-main { ${mainAreaCSS} }
                    
                    /* Mobile Override simulation */
                    ${viewMode === 'mobile' ? `
                        .demo-container { flex-direction: column !important; }
                        .demo-main { flex-direction: column !important; }
                        .demo-nav, .demo-aside { width: 100% !important; order: 1; }
                        .demo-article { order: 2; }
                        .demo-footer { order: 3; }
                    ` : ''}
                `}</style>

                <div className="demo-container w-full h-full font-sans">
                    
                    <header className="bg-slate-800 text-white p-6 flex items-center justify-center font-bold text-xl tracking-widest w-full min-h-[80px]">
                        HEADER
                    </header>

                    {/* Main Content Area Wrapper */}
                    <div className="demo-main w-full">
                        
                        <nav className="demo-nav bg-brand-600 text-white p-4 min-w-[150px] min-h-[100px] flex items-center justify-center font-bold">
                            NAV
                        </nav>

                        <article className="demo-article bg-white p-8 flex-1 border-x border-gray-100 min-h-[300px]">
                            <h1 className="text-2xl font-bold mb-4">Article Content</h1>
                            <p className="text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="h-32 bg-gray-100 rounded"></div>
                        </article>

                        <aside className="demo-aside bg-brand-200 text-brand-900 p-4 min-w-[200px] flex items-center justify-center font-bold">
                            ASIDE
                        </aside>

                    </div>

                    <footer className="bg-slate-900 text-slate-400 p-6 flex items-center justify-center font-bold text-sm w-full min-h-[60px] mt-auto">
                        FOOTER
                    </footer>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
