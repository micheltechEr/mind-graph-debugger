const Header = () => {
  return (
    <header className="w-full bg-[#0f172a] border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm" />
        </div>
        <h1 className="text-white font-semibold text-lg">
          <span className="text-blue-400">MindGraph</span>
          <span className="text-slate-400 font-normal"> - AI Cognitive</span>
        </h1>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-xl mx-10">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 
                     px-4 py-2 rounded-md border border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-slate-300 text-sm">Live Stream</span>
        <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
          <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" />
        </div>
      </div>

    </header>
  )
}

export default Header