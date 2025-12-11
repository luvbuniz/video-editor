import React, { useState } from 'react';
import { Film, Music, Type, Smile, Sparkles, Upload, Video, ChevronDown, Search, Play, Pause, Menu, Scissors, Share2, Download, Wand2 } from 'lucide-react';

export default function CapCutClone() {
  const [isPlaying, setIsPlaying] = useState(false);

  const tools = [
    { icon: Film, label: 'Media', active: true },
    { icon: Music, label: 'Audio' },
    { icon: Type, label: 'Text' },
    { icon: Smile, label: 'Stickers' },
    { icon: Sparkles, label: 'Effects' },
  ];

  const mediaItems = [
    { name: 'isthatcoda.mp4', duration: '00:08' },
    { name: 'CHARMarrived.mp4', duration: '00:07' },
    { name: 'CODAreset.png', duration: null },
    { name: 'eliasroom.mp4', duration: '00:04' },
    { name: 'miraname.png', duration: null },
    { name: 'mirawhy1.mp4', duration: '00:07' },
  ];

  const clips = [
    'scene5dragged.mp4',
    'scene4chloroform.mp4', 
    'scene3struggle.mp4',
    'scene2eliasturns.mp4',
    'scene1Eliasathome.mp4',
  ];

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white flex flex-col overflow-hidden text-xs">
      
      <header className="h-10 bg-[#141414] flex items-center justify-between px-3 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center">
            <Scissors className="w-4 h-4" />
          </div>
          <span className="font-semibold">CapCut</span>
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#2a2a2a] rounded text-gray-300">
            <Menu className="w-4 h-4" />
            <span>Menu</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <span className="text-gray-500">1206</span>
        <div className="flex items-center gap-2">
          <div className="bg-purple-900/40 text-purple-400 px-2 py-1 rounded flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Pro</span>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#1e1e1e] rounded">
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#00d4aa] text-black rounded font-medium">
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        <div className="w-14 bg-[#141414] flex flex-col items-center py-2 border-r border-[#2a2a2a]">
          {tools.map((tool, idx) => (
            <button key={idx} className={`w-12 h-12 flex flex-col items-center justify-center gap-1 rounded hover:bg-[#2a2a2a] ${tool.active ? 'text-[#00d4aa]' : 'text-gray-500'}`}>
              <tool.icon className="w-4 h-4" />
              <span className="text-[9px]">{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="w-24 bg-[#141414] border-r border-[#2a2a2a] p-2">
          {['Import', 'Media', 'Subprojects', 'Yours', 'AI media'].map((item) => (
            <div key={item} className={`py-1.5 px-2 rounded cursor-pointer hover:bg-[#1e1e1e] ${item === 'Import' ? 'text-[#00d4aa]' : 'text-gray-400'}`}>
              {item}
            </div>
          ))}
        </div>

        <div className="w-56 bg-[#141414] border-r border-[#2a2a2a] flex flex-col">
          <div className="p-2 flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#00d4aa] text-black rounded font-medium">
              <Upload className="w-3 h-3" />
              <span>Import</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#1e1e1e] rounded">
              <Video className="w-3 h-3" />
              <span>Record</span>
            </button>
          </div>
          <div className="px-2 pb-2">
            <div className="flex items-center bg-[#1e1e1e] rounded px-2 py-1.5">
              <Search className="w-3 h-3 text-gray-500" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-gray-400 ml-2 w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            <div className="grid grid-cols-3 gap-1">
              {mediaItems.map((item, idx) => (
                <div key={idx} className="cursor-pointer">
                  <div className="relative aspect-video bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] rounded border border-transparent hover:border-[#00d4aa]">
                    {item.duration && (
                      <div className="absolute top-1 right-1 bg-black/70 text-[8px] px-1 rounded">{item.duration}</div>
                    )}
                  </div>
                  <p className="text-[8px] text-gray-500 mt-1 truncate">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 border-t border-[#2a2a2a]">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#1e1e1e] rounded">
              <Sparkles className="w-3 h-3 text-[#00d4aa]" />
              <span>AI clipper</span>
              <span className="text-[8px] bg-green-900/50 text-green-400 px-1 rounded">Free</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-8 flex items-center px-3 border-b border-[#2a2a2a]">
            <span className="text-gray-400">Player</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] p-4">
            <div className="w-full max-w-lg aspect-video bg-[#141414] rounded-lg flex items-center justify-center">
              <Film className="w-16 h-16 text-gray-700" />
            </div>
          </div>
          <div className="h-10 flex items-center justify-center gap-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-[#00d4aa]">00:00:00:00</span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">00:00:42:14</span>
            </div>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 flex items-center justify-center bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-full">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="w-48 bg-[#141414] border-l border-[#2a2a2a] p-3">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="font-medium">Smart suggestions</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-3">Find out how your video can be improved</p>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#00d4aa]/10 text-[#00d4aa] rounded">
            <Sparkles className="w-3 h-3" />
            <span>Analyze</span>
          </button>
        </div>
      </div>

      <div className="h-40 bg-[#141414] border-t border-[#2a2a2a] flex flex-col">
        <div className="h-6 flex items-center px-3 border-b border-[#2a2a2a] text-[10px] text-gray-600">
          {['00:00', '00:10', '00:20', '00:30', '00:40', '00:50'].map((t, i) => (
            <div key={i} className="flex-1">{t}</div>
          ))}
        </div>
        <div className="flex-1 p-2 overflow-x-auto">
          <div className="flex gap-1 h-14 mb-2">
            {clips.map((clip, idx) => (
              <div key={idx} className="h-full w-28 rounded border border-[#00d4aa]/30 bg-gradient-to-b from-[#1a3a4a] to-[#0a2a3a] flex-shrink-0 p-1">
                <span className="text-[8px] text-gray-400 truncate block">{clip}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-1 h-6">
            {clips.map((_, idx) => (
              <div key={idx} className="h-full w-28 rounded bg-[#0a1a2a] flex items-center justify-center gap-px flex-shrink-0">
                {[...Array(20)].map((__, i) => (
                  <div key={i} className="w-0.5 bg-[#00d4aa]/50 rounded-full" style={{ height: `${Math.random() * 60 + 30}%` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}