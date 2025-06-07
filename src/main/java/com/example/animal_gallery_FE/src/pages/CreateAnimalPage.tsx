import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Animal, AnimalModel } from '../types/Animal';
import { API_BASE_URL } from '../util/BASEURL';

function CreateAnimalPage() {
  const { colorName } = useParams<{ colorName: string }>();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
 // Form state
 const [formData, setFormData] = useState({
  name: '',
   scientificName: '',
  color: colorName,
  habitat: '',
  description: '',
  diet: '',
  lifespan: '',
  image: '',
  funFacts: ['']
});

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const animalData:AnimalModel = {
      name: formData.name,
      scientificName: formData.scientificName,
      habitat: formData.habitat,
      color: colorName || '',
      imageUrl: formData.image || '',
      description: formData.description,
      diet: formData.diet,
      lifespan: parseFloat(formData.lifespan),
      funFacts: formData.funFacts.filter(fact => fact.trim() !== '')
    };
    try {
      const response = await fetch(`${API_BASE_URL}/${colorName}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit animal data');
      }
      const result = await response.json();
      console.log('Animal data submitted successfully:', result);
      navigate(`/${colorName}/all`);
    } catch (error) {
      console.error('Error submitting animal data:', error);
    }
  };
//Upload image to server
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const result = await response.json();
      console.log('Image uploaded successfully:', result);
      setFormData(prev => ({
        ...prev,
        image: result.url
      }));
    }
  };



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

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleFunFactChange = (index: number, value: string) => {
    const newFunFacts = [...formData.funFacts];
    newFunFacts[index] = value;
    setFormData(prev => ({
      ...prev,
      funFacts: newFunFacts
    }));
  };

  const addFunFact = () => {
    setFormData(prev => ({
      ...prev,
      funFacts: [...prev.funFacts, '']
    }));
  };

  const removeFunFact = (index: number) => {
    if (formData.funFacts.length > 1) {
      const newFunFacts = formData.funFacts.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        funFacts: newFunFacts
      }));
    }
  };



  const inputClassName = `w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                          border-2 border-slate-700/80 rounded-full
                          focus:outline-none focus:ring-2 focus:border-2
                          transition-all duration-300 ease-in-out text-lg
                          shadow-lg shadow-black/20`;

  const inputStyle = {
    '--tw-ring-color': `${currentColor.primary}80`,
    borderColor: `${currentColor.primary}40`
  } as React.CSSProperties;

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

      {/* Header Section */}
      <div className="flex flex-col items-center space-y-8 mb-16 mt-8">
        <h1 className="text-6xl font-bold text-white uppercase tracking-widest
                       bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                       md:text-5xl sm:text-4xl">
          Create {colorName} Animal
        </h1>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl space-y-8">
          
          {/* Image Upload - Top Section */}
          <div className="flex justify-center">
            <div>
              <label className="block text-white text-lg font-medium mb-4 text-center">Animal Image</label>
              <div className="flex flex-col items-center space-y-4">
                {/* Image Preview Circle */}
                <div 
                  className="w-56 h-56 rounded-full border-4 cursor-pointer
                             transition-all duration-300 ease-out
                             hover:scale-105 hover:shadow-lg
                             flex items-center justify-center overflow-hidden
                             relative group"
                  style={{
                    backgroundColor: `${currentColor.primary}10`,
                    borderColor: `${currentColor.primary}60`,
                    boxShadow: `0 0 20px ${currentColor.primary}30`
                  }}
                >
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageUpload}
                    required
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  {uploadedImage ? (
                    <img 
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Animal preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-2" style={{ color: currentColor.primary }}>
                        <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium opacity-80" style={{ color: currentColor.primary }}>
                        Click to upload
                      </span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {formData.image ? 'Change Image' : 'Upload Image'}
                    </span>
                  </div>
                </div>
                
                {/* File name display */}
                {formData.image && (
                  <span className="text-white text-sm opacity-80 text-center max-w-full truncate">
                    {formData.image}
                  </span>
                )}

                {/* Lifespan Input - Under Image */}
                <div className="flex items-center justify-center space-x-3 mt-6">
                  <span className="text-white text-lg font-medium">Lives up to</span>
                  <input
                    type="number"
                    name="lifespan"
                    value={formData.lifespan}
                    onChange={handleInputChange}
                    required
                    step="0.1"
                    min="0"
                    className="bg-transparent text-white text-2xl font-bold text-center outline-none border-none
                               w-16 focus:outline-none focus:ring-0 focus:border-none
                               [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ 
                      color: currentColor.primary,
                      caretColor: currentColor.primary
                    }}
                    placeholder="0"
                  />
                  <span className="text-white text-lg font-medium">years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-white text-lg font-medium mb-2">Animal Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={inputClassName}
                style={inputStyle}
                placeholder="e.g., Red Cardinal"
              />
            </div>

            {/* Scientific Name */}
            <div>
              <label className="block text-white text-lg font-medium mb-2">Scientific Name</label>
              <input
                type="text"
                name="scientificName"
                value={formData.scientificName}
                onChange={handleInputChange}
                required
                className={inputClassName}
                style={inputStyle}
                placeholder="e.g., Cardinalis cardinalis"
              />
            </div>
          </div>

          {/* Habitat and Diet Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Habitat */}
            <div>
              <label className="block text-white text-lg font-medium mb-2">Habitat</label>
              <input
                type="text"
                name="habitat"
                value={formData.habitat}
                onChange={handleInputChange}
                required
                className={inputClassName}
                style={inputStyle}
                placeholder="e.g., Forests, gardens, shrublands"
              />
            </div>

            {/* Diet */}
            <div>
              <label className="block text-white text-lg font-medium mb-2">Diet</label>
              <input
                type="text"
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
                required
                className={inputClassName}
                style={inputStyle}
                placeholder="e.g., Seeds, insects, fruits"
              />
            </div>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-white text-lg font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                         border-2 border-slate-700/80 rounded-2xl
                         focus:outline-none focus:ring-2 focus:border-2
                         transition-all duration-300 ease-in-out text-lg
                         shadow-lg shadow-black/20 resize-none"
              style={inputStyle}
              placeholder="Describe the animal's characteristics, behavior, and notable features..."
            />
          </div>

          {/* Fun Facts Section */}
          <div>
            <label className="block text-white text-lg font-medium mb-4">Fun Facts</label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.funFacts.map((fact, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={fact}
                    onChange={(e) => handleFunFactChange(index, e.target.value)}
                    className="flex-1 px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                               border-2 border-slate-700/80 rounded-full
                               focus:outline-none focus:ring-2 focus:border-2
                               transition-all duration-300 ease-in-out text-lg
                               shadow-lg shadow-black/20"
                    style={inputStyle}
                    placeholder={`Fun fact #${index + 1}`}
                  />
                  {formData.funFacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFunFact(index)}
                      className={`px-4 py-4 bg-red-500/20 text-red-400 border-2 border-red-500/60 rounded-full
                                 hover:bg-red-500/30 transition-all duration-300 flex-shrink-0`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={addFunFact}
                className="px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                           hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                           text-lg font-medium tracking-wide shadow-lg shadow-black/20"
              >
                + Add Fun Fact
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="px-12 py-4 text-xl font-bold text-white rounded-full border-2
                         transition-all duration-300 ease-out
                         hover:scale-105 hover:shadow-lg uppercase tracking-wider"
              style={{
                backgroundColor: `${currentColor.primary}30`,
                borderColor: currentColor.primary,
                color: currentColor.primary
              }}
            >
              Add Animal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAnimalPage; 