import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from '../components/Navigation';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { 
  FiUser, FiBell, FiLock, FiLogOut, 
  FiMoon, FiSun, FiGlobe, FiShield, FiCheck 
} from 'react-icons/fi';
import PrivacySettingsModal from '../components/PrivacySettingsModal';
import SecuritySettingsModal from '../components/SecuritySettingsModal';

export default function Settings() {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const { isDark, toggleTheme, language, setLanguage, notifications, toggleNotifications } = useTheme();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-[#F8F9FA] dark:bg-gray-900 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Paramètres</h1>
      </div>

      {/* User Info */}
      <div className="px-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
            {currentUser?.displayName?.[0]}
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-lg dark:text-white">{currentUser?.displayName}</h2>
            <p className="text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-4 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Compte</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
            >
              <FiUser className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="ml-4">
                <div className="font-medium dark:text-white">Mon Profil</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Gérer vos informations personnelles</div>
              </div>
            </button>

            <button
              onClick={toggleNotifications}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="ml-4">
                  <div className="font-medium dark:text-white">Notifications</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {notifications ? 'Activées' : 'Désactivées'}
                  </div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary-purple' : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform mt-1 ${
                  notifications ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Préférences</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center">
                {isDark ? (
                  <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div className="ml-4">
                  <div className="font-medium dark:text-white">Apparence</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {isDark ? 'Thème sombre' : 'Thème clair'}
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiGlobe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="ml-4">
                <div className="font-medium dark:text-white">Langue</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {languages.find(l => l.code === language)?.label}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Sécurité</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
            >
              <FiLock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="ml-4">
                <div className="font-medium dark:text-white">Confidentialité</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Gérer vos paramètres de confidentialité</div>
              </div>
            </button>

            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiShield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="ml-4">
                <div className="font-medium dark:text-white">Sécurité</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Mot de passe et authentification</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-4 text-red-500 bg-white dark:bg-gray-800 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10"
        >
          <FiLogOut className="w-5 h-5 mr-2" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Modals */}
      <Dialog 
        open={isLanguageModalOpen} 
        onClose={() => setIsLanguageModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-6">
            <Dialog.Title className="text-lg font-bold mb-4 dark:text-white">
              Choisir la langue
            </Dialog.Title>

            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLanguageModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl ${
                    language === lang.code 
                      ? 'bg-primary-purple/10 text-primary-purple dark:bg-primary-purple/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white'
                  }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.code && (
                    <FiCheck className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <PrivacySettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <SecuritySettingsModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      <Navigation />
    </div>
  );
}