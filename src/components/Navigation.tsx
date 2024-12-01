import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiBookmark, FiEdit, FiSettings } from 'react-icons/fi';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: FiHome, path: '/dashboard', label: 'Home' },
    { icon: FiBookmark, path: '/events', label: 'Events' },
    { icon: FiEdit, path: '/event-create', label: 'Create' },
    { icon: FiSettings, path: '/settings', label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
      <div className="flex justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-icon ${location.pathname === item.path ? 'nav-active' : ''}`}
              aria-label={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>
    </div>
  );
}