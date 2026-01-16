import React, { useState } from 'react';
import { Check, ArrowRight, ArrowDown, Code2 } from 'lucide-react';
import { QuizQuestion } from '../types';

interface Module1Props {
  onComplete: () => void;
}

export const Module1: React.FC<Module1Props> = ({ onComplete }) => {
  const [isFlex, setIsFlex] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([-1, -1]);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "¿Qué ocurre con los elementos hijos cuando activas display: flex?",
      options: [
        "Desaparecen de la pantalla",
        "Se colocan uno al lado del otro (en fila) por defecto",
        "Se estiran verticalmente al 100%"
      ],
      correctIndex: 1
    },
    {
      id: 2,
      question: "¿Cuál es el eje principal por defecto en Flexbox?",
      options: [
        "El eje horizontal (fila)",
        "El eje vertical (columna)",
        "No existe eje principal"
      ],
      correctIndex: 0
    }
  ];

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = optionIndex;
    setQuizAnswers(newAnswers);

    if (newAnswers.every((ans, idx) => ans === questions[idx].correctIndex) && isFlex) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        {/* Theory Section */}
        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800">1. Flex Box: Concepto y Propósito</h2>
          <p className="text-gray-600">
            El modelo <strong>Flexbox</strong> (Caja Flexible) permite que los elementos dentro de un contenedor se organicen para llenar el espacio disponible.
            Los elementos pueden <strong>ensancharse</strong> para ocupar espacio extra o <strong>encogerse</strong> para caber en espacios pequeños.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800">Vocabulario Base</h3>
              <ul className="list-disc ml-5 text-sm text-blue-700 mt-2 space-y-1">
                <li><strong>Contenedor (Padre):</strong> El elemento que tiene <code>display: flex</code>.</li>
                <li><strong>Ítems (Hijos):</strong> Los elementos directos dentro del contenedor.</li>
                <li><strong>Ejes:</strong> Principal (main axis) y Transversal (cross axis).</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-semibold mb-2">Por defecto:</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-0.5 bg-red-500 relative">
                                <ArrowRight className="absolute -top-3 -right-2 text-red-500 w-4 h-4" />
                            </div>
                            <span>Eje Principal</span>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="h-10 w-0.5 bg-indigo-500 relative">
                                <ArrowDown className="absolute -bottom-2 -left-2 text-indigo-500 w-4 h-4" />
                            </div>
                            <span>Eje Transversal</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Demostración Interactiva</h3>
            <button
              onClick={() => setIsFlex(!isFlex)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isFlex ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              {isFlex ? 'Desactivar Flexbox' : 'Activar Flexbox'}
            </button>
          </div>

          <div className={`border-2 border-dashed p-4 transition-all duration-300 relative bg-slate-50 min-h-[150px] ${
              isFlex ? 'border-brand-400 flex gap-4' : 'border-gray-300 block'
          }`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-20 h-20 bg-brand-500 text-white flex items-center justify-center rounded-md font-bold shadow-sm transition-all duration-500 ${!isFlex ? 'mb-2' : ''}`}>
                Item {i}
              </div>
            ))}
             {isFlex && (
                <div className="absolute top-2 left-2 pointer-events-none">
                     <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <ArrowRight size={12}/> Eje Principal (Row)
                     </span>
                </div>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center italic">
            {isFlex ? 'Con display: flex, los ítems se alinean en el eje principal (fila).' : 'Sin Flexbox, los divs son elementos de bloque y se apilan.'}
          </p>

          {/* Code View */}
          <div className="mt-6 bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-700">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-700 pb-2 mb-3">
              <Code2 size={14} /> Código Generado
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="text-xs text-slate-500 mb-1">HTML</div>
                    <div className="text-blue-400">&lt;div <span className="text-sky-300">class</span>=<span className="text-green-300">"contenedor"</span>&gt;</div>
                    <div className="pl-4 text-blue-400">&lt;div <span className="text-sky-300">class</span>=<span className="text-green-300">"item"</span>&gt;<span className="text-white">1</span>&lt;/div&gt;</div>
                    <div className="pl-4 text-blue-400">&lt;div <span className="text-sky-300">class</span>=<span className="text-green-300">"item"</span>&gt;<span className="text-white">2</span>&lt;/div&gt;</div>
                    <div className="pl-4 text-slate-500">&lt;!-- ... --&gt;</div>
                    <div className="text-blue-400">&lt;/div&gt;</div>
                </div>
                <div>
                    <div className="text-xs text-slate-500 mb-1">CSS</div>
                    <div><span className="text-yellow-400">.contenedor</span> {'{'}</div>
                    <div className="pl-4 transition-colors duration-300">
                        <span className="text-sky-300">display</span>: <span className={`${isFlex ? 'text-green-300 font-bold' : 'text-orange-300'}`}>{isFlex ? 'flex' : 'block'}</span>;
                    </div>
                    <div>{'}'}</div>
                    
                    <div className="mt-2"><span className="text-yellow-400">.item</span> {'{'}</div>
                    <div className="pl-4">
                        <span className="text-sky-300">width</span>: <span className="text-green-300">5rem</span>;
                    </div>
                     <div className="pl-4">
                        <span className="text-sky-300">height</span>: <span className="text-green-300">5rem</span>;
                    </div>
                    <div>{'}'}</div>
                </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Check className="text-green-600" size={20}/> 
            Validación de Conceptos
          </h3>
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id}>
                <p className="font-medium text-gray-800 mb-2">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(idx, optIdx)}
                      className={`w-full text-left p-3 rounded-md text-sm transition-all border ${
                        quizAnswers[idx] === optIdx
                          ? quizAnswers[idx] === q.correctIndex
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : 'bg-red-100 border-red-300 text-red-800'
                          : 'bg-white border-gray-200 hover:border-brand-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizAnswers[idx] !== -1 && (
                  <p className={`text-xs mt-1 ${quizAnswers[idx] === q.correctIndex ? 'text-green-600' : 'text-red-600'}`}>
                    {quizAnswers[idx] === q.correctIndex ? '¡Correcto!' : 'Inténtalo de nuevo.'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};