import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Animal } from '../types/Animal';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';
import { staticAnimals } from '../data/static-animals';

function AllAnimalsPage() {
  const navigate = useNavigate();
  const [fetchedAnimals, setFetchedAnimals] = useState<Animal[]>([]);
  const [allAnimals, setAllAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Fetch animals from API on component mount
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/all`);
        if (response.ok) {
          const apiAnimals = await response.json();
          setFetchedAnimals(apiAnimals);
        }
      } catch (error) {
        console.error('Error fetching animals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // Combine static and fetched animals, avoiding duplicates
  useEffect(() => {
    const allAnimalsMap = new Map();
    
    // Add static animals first
    staticAnimals.forEach(animal => allAnimalsMap.set(animal.animalId, animal));
    
    // Add fetched animals (will overwrite if same ID, but that shouldn't happen)
    fetchedAnimals.forEach(animal => allAnimalsMap.set(animal.animalId, animal));
    
    const combined = Array.from(allAnimalsMap.values());
    
    // Sort by animal ID for consistent display
    combined.sort((a, b) => a.animalId - b.animalId);
    
    setAllAnimals(combined);
  }, [fetchedAnimals]);

  // Filter animals based on search term
  const filteredAnimals = allAnimals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group animals by color
  const animalsByColor = filteredAnimals.reduce((acc, animal) => {
    const color = animal.color.toLowerCase();
    if (!acc[color]) {
      acc[color] = [];
    }
    acc[color].push(animal);
    return acc;
  }, {} as Record<string, Animal[]>);

  // Define color order to match the original homepage
  const colorOrder = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];
  
  // Get colors that have animals, maintaining the order
  const availableColors = colorOrder.filter(color => animalsByColor[color] && animalsByColor[color].length > 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-gradient-to-br from-slate-900 via-black to-slate-900">
      {/* Back Button - Top Left */}
      <div className="relative mb-10 flex justify-between w-full">
        <button 
          onClick={() => navigate(-1)}
          className="cursor-pointer active:scale-95 px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
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
        <div className="w-full max-w-md relative">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search all animals..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                         border-2 border-slate-700/80 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:border-purple-500/80
                         transition-all duration-300 ease-in-out text-lg tracking-wide
                         shadow-lg shadow-black/20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 space-x-2">
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
              {!searchTerm && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-400">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm">
          {loading ? 'Loading animals...' : `Showing ${filteredAnimals.length} of ${allAnimals.length} animals`}
        </p>
      </div>

      {/* Animals by Color Columns */}
      <div className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></div>
          </div>
        ) : availableColors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-8 max-w-7xl mx-auto">
            {availableColors.map((color) => {
              const animals = animalsByColor[color] || [];
              const colorConfig = colorMap[color] || colorMap['indigo'] || { primary: '#6366f1', subtle: '#22234e' };
              
              return (
                <div key={color} className="flex flex-col items-center space-y-6">
                  {/* Color Header */}
                  <div className="text-center">
                    <h2 
                      className="text-2xl font-bold uppercase tracking-wider mb-2 capitalize"
                      style={{ color: colorConfig.primary }}
                    >
                      {color}
                    </h2>
                    <div 
                      className="w-16 h-1 rounded-full mx-auto"
                      style={{ backgroundColor: colorConfig.primary }}
                    />
                  </div>

                  {/* Animals in this color */}
                  <div className="flex flex-col items-center space-y-4">
                    {animals.map((animal) => (
                      <div
                        key={animal.animalId}
                        className="flex flex-col items-center space-y-2 group"
                      >
                        {/* Animal Circle with Image */}
                        <Link
                          to={`/${animal.color.toLowerCase()}/${animal.animalId}`}
                          className="w-20 h-20 rounded-full border-3 cursor-pointer
                                     transition-all duration-300 ease-out
                                     hover:scale-110 hover:shadow-lg
                                     flex items-center justify-center overflow-hidden"
                          style={{
                            backgroundColor: `${colorConfig.primary}15`,
                            borderColor: `${colorConfig.primary}60`,
                            boxShadow: `0 0 15px ${colorConfig.primary}20`
                          }}
                        >
                          {animal.imageUrl ? (
                            <img 
                              src={animal.animalId <= 24 ? `/images/${animal.imageUrl}` : `${BASE_URL}${animal.imageUrl}`}
                              alt={animal.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span 
                              className="text-xs font-bold opacity-60"
                              style={{ color: colorConfig.primary }}
                            >
                              {animal.animalId}
                            </span>
                          )}
                        </Link>
                        
                        {/* Animal Name */}
                        <span className="text-white text-sm font-medium opacity-80 text-center group-hover:opacity-100 transition-opacity duration-300 max-w-20 truncate">
                          {animal.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">
              {searchTerm ? `No animals found matching "${searchTerm}"` : 'No animals available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAnimalsPage; 