import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
      <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
        >
          {currentUser?.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt={currentUser.displayName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl text-gray-600">
              {currentUser?.displayName?.[0]}
            </span>
          )}
        </button>
        <button onClick={onSearchClick}>
          <FiSearch className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}