const NavigateSections = ()=>{
  return(
          <div className="w-full border-b border-[#72a1cf] bg-[#292f3b]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

          <button className="text-white font-semibold border-b-2 border-[#72a1cf] pb-2">
            Live Debugger
          </button>

          <button className="text-gray-400 hover:text-white transition">
            Live Stream
          </button>

          <button className="text-gray-400 hover:text-white transition">
            Tokens/Second
          </button>

          <button className="text-gray-400 hover:text-white transition">
            Total Latency
          </button>
        </div>
      </div>
  )
}

export default NavigateSections