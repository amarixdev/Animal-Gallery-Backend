import { useParams, Link } from 'react-router-dom';

function ColorPage() {
  const { colorName } = useParams<{ colorName: string }>();

  // Color mapping for dynamic theming
  const colorMap: { [key: string]: { primary: string; subtle: string } } = {
    red: { primary: '#ef4444', subtle: '#3f1212' },
    orange: { primary: '#f97316', subtle: '#4d2a0b' },
    yellow: { primary: '#facc15', subtle: '#4a3f0c' },
    green: { primary: '#22c55e', subtle: '#103b21' },
    blue: { primary: '#3b82f6', subtle: '#152a4c' },
    indigo: { primary: '#6366f1', subtle: '#22234e' },
    violet: { primary: '#8b5cf6', subtle: '#2e1e4e' },
    white: { primary: '#ffffff', subtle: '#333333' }
  };

  const defaultColor = { primary: '#8b5cf6', subtle: '#2e1e4e' };
  const currentColor = colorMap[colorName?.toLowerCase() || ''] || defaultColor;

  return (
    <div 
      className="min-h-screen flex flex-col p-8 transition-[background] duration-1000 ease-in-out relative"
      style={{
        background: `linear-gradient(to bottom right, ${currentColor.subtle}, #000, ${currentColor.subtle})`
      }}
    >
      {/* View All Button - Top Left */}
      <Link 
        to="/"
        className="absolute top-8 left-8 px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                   hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                   text-lg font-medium tracking-wide shadow-lg shadow-black/20"
      >
        ← Back Home
      </Link>

      {/* Header Section */}
      <div className="flex flex-col items-center space-y-8 mb-16 mt-8">
        {/* Title */}
        <h1 className="text-6xl font-bold text-white uppercase tracking-widest
                       bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                       md:text-5xl sm:text-4xl">
          {colorName} Animals
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="relative">
            <input 
              type="text"
              placeholder={`Search ${colorName} animals...`}
              className="w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                         border-2 border-slate-700/80 rounded-full
                         focus:outline-none focus:ring-2 focus:border-2
                         transition-all duration-300 ease-in-out text-lg tracking-wide
                         shadow-lg shadow-black/20"
              style={{
                '--tw-ring-color': `${currentColor.primary}80`,
                borderColor: `${currentColor.primary}80`
              } as React.CSSProperties}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-400">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        {/* Add New Animal Button */}
        <button 
          className="px-8 py-4 text-xl font-bold text-white rounded-full border-2
                     transition-all duration-300 ease-out
                     hover:scale-105 hover:shadow-lg uppercase tracking-wider"
          style={{
            backgroundColor: `${currentColor.primary}20`,
            borderColor: currentColor.primary,
            color: currentColor.primary
          }}
        >
          + Add a New Animal
        </button>

        {/* Animals Grid */}
        <div className="flex gap-8 flex-wrap justify-center items-center">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-32 h-32 rounded-full border-4 cursor-pointer
                         transition-all duration-300 ease-out
                         hover:scale-110 hover:shadow-lg"
              style={{
                backgroundColor: `${currentColor.primary}20`,
                borderColor: `${currentColor.primary}60`,
                boxShadow: `0 0 20px ${currentColor.primary}30`
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold opacity-60" style={{ color: currentColor.primary }}>
                  {index}
                </span>
              </div>
            </div>
          ))}

          {/* View More Arrow */}
          <div className="relative group">
            <button 
              className="w-32 h-32 rounded-full border-4 cursor-pointer
                         transition-all duration-300 ease-out
                         hover:scale-110 hover:shadow-lg
                         flex items-center justify-center"
              style={{
                backgroundColor: `${currentColor.primary}10`,
                borderColor: `${currentColor.primary}60`,
                boxShadow: `0 0 20px ${currentColor.primary}30`
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-8 h-8 transition-all duration-300"
                style={{ color: currentColor.primary }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Hover Text */}
            <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           bg-slate-800/90 text-white px-3 py-1 rounded-full text-sm font-medium
                           pointer-events-none whitespace-nowrap">
              View All
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorPage; 