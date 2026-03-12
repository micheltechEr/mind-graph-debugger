import { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import NavigateSections from "../../components/NavigateSections";
import { type AgentConfiguration, type AIModelType } from "../../types/agent";
import ModelSettingsPanel from "./components/ModelSettingsPanel";
import ToolToggleList from "./components/ToolToggleList";
import PromptEditor from "./components/PromptEditor";

// Initial mock state
const initialDraft: AgentConfiguration = {
  id: "draft_123",
  name: "SDR-Lead-Gen",
  systemPrompt: "You are an aggressive but polite Sales Development Representative...",
  model: "gemini-3-flash",
  temperature: 0.7,
  tools: [
    { id: "evo_api", name: "Evolution API (WhatsApp)", enabled: true },
    { id: "web_search", name: "Google Web Search", enabled: false }
  ]
};

const AgentStudioLayout = () => {
  const [draft, setDraft] = useState<AgentConfiguration>(initialDraft);
  const [isSaving, setIsSaving] = useState(false);

  // 1. THE AUTO-SAVE MEMORY LEAK TRAP
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      console.log("Auto-saving draft to backend...", draft);
      setIsSaving(true);
      
      // Mock API call
      setTimeout(() => setIsSaving(false), 500);
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [draft]); 

  // 2. State Handlers
  const handlePromptChange = useCallback((newPrompt: string) => {
    setDraft(prev => ({ ...prev, systemPrompt: newPrompt }));
  }, []);

  const handleToolToggle = useCallback((toolId: string) => {
    setDraft(prev => ({
      ...prev,
      tools: prev.tools.map(t => 
        t.id === toolId ? { ...t, enabled: !t.enabled } : t
      )
    }));
  }, []);

  // 3. Model & Temperature Handlers
  const handleModelChange = useCallback((newModel: AIModelType) => {
    setDraft(prev => ({ ...prev, model: newModel }));
  }, []);

  const handleTempChange = useCallback((newTemp: number) => {
    setDraft(prev => ({ ...prev, temperature: newTemp }));
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-[#0f172a] overflow-x-hidden">
      <Header />
      <NavigateSections />

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Agent Studio</h1>
            <p className="text-sm text-gray-400">Configure your agent's reasoning and tools.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              {isSaving ? "Saving..." : "Draft Saved"}
            </span>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-semibold transition-colors">
              Publish Agent
            </button>
          </div>
        </div>

        {/* Two-Column Layout (FIXED) */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column: The Brain (Spans 8 cols) */}
          <div className="col-span-8 flex flex-col gap-6">
            <PromptEditor 
              value={draft.systemPrompt} 
              onChange={handlePromptChange} 
            />
          </div>

          {/* Right Column: Settings & Tools (Spans 4 cols) */}
          <div className="col-span-4 space-y-6">
            <ModelSettingsPanel 
              model={draft.model}
              temperature={draft.temperature}
              onModelChange={handleModelChange}
              onTempChange={handleTempChange}
            />
            <ToolToggleList 
              tools={draft.tools}
              onToggle={handleToolToggle}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentStudioLayout;