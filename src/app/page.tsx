"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Cpu, Database, Save, Play, UserCheck, Zap } from 'lucide-react';

export default function AIApp() {
  const [config, setConfig] = useState({ zones: 1, robots: 1, cylinders: 4, sensors: 8 });
  const [memory, setMemory] = useState<string[]>(["Standard: TKM Zone Initializer Loaded"]);
  const [isLearning, setIsLearning] = useState(false);

  const generateProgram = () => {
    const code = `// AI GENERATED: TKM STANDARD v2050\n// ZONES: ${config.zones} | ROBOTS: ${config.robots}\n\nNETWORK 1: SAFETY_MASTER\nSTR X0\nOUT Y0 // Safety OK\n` + 
    Array.from({length: config.cylinders}).map((_, i) => `\nNETWORK ${i+2}: CYL_${i+1}\nSTR M${100+i}\nOUT Y${200+i}`).join("");
    alert("PLC Program Built Successfully with Company Standards!");
    console.log(code);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <Zap className="text-blue-500 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tighter">TKM AI ENGINEER <span className="text-blue-500 text-xs">v2050</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 px-4 py-2 rounded-lg text-sm border border-slate-800">Status: <span className="text-green-500 font-mono">Autonomous</span></div>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        {/* Left Panel: Configuration */}
        <div className="col-span-4 space-y-6">
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="flex items-center gap-2 mb-6 text-blue-400 font-semibold"><Settings size={18}/> System Parameters</h2>
            
            <div className="space-y-4">
              {['zones', 'robots', 'cylinders', 'sensors'].map((key) => (
                <div key={key}>
                  <label className="block text-xs uppercase text-slate-500 mb-2">{key}</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none"
                    onChange={(e) => setConfig({...config, [key]: Number(e.target.value)})}
                  >
                    {[1, 2, 4, 8, 12, 16, 32].map(n => <option key={n} value={n}>{n} Units</option>)}
                  </select>
                </div>
              ))}
            </div>
            
            <button 
              onClick={generateProgram}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Play size={18}/> BUILD PROGRAM
            </button>
          </section>
        </div>

        {/* Right Panel: AI Brain & Memory */}
        <div className="col-span-8 space-y-6">
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-[300px] flex flex-col">
            <h2 className="flex items-center gap-2 mb-4 text-purple-400 font-semibold"><Cpu size={18}/> Autonomous Terminal</h2>
            <div className="flex-1 bg-black rounded-xl p-4 font-mono text-sm text-green-400 overflow-y-auto">
              <p>{`> Initializing Neural Network...`}</p>
              <p className="text-slate-500">{`> Monitoring TKM Standard 2026-04 Rev.2`}</p>
              <p>{`> Human Gajanan detected. Awaiting logic constraints...`}</p>
              {isLearning && <p className="animate-pulse text-purple-400">{`> LEARNING NEW STANDARD: Analyzing Manual Input...`}</p>}
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="flex items-center gap-2 mb-4 text-yellow-400 font-semibold"><Database size={18}/> Persistent Memory</h2>
            <div className="space-y-2">
              <textarea 
                placeholder="Paste new Company Standard or instruction here to teach the AI..."
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm min-h-[100px] outline-none focus:border-yellow-500"
                onFocus={() => setIsLearning(true)}
                onBlur={() => setIsLearning(false)}
              />
              <button className="flex items-center gap-2 text-xs bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">
                <Save size={14}/> UPDATE KNOWLEDGE BASE
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
