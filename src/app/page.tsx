"use client";
import React, { useState } from 'react';
import { Cpu, Zap, Activity, ShieldCheck } from 'lucide-react';

export default function AIApp() {
  const [config, setConfig] = useState({ zones: 1, robots: 1, cylinders: 4 });

  const executeAILogic = () => {
    // This is the AI "Thinking" process
    const ioMap = [
      ["Address", "Comment", "Logic_Type"],
      ["X000", "EMG_STOP", "Safety"],
      ["X001", "GUARD_INTK", "Safety"],
      ["M100", "ZONE_READY", "Master"]
    ];

    for (let i = 1; i <= config.cylinders; i++) {
      ioMap.push([`Y${i}A`, `CYL_${i}_ADV`, "Output"]);
      ioMap.push([`X${i}A`, `CYL_${i}_ADV_SNSR`, "Input"]);
    }

    // Convert to PCwin-friendly CSV format
    const csvContent = ioMap.map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "PCWIN_AI_IMPORT.csv";
    link.click();
    
    alert("AI Logic Built. Import this CSV into PCwin I/O Map to automate the setup.");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-4xl mx-auto border border-blue-900 rounded-3xl p-8 bg-slate-950 shadow-[0_0_50px_-12px_rgba(30,58,138,0.5)]">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Zap className="text-blue-500 fill-blue-500" /> TKM AI ENGINE
          </h1>
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-green-500">AI ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-8">
            {Object.keys(config).map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-bold tracking-widest">{key}</label>
                <input 
                  type="number" 
                  className="w-full bg-transparent border-b-2 border-slate-800 focus:border-blue-500 py-2 text-2xl outline-none transition-all"
                  value={config[key as keyof typeof config]}
                  onChange={(e) => setConfig({...config, [key]: Number(e.target.value)})}
                />
              </div>
            ))}
          </div>

          <div className="bg-blue-950/20 border border-blue-900/50 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-blue-400 text-xs font-bold mb-2 flex items-center gap-2"><Cpu size={14}/> SYSTEM PREDICTION</p>
              <p className="text-slate-400 text-sm italic">"I will generate ${config.cylinders * 2 + 3} PCwin addresses automatically based on TKM standards."</p>
            </div>
            <button 
              onClick={executeAILogic}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              RUN AI LOGIC ENGINE <ShieldCheck size={20}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
