import React, { useState, useRef } from 'react';
import { Film, Music, Type, Smile, Sparkles, Upload, Video, ChevronDown, ChevronRight, Search, Play, Pause, Menu, Scissors, Share2, Download, Wand2 } from 'lucide-react';

export default function CapCutClone() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState('Media');
  const [expandedSections, setExpandedSections] = useState({ Import: true, Media: false, Subprojects: false, Yours: false, 'AI media': false });
  const [activeRightTab, setActiveRightTab] = useState('Project');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedClip, setSelectedClip] = useState(null);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const [globalEdits, setGlobalEdits] = useState({ autoCaption: false, enhance: true, normalize: false });
  const timelineRef = useRef(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);

  const tools = [
    { icon: Film, label: 'Media' },
    { icon: Music, label: 'Audio' },
    { icon: Type, label: 'Text' },
    { icon: Smile, label: 'Stickers' },
    { icon: Sparkles, label: 'Effects' },
  ];

  const mediaItems = [
    { id: 1, name: 'isthatcoda.mp4', duration: '00:08' },
    { id: 2, name: 'CHARMarrived.mp4', duration: '00:07' },
    { id: 3, name: 'CODAreset.png', duration: null },
    { id: 4, name: 'eliasroom.mp4', duration: '00:04' },
    { id: 5, name: 'miraname.png', duration: null },
    { id: 6, name: 'mirawhy1.mp4', duration: '00:07' },
  ];

  const clips = [
    { id: 1, name: 'scene5dragged.mp4' },
    { id: 2, name: 'scene4chloroform.mp4' },
    { id: 3, name: 'scene3struggle.mp4' },
    { id: 4, name: 'scene2eliasturns.mp4' },
    { id: 5, name: 'scene1Eliasathome.mp4' },
  ];

  const sidebarSections = ['Import', 'Media', 'Subprojects', 'Yours', 'AI media'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTimelineClick = (e) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPlayheadPosition(percentage);
    }
  };

  const handlePlayheadDrag = (e) => {
    if (isDraggingPlayhead && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPlayheadPosition(percentage);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingPlayhead(false);
  };

  // Toggle component with animation
  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
        enabled ? 'bg-[#00d4aa]' : 'bg-[#3a3a3a]'
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
          enabled ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <div
      className="h-screen w-full bg-[#0a0a0a] text-white flex flex-col overflow-hidden text-xs"
      onMouseMove={handlePlayheadDrag}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
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
        {/* Left toolbar - Tool selection */}
        <div className="w-14 bg-[#141414] flex flex-col items-center py-2 border-r border-[#2a2a2a]">
          {tools.map((tool, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTool(tool.label)}
              className={`w-12 h-12 flex flex-col items-center justify-center gap-1 rounded transition-all duration-150 ${
                activeTool === tool.label
                  ? 'text-[#00d4aa] bg-[#00d4aa]/10'
                  : 'text-gray-500 hover:bg-[#2a2a2a] hover:text-gray-300'
              }`}
            >
              <tool.icon className="w-4 h-4" />
              <span className="text-[9px]">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Sidebar sections - Expand/Collapse */}
        <div className="w-28 bg-[#141414] border-r border-[#2a2a2a] p-2">
          {sidebarSections.map((item) => (
            <div key={item}>
              <button
                onClick={() => toggleSection(item)}
                className={`w-full py-1.5 px-2 rounded cursor-pointer flex items-center justify-between transition-colors duration-150 ${
                  expandedSections[item]
                    ? 'text-[#00d4aa] bg-[#00d4aa]/10'
                    : 'text-gray-400 hover:bg-[#1e1e1e]'
                }`}
              >
                <span>{item}</span>
                {expandedSections[item] ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
              {/* Expanded content */}
              <div className={`overflow-hidden transition-all duration-200 ${
                expandedSections[item] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-4 py-1 text-[10px] text-gray-500">
                  {item === 'Import' && <div className="py-0.5">Drag files here</div>}
                  {item === 'Media' && <div className="py-0.5">6 items</div>}
                  {item === 'Subprojects' && <div className="py-0.5">No subprojects</div>}
                  {item === 'Yours' && <div className="py-0.5">Your uploads</div>}
                  {item === 'AI media' && <div className="py-0.5">AI generated</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media panel - Selection */}
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
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedMedia(selectedMedia === item.id ? null : item.id)}
                >
                  <div className={`relative aspect-video bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] rounded border-2 transition-all duration-150 ${
                    selectedMedia === item.id
                      ? 'border-[#00d4aa] shadow-[0_0_10px_rgba(0,212,170,0.3)]'
                      : 'border-transparent hover:border-[#00d4aa]/50'
                  }`}>
                    {item.duration && (
                      <div className="absolute top-1 right-1 bg-black/70 text-[8px] px-1 rounded">{item.duration}</div>
                    )}
                    {selectedMedia === item.id && (
                      <div className="absolute inset-0 bg-[#00d4aa]/10 rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-[#00d4aa] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-black rounded-sm" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className={`text-[8px] mt-1 truncate transition-colors ${
                    selectedMedia === item.id ? 'text-[#00d4aa]' : 'text-gray-500'
                  }`}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 border-t border-[#2a2a2a]">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#1e1e1e] rounded hover:bg-[#2a2a2a] transition-colors">
              <Sparkles className="w-3 h-3 text-[#00d4aa]" />
              <span>AI clipper</span>
              <span className="text-[8px] bg-green-900/50 text-green-400 px-1 rounded">Free</span>
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 flex flex-col">
          <div className="h-8 flex items-center px-3 border-b border-[#2a2a2a]">
            <span className="text-gray-400">Player</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] p-4">
            <div className="w-full max-w-lg aspect-video bg-[#141414] rounded-lg flex items-center justify-center">
              {selectedMedia ? (
                <div className="text-center">
                  <Film className="w-12 h-12 text-[#00d4aa] mx-auto mb-2" />
                  <p className="text-gray-400 text-[10px]">{mediaItems.find(m => m.id === selectedMedia)?.name}</p>
                </div>
              ) : (
                <Film className="w-16 h-16 text-gray-700" />
              )}
            </div>
          </div>
          <div className="h-10 flex items-center justify-center gap-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-[#00d4aa]">00:00:{String(Math.floor(playheadPosition / 2.4)).padStart(2, '0')}:00</span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">00:00:42:14</span>
            </div>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 flex items-center justify-center bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-full transition-colors">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right panel - Tab switching */}
        <div className="w-52 bg-[#141414] border-l border-[#2a2a2a] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-[#2a2a2a]">
            {['Project', 'Details'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveRightTab(tab)}
                className={`flex-1 py-2 text-center transition-all duration-150 ${
                  activeRightTab === tab
                    ? 'text-[#00d4aa] border-b-2 border-[#00d4aa] bg-[#00d4aa]/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 p-3 overflow-y-auto">
            {activeRightTab === 'Project' ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">Smart suggestions</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-3">Find out how your video can be improved</p>
                <button className="flex items-center gap-2 px-3 py-2 bg-[#00d4aa]/10 text-[#00d4aa] rounded hover:bg-[#00d4aa]/20 transition-colors">
                  <Sparkles className="w-3 h-3" />
                  <span>Analyze</span>
                </button>

                {/* Global edits toggles */}
                <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                  <h3 className="text-gray-400 mb-3 font-medium">Global edits</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-[10px]">Auto caption</span>
                      <Toggle
                        enabled={globalEdits.autoCaption}
                        onToggle={() => setGlobalEdits(prev => ({ ...prev, autoCaption: !prev.autoCaption }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-[10px]">Enhance video</span>
                      <Toggle
                        enabled={globalEdits.enhance}
                        onToggle={() => setGlobalEdits(prev => ({ ...prev, enhance: !prev.enhance }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-[10px]">Normalize audio</span>
                      <Toggle
                        enabled={globalEdits.normalize}
                        onToggle={() => setGlobalEdits(prev => ({ ...prev, normalize: !prev.normalize }))}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-medium mb-3">Clip Details</h3>
                {selectedClip ? (
                  <div className="space-y-2">
                    <div className="bg-[#1e1e1e] p-2 rounded">
                      <p className="text-[10px] text-gray-500">Name</p>
                      <p className="text-gray-300">{clips.find(c => c.id === selectedClip)?.name}</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-2 rounded">
                      <p className="text-[10px] text-gray-500">Duration</p>
                      <p className="text-gray-300">00:08:14</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-2 rounded">
                      <p className="text-[10px] text-gray-500">Resolution</p>
                      <p className="text-gray-300">1920 x 1080</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-[10px]">Select a clip in the timeline to see details</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="h-44 bg-[#141414] border-t border-[#2a2a2a] flex flex-col">
        {/* Timeline header with ruler */}
        <div
          ref={timelineRef}
          className="h-6 flex items-center px-3 border-b border-[#2a2a2a] text-[10px] text-gray-600 relative cursor-pointer"
          onClick={handleTimelineClick}
        >
          {['00:00', '00:10', '00:20', '00:30', '00:40', '00:50'].map((t, i) => (
            <div key={i} className="flex-1">{t}</div>
          ))}
          {/* Playhead indicator on ruler */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#00d4aa] z-20"
            style={{ left: `${playheadPosition}%` }}
          >
            <div
              className="absolute -top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00d4aa] cursor-grab active:cursor-grabbing"
              style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDraggingPlayhead(true);
              }}
            />
          </div>
        </div>

        {/* Timeline tracks */}
        <div className="flex-1 p-2 overflow-x-auto relative">
          {/* Playhead line through tracks */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#00d4aa] z-10 pointer-events-none"
            style={{ left: `calc(${playheadPosition}% + 8px)` }}
          />

          {/* Video track */}
          <div className="flex gap-1 h-14 mb-2">
            {clips.map((clip) => (
              <div
                key={clip.id}
                onClick={() => setSelectedClip(selectedClip === clip.id ? null : clip.id)}
                className={`h-full w-28 rounded border-2 bg-gradient-to-b from-[#1a3a4a] to-[#0a2a3a] flex-shrink-0 p-1 cursor-pointer transition-all duration-150 ${
                  selectedClip === clip.id
                    ? 'border-[#00d4aa] shadow-[0_0_10px_rgba(0,212,170,0.4)]'
                    : 'border-[#00d4aa]/30 hover:border-[#00d4aa]/60'
                }`}
              >
                <span className={`text-[8px] truncate block ${
                  selectedClip === clip.id ? 'text-[#00d4aa]' : 'text-gray-400'
                }`}>{clip.name}</span>
              </div>
            ))}
          </div>

          {/* Audio waveform track */}
          <div className="flex gap-1 h-6">
            {clips.map((clip) => (
              <div
                key={clip.id}
                onClick={() => setSelectedClip(selectedClip === clip.id ? null : clip.id)}
                className={`h-full w-28 rounded bg-[#0a1a2a] flex items-center justify-center gap-px flex-shrink-0 cursor-pointer border transition-all duration-150 ${
                  selectedClip === clip.id
                    ? 'border-[#00d4aa]/60'
                    : 'border-transparent'
                }`}
              >
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
