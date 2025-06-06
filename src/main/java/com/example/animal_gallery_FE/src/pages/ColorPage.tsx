import { useParams, Link } from 'react-router-dom';

function ColorPage() {
  const { colorName } = useParams<{ colorName: string }>();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-6xl font-bold capitalize mb-8">
        {colorName} Page
      </h1>
      <Link 
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
      >
        Go Back
      </Link>
    </div>
  );
}

export default ColorPage; 