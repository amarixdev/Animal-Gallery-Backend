import { Link, useNavigate } from 'react-router-dom';

function AllAnimalsPage() {
  // Generate placeholder animals for demonstration
  const placeholderAnimals = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    name: `Animal ${index + 1}`,
    color: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'][index % 8]
  }));
  const navigate = useNavigate();

  // Color mapping for the circles
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

  return (
    <div className="min-h-screen flex flex-col p-8 bg-gradient-to-br from-slate-900 via-black to-slate-900">
      {/* Back Button - Top Left */}
      <div className="relative mb-10 flex justify-between w-full">
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                     hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                     text-lg font-medium tracking-wide shadow-lg shadow-black/20"
        >
          ← Back
        </button>
        <Link 
          to="/"
          className="px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                     hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                     text-lg font-medium tracking-wide shadow-lg shadow-black/20"
        >
          🏠 Home
        </Link>
        <div 
          className="opacity-0 px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                     hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                     text-lg font-medium tracking-wide shadow-lg shadow-black/20"
        >
          🏠 Home
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center space-y-8 mb-16 mt-8">
        <h1 className="text-6xl font-bold text-white uppercase tracking-widest
                       bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                       md:text-5xl sm:text-4xl">
          All Animals
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search all animals..."
              className="w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                         border-2 border-slate-700/80 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:border-purple-500/80
                         transition-all duration-300 ease-in-out text-lg tracking-wide
                         shadow-lg shadow-black/20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-400">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 max-w-7xl mx-auto">
          {placeholderAnimals.map((animal) => {
            const animalColor = colorMap[animal.color];
            return (
              <div
                key={animal.id}
                className="flex flex-col items-center space-y-2 group"
              >
                {/* Animal Circle */}
                <Link
                  to={`/${animal.color}/${animal.id}`}
                  className="w-24 h-24 rounded-full border-4 cursor-pointer
                             transition-all duration-300 ease-out
                             hover:scale-110 hover:shadow-lg
                             flex items-center justify-center"
                  style={{
                    backgroundColor: `${animalColor.primary}20`,
                    borderColor: `${animalColor.primary}60`,
                    boxShadow: `0 0 20px ${animalColor.primary}30`
                  }}
                >
                  <span 
                    className="text-sm font-bold opacity-60"
                    style={{ color: animalColor.primary }}
                  >
                    {animal.id}
                  </span>
                </Link>
                
                {/* Animal Name */}
                <span className="text-white text-sm font-medium opacity-80 text-center group-hover:opacity-100 transition-opacity duration-300">
                  {animal.name}
                </span>
                
                {/* Color Tag */}
                <span 
                  className="text-xs font-medium px-2 py-1 rounded-full capitalize opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    backgroundColor: `${animalColor.primary}20`,
                    color: animalColor.primary 
                  }}
                >
                  {animal.color}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default AllAnimalsPage; 