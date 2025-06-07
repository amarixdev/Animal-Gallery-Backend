import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Animal } from '../types/Animal';
import { useEffect, useState } from 'react';
import { staticAnimals } from '../data/static-animals';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';

function AnimalDetailPage() {
  const navigate = useNavigate();
  

  const { colorName, animalId } = useParams<{ colorName: string; animalId: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);


  const isStatic = animalId && parseInt(animalId) <= staticAnimals.length; //[24]
  
  useEffect(() => {
    console.log(isStatic)
    if (isStatic) {
      const staticAnimal = staticAnimals.find((animal) => animal.animalId === parseInt(animalId));
      if (staticAnimal) {
        console.log(staticAnimal);
        setAnimal(staticAnimal);
      } 
    } else {
    const fetchAnimal = async () => {
      const response = await fetch(`${API_BASE_URL}/${colorName}/${animalId}`);
      const data = await response.json();
      console.log(data)
      setAnimal(data);
    };
    fetchAnimal();
  }
  }, []);



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
      {/* Navigation Buttons - Top Left */}
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

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-start mt-20">
        <div className="w-full max-w-6xl">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white uppercase tracking-widest
                           bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                           md:text-5xl sm:text-4xl mb-4">
              {animal?.name}
            </h1>
            <p className="text-2xl text-white/80 italic tracking-wide">
              {animal?.scientificName}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            
            {/* Left Column - Image and Basic Info */}
            <div className="flex flex-col items-center space-y-6">
              {/* Animal Image */}
              <div 
                className="w-72 h-72 rounded-full border-4 overflow-hidden
                           transition-all duration-300 ease-out
                           hover:scale-105 hover:shadow-lg
                           flex items-center justify-center"
                style={{
                  backgroundColor: `${currentColor.primary}20`,
                  borderColor: `${currentColor.primary}60`,
                  boxShadow: `0 0 30px ${currentColor.primary}40`
                }}
              >
                {/* Placeholder for animal image */}
                <div className="w-full h-full flex items-center justify-center">
                  <img src={ isStatic ? `/images/${animal?.imageUrl}` : `${BASE_URL}${animal?.imageUrl}`} alt={animal?.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="w-full max-w-sm space-y-4">
                <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/80 text-center">
                  <h3 className="text-lg font-semibold text-white mb-3">Lifespan</h3>
                  <p className="text-3xl font-bold" style={{ color: currentColor.primary }}>
                    {animal?.lifespan} years
                  </p>
                </div>
                
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="flex flex-col justify-start space-y-6">
              
              {/* Habitat */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/80 h-fit">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3" style={{ color: currentColor.primary }}>
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                  Habitat
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {animal?.habitat}
                </p>
              </div>

              {/* Diet */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/80 h-fit">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3" style={{ color: currentColor.primary }}>
                    <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.966 0-1.75-.784-1.75-1.75V18a.75.75 0 01-1.5 0v-2.735a1.75 1.75 0 01-1.75 1.75h-6.5A1.75 1.75 0 012 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm0 2.005a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-1.125z" clipRule="evenodd" />
                  </svg>
                  Diet
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {animal?.diet}
                </p>
              </div>

              {/* Additional Info Placeholder */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/80 h-fit">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3" style={{ color: currentColor.primary }}>
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Description
                </h3>
                <div className="space-y-2">
                  <p className="text-white/90">
                    {animal?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border-2 border-slate-700/80">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 mr-3" style={{ color: currentColor.primary }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              Fun Facts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animal?.funFacts.map((fact, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-xl"
                  style={{ backgroundColor: `${currentColor.primary}10` }}
                >
                  <span 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ 
                      backgroundColor: currentColor.primary,
                      color: currentColor.subtle
                    }}
                  >
                    {index + 1}
                  </span>
                  <p className="text-white/90 leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mt-12">

            <Link
              to={`/${colorName}/all`}
              className="px-8 py-4 text-xl font-bold text-white rounded-full border-2
                         transition-all duration-300 ease-out
                         hover:scale-105 hover:shadow-lg uppercase tracking-wider inline-block
                         bg-slate-800/50 border-slate-700/80 hover:bg-slate-700/50 hover:border-slate-600/80"
            >
              View All {colorName} Animals
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-8 flex justify-center space-x-6" >
      <button 

className=" cursor-pointer px-6 py-3 bg-red-400/20 text-white rounded-full border-2 border-slate-700/80
           hover:bg-red-700/50 hover:border-slate-600/80 transition-all duration-300
           text-lg font-medium tracking-wide shadow-lg shadow-black/20"
>
Delete
</button>
<Link 
        to={`/${colorName}/${animalId}/update`}
        className=" px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                   hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                   text-lg font-medium tracking-wide shadow-lg shadow-black/20"
      >
       Update
      </Link>
    
</div>
  
    </div>
  );
}

export default AnimalDetailPage; 