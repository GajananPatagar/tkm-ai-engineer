"use client";
import React, { useState } from 'react';
import { Settings, Zap, ListChecks, ArrowRightCircle } from 'lucide-react';

export default function AIApp() {
  const [config, setConfig] = useState({ zones: 1, robots: 1, cylinders: 4 });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <header className="border-b border-slate-800 pb-4 mb-8 flex justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="text-blue-500" /> TKM LOGIC GUIDE <span className="text-xs opacity-50">2050</span>
        </h1>
      </header>

      <main className="grid grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-blue-400 font-bold mb-6 flex gap-2 items-center"><Settings size={18}/> SETUP MACHINE</h2>
          <div className="space-y-6">
            {['zones', 'robots', 'cylinders'].map((key) => (
              <div key={key}>
                <label className="text-[10px] uppercase text-slate-500 font-black mb-2 block">{key}</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-blue-400 font-mono"
                  onChange={(e) => setConfig({...config, [key]: Number(e.target.value)})}
                >
                  {[1, 2, 4, 8, 16].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* The Instructions (What to Draw in PCwin) */}
        <div className="col-span-8 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-green-400 font-bold mb-4 flex gap-2 items-center"><ListChecks size={18}/> PCWIN DRAWING GUIDE</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 font-mono text-sm">
            <div className="p-4 bg-black rounded-xl border-l-4 border-blue-500">
              <p className="text-blue-400 font-bold">RUNG 1: MASTER SAFETY</p>
              <p className="mt-2">Place --[ X000 ]--[ X001 ]--------------( M100 )</p>
              <p className="text-slate-500 text-xs mt-1">(EMG Stop + Guard Interlock = Zone 1 Ready)</p>
            </div>

            {Array.from({length: config.robots}).map((_, i) => (
              <div key={i} className="p-4 bg-black rounded-xl border-l-4 border-purple-500">
                <p className="text-purple-400 font-bold">RUNG {i+2}: ROBOT {i+1} CYCLE</p>
                <p className="mt-2">Place --[ M100 ]--[ X{i+1}10 ]--------------( Y{i+1}10 )</p>
                <p className="text-slate-500 text-xs mt-1">(Zone Ready + Robot Home = Cycle Start)</p>
              </div>
            ))}

            {Array.from({length: config.cylinders}).map((_, i) => (
              <div key={i} className="p-4 bg-black rounded-xl border-l-4 border-yellow-500">
                <p className="text-yellow-400 font-bold">RUNG {i+config.robots+2}: CYLINDER {i+1} ADVANCE</p>
                <p className="mt-2">Place --[ M100 ]--[ X{i+1}A ]--[/ X{i+1}B ]---( Y{i+1}A )</p>
                <p className="text-slate-500 text-xs mt-1">(Master + Adv PB + NOT Ret PB = Solenoid)</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
