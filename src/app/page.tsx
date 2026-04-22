"use client";
import React, { useState } from 'react';
import { Settings, Cpu, Database, Save, Play, Zap, Download } from 'lucide-react';

export default function AIApp() {
  const [config, setConfig] = useState({ zones: 1, robots: 1, cylinders: 4, sensors: 8 });
  const [terminal, setTerminal] = useState<string[]>(["[SYSTEM]: Autonomous Engine Online", "[READY]: Awaiting Gajanan's input..."]);

  const generateProgram = () => {
    // LOGIC GENERATOR ENGINE
    let ldrCode = `// --- TKM AUTO-GEN LOGIC v2050 ---\n`;
    ldrCode += `// CONFIG: ${config.zones} ZONES | ${config.robots} ROBOTS | ${config.cylinders} CYLS\n\n`;

    for (let z = 1; z <= config.zones; z++) {
      ldrCode += `// ZONE ${z} START\nSTR T0\nOUT M${z}00 // Zone Ready\n\n`;
      for (let r = 1; r <= config.robots; r++) {
        ldrCode += `// ROBOT ${r} START\nSTR M${z}00\nAND X${z}${r}0\nOUT Y${z}${r}0\n\n`;
      }
    }

    setTerminal(prev => [...prev, `> Build Complete for ${config.zones} Zone(s).`, "> Generating .LDR file..."]);

    // AUTO-DOWNLOAD FEATURE
    const element = document.createElement("a");
    const file = new Blob([ldrCode], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "TKM_Generated_Logic.ldr";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <header className="flex justify-between items-center border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <Zap className="text-blue-500 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">TKM AI ENGINEER <span className="text-blue-500 text-xs">v2050</span></h1>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        <div className="col-span-4 space-y-6">
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
            <h2 className="flex items-center gap-2 mb-6 text-blue-400 font-semibold uppercase text-sm tracking-widest"><Settings size={18}/> Parameters</h2>
            <div className="space-y-5">
              {Object.keys(config).map((key) => (
                <div key={key}>
                  <label className="block text-xs uppercase text-slate-500 mb-2 font-bold">{key}</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:ring-2 ring-blue-500 transition-all cursor-pointer"
                    onChange={(e) => setConfig({...config, [key as keyof typeof config]: Number(e.target.value)})}
                  >
                    {[1, 2, 4, 8, 12, 16].map(n => <option key={n} value={n}>{n} Units</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={generateProgram} className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
              <Play size={20} fill="currentColor"/> BUILD & DOWNLOAD
            </button>
          </section>
        </div>

        <div className="col-span-8 space-y-6">
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-[350px] flex flex-col shadow-2xl">
            <h2 className="flex items-center gap-2 mb-4 text-purple-400 font-semibold uppercase text-sm tracking-widest"><Cpu size={18}/> Autonomous Terminal</h2>
            <div className="flex-1 bg-black rounded-xl p-5 font-mono text-sm text-green-400 overflow-y-auto border border-white/5">
              {terminal.map((line, i) => <p key={i} className="mb-1">{line}</p>)}
              <p className="animate-pulse">_</p>
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
            <h2 className="flex items-center gap-2 mb-4 text-yellow-400 font-semibold uppercase text-sm tracking-widest"><Database size={18}/> Self-Learning Base</h2>
            <textarea 
              placeholder="Paste custom Ladder Logic here to teach the AI your personal style..."
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm min-h-[120px] outline-none focus:border-yellow-500 transition-colors"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
