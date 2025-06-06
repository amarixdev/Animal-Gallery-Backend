import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [hoveredBg, setHoveredBg] = useState<string | null>(null);

  const colors = [
    { name: 'Red',    hex: '#ef4444', subtleHex: '#3f1212', hoverColor: 'hover:text-red-500',    shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(239,68,68)]' },
    { name: 'Orange', hex: '#f97316', subtleHex: '#4d2a0b', hoverColor: 'hover:text-orange-500', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(249,115,22)]' },
    { name: 'Yellow', hex: '#facc15', subtleHex: '#4a3f0c', hoverColor: 'hover:text-yellow-400', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(250,204,21)]' },
    { name: 'Green',  hex: '#22c55e', subtleHex: '#103b21', hoverColor: 'hover:text-green-500',  shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(34,197,94)]' },
    { name: 'Blue',   hex: '#3b82f6', subtleHex: '#152a4c', hoverColor: 'hover:text-blue-500',   shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(59,130,246)]' },
    { name: 'Indigo', hex: '#6366f1', subtleHex: '#22234e', hoverColor: 'hover:text-indigo-500', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(99,102,241)]' },
    { name: 'Violet', hex: '#8b5cf6', subtleHex: '#2e1e4e', hoverColor: 'hover:text-violet-500', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(139,92,246)]' },
    { name: 'White',  hex: '#ffffff', subtleHex: '#333333', hoverColor: 'hover:text-white',      shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(255,255,255)]' }
  ]

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 transition-[background] duration-1000 ease-in-out"
      style={{
          background: `linear-gradient(to bottom right, ${hoveredBg || '#0f172a'}, #000, ${hoveredBg || '#0f172a'})`
      }}
    >
      <div className="flex flex-col items-center space-y-32">
        {/* Title */}
        <div className="text-center space-y-6">
          <h1 className="text-8xl font-bold text-white uppercase tracking-widest
                         animate-[fadeInUp_1s_ease-out_both]
                         hover:opacity-100 hover:text-gradient-to-r hover:from-blue-400 hover:to-purple-500
                         transition-all duration-500 ease-out
                         bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                         md:text-7xl sm:text-5xl">
            Animal Gallery
          </h1>
          
          {/* <p className="text-2xl text-white opacity-50 uppercase tracking-wider font-medium
                        animate-[fadeInUp_1s_ease-out_both]
                        hover:opacity-80 transition-opacity duration-300
                        md:text-xl sm:text-lg"
             style={{ animationDelay: '0.3s' }}>
            Select a color
          </p> */}
        </div>

        {/* Color Words */}
        <div 
            className="flex flex-wrap gap-12 justify-center items-center max-w-6xl mx-auto"
            onMouseLeave={() => setHoveredBg(null)}
        >
          {colors.map((colorItem, index) => (
            <div 
              key={colorItem.name}
              onMouseEnter={() => setHoveredBg(colorItem.subtleHex)}
              className={`
                text-6xl font-bold text-white opacity-30 cursor-pointer
                transition-all duration-500 ease-out
                relative uppercase tracking-wider select-none
                hover:opacity-100 hover:-translate-y-3 hover:scale-110
                hover:brightness-125
                ${colorItem.hoverColor}
                ${colorItem.shadowColor}
                animate-[fadeInUp_0.8s_ease-out_both]
                md:text-5xl sm:text-4xl
              `}
              style={{
                animationDelay: `${(index + 2) * 0.1}s`
              }}
            >
              {colorItem.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
