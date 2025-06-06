import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ColorPage from './pages/ColorPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:colorName" element={<ColorPage />} />
    </Routes>
  );
}

export default App;
