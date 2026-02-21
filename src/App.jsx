import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Monitor, Smartphone, Bot, Code, Lightbulb, 
  Network, ShieldAlert, BrainCircuit, HeartHandshake,
  Globe, Quote, ArrowRight, Play, CheckCircle, XCircle, 
  UserCheck, Zap, Activity, Cpu, Sparkles
} from 'lucide-react';

// --- Custom Hooks ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntersecting(true);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);
  return [ref, isIntersecting];
};

// --- Reusable Reveal Component ---
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// INTERACTIVE COMPONENT 1: The Topology Shift
// ==========================================
const TopologyVisualizer = ({ stage }) => {
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 0 ? 'opacity-100' : 'opacity-0'}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <rect x="170" y="70" width="60" height="60" className="fill-slate-700 stroke-slate-500" strokeWidth="2" />
          <text x="200" y="105" fill="white" fontSize="10" textAnchor="middle" className="font-mono">HOST</text>
          {[20, 100, 180, 260, 340].map((x, i) => (
            <g key={i}>
              <path d={`M ${x+20} 180 L 200 130`} className="stroke-slate-600" strokeWidth="1" />
              <rect x={x} y="170" width="40" height="20" className="fill-slate-800 stroke-slate-600" />
            </g>
          ))}
        </svg>
      </div>

      <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 1 ? 'opacity-100' : 'opacity-0'}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {[50, 150, 250, 350].map((x, i) => (
            [40, 100, 160].map((y, j) => (
              <g key={`${i}-${j}`}>
                <line x1={x} y1={y} x2="200" y2="100" className="stroke-blue-900/30" strokeWidth="1" />
                <rect x={x-15} y={y-10} width="30" height="20" className="fill-slate-800 stroke-blue-500" strokeWidth="1.5" />
              </g>
            ))
          ))}
          <circle cx="200" cy="100" r="30" className="fill-blue-900/50 stroke-blue-400 animate-pulse" />
          <text x="200" y="104" fill="white" fontSize="10" textAnchor="middle" className="font-mono">WWW</text>
        </svg>
      </div>

      <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <path d="M 120 80 Q 150 40 200 80 T 280 80 Q 300 120 250 140 T 150 140 Q 100 120 120 80" className="fill-fuchsia-900/20 stroke-fuchsia-500" strokeWidth="2" />
          <text x="200" y="105" fill="white" fontSize="12" textAnchor="middle" className="font-bold tracking-widest">CLOUD</text>
          {[30, 90, 150, 210, 270, 330].map((x, i) => (
            <circle key={i} cx={x+20} cy="180" r="6" className="fill-slate-800 stroke-fuchsia-400" />
          ))}
          <path d="M 200 140 L 50 180 M 200 140 L 110 180 M 200 140 L 170 180 M 200 140 L 230 180 M 200 140 L 290 180 M 200 140 L 350 180" className="stroke-fuchsia-500/50 stroke-dasharray-4 animate-dash" strokeWidth="2" />
        </svg>
      </div>

      <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 3 ? 'opacity-100' : 'opacity-0'}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <circle cx="200" cy="100" r="80" className="fill-none stroke-cyan-900" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="100" r="50" className="fill-none stroke-cyan-800" strokeWidth="1" strokeDasharray="2 2" />
          <g className="animate-spin-slow" style={{ transformOrigin: '200px 100px' }}>
             <circle cx="120" cy="100" r="10" className="fill-slate-900 stroke-cyan-400" strokeWidth="2" />
             <text x="120" y="95" fill="#22d3ee" fontSize="8" textAnchor="middle">Code</text>
             <circle cx="280" cy="100" r="10" className="fill-slate-900 stroke-cyan-400" strokeWidth="2" />
             <text x="280" y="95" fill="#22d3ee" fontSize="8" textAnchor="middle">Data</text>
          </g>
          <g className="animate-spin-reverse-slow" style={{ transformOrigin: '200px 100px' }}>
             <circle cx="200" cy="50" r="8" className="fill-slate-900 stroke-fuchsia-400" strokeWidth="2" />
             <circle cx="200" cy="150" r="8" className="fill-slate-900 stroke-fuchsia-400" strokeWidth="2" />
          </g>
          <circle cx="200" cy="100" r="20" className="fill-cyan-500/20 stroke-cyan-300 animate-pulse" strokeWidth="2" />
          <text x="200" y="104" fill="white" fontSize="10" textAnchor="middle" className="font-bold">YOU</text>
        </svg>
      </div>
    </div>
  );
};

const ParadigmShift = () => {
  const [stage, setStage] = useState(3);
  const timeline = [
    { year: "1980s", tech: "Mainframe", color: "text-slate-400", border: "border-slate-400", desc: "Centralized computing. Humans were input operators." },
    { year: "1990s", tech: "PC & Web", color: "text-blue-400", border: "border-blue-400", desc: "Decentralized. We became active 'Users' of software." },
    { year: "2010s", tech: "Mobile & Cloud", color: "text-fuchsia-400", border: "border-fuchsia-400", desc: "Always-on SaaS. The era of the digital citizen." },
    { year: "2026", tech: "Agentic Swarms", color: "text-cyan-400", border: "border-cyan-400", desc: "Generative intelligence. You are the orchestrator." }
  ];

  return (
    <section className="py-24 bg-slate-950 border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">The $10 Trillion Shift</h2>
            <p className="text-slate-400 mt-4 uppercase tracking-widest font-bold text-sm">Drag to visualize the reinvention of the stack</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative">
              <TopologyVisualizer stage={stage} />
              <div className="mt-8">
                <input 
                  type="range" min="0" max="3" step="1" 
                  value={stage} onChange={(e) => setStage(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between mt-6">
                  {timeline.map((item, idx) => (
                    <button 
                      key={idx} onClick={() => setStage(idx)}
                      className={`text-center transition-all ${stage === idx ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80'}`}
                    >
                      <div className={`w-3 h-3 mx-auto rounded-full mb-2 border-2 ${stage === idx ? `bg-current ${item.color} ${item.border}` : 'border-slate-600 bg-transparent'}`} />
                      <div className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.year}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${timeline[stage].color}`}>
                  {timeline[stage].tech}
                </h3>
                <p className="text-slate-300 h-12">{timeline[stage].desc}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-slate-900">
                <div className="text-7xl font-black text-cyan-400 tracking-tighter mb-4">$10.0T</div>
                <h4 className="text-xl font-bold text-white uppercase tracking-widest mb-4">Capital Rotation</h4>
                <p className="text-slate-400 leading-relaxed">
                  The infrastructure of the world is shifting from code that is <strong>hand-written</strong> to logic that is <strong>generated by intent</strong>. 
                </p>
                <div className="mt-6 flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-slate-800">
                  <Quote className="text-cyan-500 shrink-0" size={24} />
                  <p className="text-sm text-slate-300 italic">"You no longer program the software. You train the software. You orchestrate it."<br/><span className="text-cyan-400 font-bold not-italic text-[10px] uppercase block mt-2">— Jensen Huang, CES 2026</span></p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// INTERACTIVE COMPONENT 2: Syntax vs Vibe Toggle
// ==========================================
const SyntaxVsImagination = () => {
  const [mode, setMode] = useState('vibe'); 

  return (
    <section className="py-24 bg-black overflow-hidden border-b border-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Imagination is the New Syntax</h2>
            <p className="text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold text-sm">Interactive Comparison</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex justify-center mb-12">
            <div className="bg-slate-900 p-1.5 rounded-full border border-slate-800 inline-flex shadow-2xl">
              <button 
                onClick={() => setMode('syntax')}
                className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all ${mode === 'syntax' ? 'bg-slate-800 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Code size={16} /> 2015: Syntax
              </button>
              <button 
                onClick={() => setMode('vibe')}
                className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all ${mode === 'vibe' ? 'bg-cyan-950 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Lightbulb size={16} /> 2026: Vibe
              </button>
            </div>
          </div>

          <div className="relative min-h-[500px] md:h-[480px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all duration-300">
            {/* Syntax View (2015) */}
            <div className={`absolute inset-0 p-6 md:p-10 transition-all duration-500 ease-in-out flex flex-col ${mode === 'syntax' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Terminal size={16} /> IDE Workspace</span>
                <span className="text-slate-600 text-[10px] font-mono">efficiency_tracker.cpp</span>
              </div>
              <div className="font-mono text-[11px] md:text-sm text-slate-400 leading-relaxed md:leading-loose overflow-y-auto pr-2 scrollbar-hide">
                <p className="text-blue-400">#include &lt;iostream&gt;</p>
                <p className="text-blue-400">#include &lt;vector&gt;</p>
                <p className="text-blue-400 mb-4">#include &lt;algorithm&gt;</p>
                <p className="text-purple-400">class EfficiencyTracker {"{"}</p>
                <p className="pl-4">std::vector&lt;int&gt; data;</p>
                <p className="pl-4 text-orange-400 mt-2">public:</p>
                <p className="pl-8 text-emerald-400">void addData(int val) {"{ data.push_back(val); }"}</p>
                <p className="pl-8 text-emerald-400">void process() {"{"}</p>
                <p className="pl-12 text-slate-500">// 4 hours of debugging sorting logic...</p>
                <p className="pl-12">std::sort(data.begin(), data.end());</p>
                <p className="pl-8">{"}"}</p>
                <p className="pl-8 text-emerald-400">int main() {"{"}</p>
                <p className="pl-12 text-slate-400">EfficiencyTracker et;</p>
                <p className="pl-12 text-slate-400">et.addData(95);</p>
                <p className="pl-12 text-slate-400">return 0;</p>
                <p className="pl-8">{"}"}</p>
                <p className="text-purple-400">{"};"}</p>
              </div>
              <div className="mt-auto pt-6 w-full text-center">
                 <p className="text-fuchsia-300 text-[10px] uppercase tracking-[0.2em] font-black border-t border-fuchsia-500/20 pt-4">80% of time spent fighting the machine.</p>
              </div>
            </div>

            {/* Vibe View (2026) */}
            <div className={`absolute inset-0 p-6 md:p-10 transition-all duration-500 ease-in-out flex flex-col ${mode === 'vibe' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Sparkles size={16} /> Imagination Canvas</span>
              </div>
              
              <div className="bg-cyan-950/30 border border-cyan-500/30 p-6 rounded-2xl mb-8 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                <p className="text-white text-base md:text-xl italic font-medium leading-relaxed">"Build me a web app that tracks homework efficiency and visualizes my study habits using a minimalist dashboard."</p>
              </div>

              <div className="flex-1 border border-slate-800 rounded-xl bg-slate-900/50 p-4 md:p-8 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 w-full max-w-sm space-y-4">
                  <div className="h-4 w-1/3 bg-slate-800 rounded animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="h-20 flex-1 bg-cyan-900/20 rounded-lg border border-cyan-500/20 flex flex-col items-center justify-center">
                       <Activity className="text-cyan-400/50 mb-1" size={20}/>
                       <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                    </div>
                    <div className="h-20 flex-1 bg-cyan-900/20 rounded-lg border border-cyan-500/20 flex flex-col items-center justify-center">
                       <Network className="text-cyan-400/50 mb-1" size={20}/>
                       <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  <div className="h-32 w-full bg-slate-800/30 rounded-lg border border-slate-800/50 flex flex-col p-4 gap-2">
                     <div className="h-2 w-full bg-slate-800 rounded"></div>
                     <div className="h-2 w-4/5 bg-slate-800 rounded"></div>
                     <div className="h-2 w-2/3 bg-slate-800 rounded"></div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] z-20 whitespace-nowrap border-2 border-white">
                  App Ready: Visualizing...
                </div>
              </div>

              <div className="mt-auto pt-6 w-full text-center">
                 <p className="text-cyan-300 text-[10px] uppercase tracking-[0.2em] font-black border-t border-cyan-500/20 pt-4">100% of time spent on architecture & impact.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const OrchestratorSim = () => {
  const [step, setStep] = useState(0); 
  const triggerDecomposition = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1500);
  };
  return (
    <div className="h-full flex flex-col justify-between p-2">
      <p className="text-slate-400 text-sm mb-6">Mastering <strong className="text-white">Workflow Decomposition</strong>. Break a massive problem into agent-executable tasks.</p>
      <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
        {step === 0 && (
          <button onClick={triggerDecomposition} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
            Decompose Project
          </button>
        )}
        {step > 0 && (
          <div className="w-full h-full relative">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                <UserCheck className="text-white" size={20} />
              </div>
              <span className="text-[10px] font-bold text-blue-400 mt-2 uppercase tracking-widest">You</span>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 100 100 L 260 50" className={`stroke-blue-500/50 fill-none transition-all duration-1000 ${step === 2 ? 'stroke-dasharray-4 animate-dash' : ''}`} strokeWidth="2" />
              <path d="M 100 100 L 260 100" className={`stroke-cyan-500/50 fill-none transition-all duration-1000 ${step === 2 ? 'stroke-dasharray-4 animate-dash' : ''}`} strokeWidth="2" />
              <path d="M 100 100 L 260 150" className={`stroke-blue-500/50 fill-none transition-all duration-1000 ${step === 2 ? 'stroke-dasharray-4 animate-dash' : ''}`} strokeWidth="2" />
            </svg>
            <div className={`absolute top-1/4 left-[65%] -translate-y-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500 ${step === 2 ? 'opacity-100' : 'opacity-0 translate-x-[-20px]'}`}>
               <div className="w-8 h-8 bg-slate-800 border border-blue-500 rounded-full flex items-center justify-center"><Bot size={14} className="text-blue-400"/></div>
               <span className="text-[10px] text-slate-300 font-mono">Agent: Research</span>
            </div>
            <div className={`absolute top-1/2 left-[65%] -translate-y-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500 delay-150 ${step === 2 ? 'opacity-100' : 'opacity-0 translate-x-[-20px]'}`}>
               <div className="w-8 h-8 bg-slate-800 border border-cyan-500 rounded-full flex items-center justify-center"><Code size={14} className="text-cyan-400"/></div>
               <span className="text-[10px] text-slate-300 font-mono">Agent: Code</span>
            </div>
            <div className={`absolute top-[75%] left-[65%] -translate-y-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500 delay-300 ${step === 2 ? 'opacity-100' : 'opacity-0 translate-x-[-20px]'}`}>
               <div className="w-8 h-8 bg-slate-800 border border-blue-500 rounded-full flex items-center justify-center"><Activity size={14} className="text-blue-400"/></div>
               <span className="text-[10px] text-slate-300 font-mono">Agent: QA Test</span>
            </div>
          </div>
        )}
      </div>
      {step === 2 && (
        <button onClick={() => setStep(0)} className="mt-4 text-xs text-slate-500 hover:text-white uppercase tracking-widest text-center w-full">Reset Simulation</button>
      )}
    </div>
  );
};

const SmartDesignerSim = () => {
  const [dataPos, setDataPos] = useState(0); 
  useEffect(() => {
    if (dataPos === 0) {
      const timer = setTimeout(() => setDataPos(1), 1000);
      return () => clearTimeout(timer);
    }
  }, [dataPos]);

  return (
    <div className="h-full flex flex-col justify-between p-2">
      <p className="text-slate-400 text-sm mb-6">You are the <strong className="text-emerald-400">Human-in-the-Loop</strong>. Do not re-perform the work; validate the intent.</p>
      <div className="flex-1 bg-slate-950 rounded-xl border border-emerald-900/50 relative overflow-hidden flex flex-col justify-center px-8">
        <div className="relative h-2 bg-slate-800 rounded-full mb-8">
           <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white] transition-all duration-1000 ease-linear ${
             dataPos === 0 ? 'left-[10%]' : 
             dataPos === 1 ? 'left-[50%] -translate-x-1/2' : 
             dataPos === 2 ? 'left-[90%]' : 'left-[50%] -translate-x-1/2 opacity-0 scale-150 bg-red-500'
           }`}></div>
           <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
             dataPos === 1 ? 'border-emerald-400 bg-emerald-900/30 animate-pulse' : 
             dataPos === 2 ? 'border-slate-700 bg-slate-800' : 'border-slate-700 bg-slate-900'
           }`}>
             <ShieldAlert className={dataPos === 1 ? 'text-emerald-400' : 'text-slate-600'} size={20}/>
           </div>
        </div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8">
          <span>AI Generation</span>
          <span className={dataPos === 1 ? 'text-emerald-400' : ''}>Intent Audit</span>
          <span>Execution</span>
        </div>
        <div className="flex justify-center gap-4 h-12">
           {dataPos === 1 ? (
             <>
               <button onClick={() => setDataPos(2)} className="px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(5,150,105,0.4)]">
                 <CheckCircle size={14}/> Approve
               </button>
               <button onClick={() => setDataPos(3)} className="px-6 bg-red-900/50 hover:bg-red-800 border border-red-500/50 text-red-200 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                 <XCircle size={14}/> Reject
               </button>
             </>
           ) : dataPos > 1 ? (
             <button onClick={() => setDataPos(0)} className="text-xs text-slate-500 hover:text-white uppercase tracking-widest">Run Next Batch</button>
           ) : (
             <span className="text-xs text-slate-600 uppercase tracking-widest flex items-center gap-2"><Cpu size={14} className="animate-spin-slow"/> Generating...</span>
           )}
        </div>
      </div>
    </div>
  );
};

const CompetenciesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, title: "The Orchestrator", icon: Network, color: "text-blue-400", bg: "bg-blue-900/20", border: "border-blue-500" },
    { id: 1, title: "Smart Designer", icon: ShieldAlert, color: "text-emerald-400", bg: "bg-emerald-900/20", border: "border-emerald-500" },
    { id: 2, title: "Synthetic Polymath", icon: BrainCircuit, color: "text-fuchsia-400", bg: "bg-fuchsia-900/20", border: "border-fuchsia-500" },
    { id: 3, title: "The Human Moat", icon: HeartHandshake, color: "text-orange-400", bg: "bg-orange-900/20", border: "border-orange-500" }
  ];
  const renderContent = () => {
    switch(activeTab) {
      case 0: return <OrchestratorSim />;
      case 1: return <SmartDesignerSim />;
      case 2: return (
        <div className="h-full flex flex-col justify-center text-center p-6">
          <p className="text-slate-400 text-sm mb-8">AI separates domains. Your value is <strong className="text-fuchsia-400 uppercase tracking-widest">Synthesis</strong>.</p>
          <div className="relative h-40 w-full max-w-sm mx-auto">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs font-bold text-white uppercase">Biology</div>
             <div className="absolute bottom-0 left-0 px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs font-bold text-white uppercase">Code</div>
             <div className="absolute bottom-0 right-0 px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs font-bold text-white uppercase">Ethics</div>
             <svg className="absolute inset-0 w-full h-full -z-10">
               <path d="M 50% 20% L 20% 80% L 80% 80% Z" fill="none" className="stroke-fuchsia-500/30" strokeWidth="2" />
               <circle cx="50%" cy="60%" r="30" className="fill-fuchsia-500/10 stroke-fuchsia-400 animate-pulse" />
             </svg>
             <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-fuchsia-400 text-xs font-black uppercase tracking-widest">YOU</div>
          </div>
        </div>
      );
      case 3: return (
        <div className="h-full flex flex-col justify-center p-6 text-center">
           <HeartHandshake className="mx-auto text-orange-400 mb-6" size={48} />
           <p className="text-white text-lg italic mb-6">"The only thing that cannot be tokenized is human connection."</p>
           <div className="grid grid-cols-2 gap-4 text-left">
             <div className="bg-orange-950/30 border border-orange-900/50 p-4 rounded-xl">
               <span className="block text-orange-400 text-[10px] font-black uppercase tracking-widest mb-1">Moat 1</span>
               <span className="text-white text-sm font-bold">Accountability</span>
             </div>
             <div className="bg-orange-950/30 border border-orange-900/50 p-4 rounded-xl">
               <span className="block text-orange-400 text-[10px] font-black uppercase tracking-widest mb-1">Moat 2</span>
               <span className="text-white text-sm font-bold">Empathy</span>
             </div>
           </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.4em] text-cyan-400 uppercase">Core Competencies</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 uppercase italic tracking-tighter">The Evolutions of You</h2>
          </div>
        </Reveal>
        <div className="flex flex-col lg:flex-row gap-8">
          <Reveal delay={200} className="lg:w-1/3 flex flex-col gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center border ${
                    isActive ? `bg-slate-900 ${tab.border} shadow-lg` : 'bg-black border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`p-3 rounded-xl mr-4 ${isActive ? tab.bg : 'bg-slate-900'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? tab.color : 'text-slate-500'}`} />
                  </div>
                  <h3 className={`font-bold text-sm tracking-widest uppercase ${isActive ? 'text-white' : 'text-slate-500'}`}>{tab.title}</h3>
                </button>
              );
            })}
          </Reveal>
          <Reveal delay={400} className="lg:w-2/3">
            <div className={`bg-slate-900 border ${tabs[activeTab].border} rounded-[2rem] p-8 h-[450px] shadow-2xl relative overflow-hidden transition-colors duration-500`}>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-6 ${tabs[activeTab].color}`}>
                  {tabs[activeTab].title} Simulator
                </h3>
                <div className="flex-1">
                  {renderContent()}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="z-10 text-center max-w-4xl mx-auto mt-12">
        <Reveal>
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-700 rounded-full px-5 py-2 mb-8 shadow-xl">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">St. Paul's Mentorship Keynote</span>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none italic uppercase">
            Manager of<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              Intelligence
            </span>
          </h1>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed border-l-4 border-cyan-400 pl-6 text-left italic">
            "The world where you 'use' tools is ending. For the Class of 2026, you start as management."
          </p>
        </Reveal>
        <Reveal delay={600}>
          <div className="animate-bounce mt-12">
            <div className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent mx-auto"></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const FinalConclusion = () => {
  return (
    <section className="py-32 bg-black text-white text-center relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-black"></div>
       <div className="max-w-4xl mx-auto px-6 relative z-10">
         <Reveal>
           <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
             Intern to<br/>
             <span className="text-cyan-400">Manager</span>
           </h2>
         </Reveal>
         <Reveal delay={200}>
           <p className="text-xl text-slate-400 font-light mb-12 max-w-2xl mx-auto">
             Don't just use AI. Lead it.
           </p>
         </Reveal>
       </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="bg-black font-sans text-slate-50 selection:bg-cyan-500/30 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash { to { stroke-dashoffset: -20; } }
        .animate-dash { animation: dash 1s linear infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-reverse-slow { animation: spin 15s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type=range]::-webkit-slider-runnable-track { background: #1e293b; height: 12px; border-radius: 6px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 28px; width: 28px; border-radius: 50%; background: #22d3ee; cursor: pointer; margin-top: -8px; box-shadow: 0 0 10px rgba(34,211,238,0.5); border: 2px solid white; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <HeroSection />
      <ParadigmShift />
      <SyntaxVsImagination />
      <CompetenciesSection />
      <FinalConclusion />
    </div>
  );
}


