import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { FiEye, FiEyeOff, FiGlobe, FiUsers } from 'react-icons/fi';

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacySettingsModal({ isOpen, onClose }: PrivacySettingsModalProps) {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showLevel: true,
    showEvents: true
  });

  const handleSave = () => {
    // Save privacy settings
    localStorage.setItem('privacySettings', JSON.stringify(settings));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl p-6">
          <Dialog.Title className="text-xl font-bold mb-6">
            Paramètres de confidentialité
          </Dialog.Title>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Visibilité du profil</label>
              <div className="mt-2 space-y-2">
                <button
                  onClick={() => setSettings(prev => ({ ...prev, profileVisibility: 'public' }))}
                  className={`w-full flex items-center p-3 rounded-xl border-2 ${
                    settings.profileVisibility === 'public'
                      ? 'border-primary-purple bg-primary-purple/10'
                      : 'border-gray-200'
                  }`}
                >
                  <FiGlobe className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Public</div>
                    <div className="text-sm text-gray-500">Visible par tous les utilisateurs</div>
                  </div>
                </button>

                <button
                  onClick={() => setSettings(prev => ({ ...prev, profileVisibility: 'friends' }))}
                  className={`w-full flex items-center p-3 rounded-xl border-2 ${
                    settings.profileVisibility === 'friends'
                      ? 'border-primary-purple bg-primary-purple/10'
                      : 'border-gray-200'
                  }`}
                >
                  <FiUsers className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Amis uniquement</div>
                    <div className="text-sm text-gray-500">Visible par vos amis</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Afficher l'email</div>
                  <div className="text-sm text-gray-500">Visible sur votre profil</div>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                  className="p-2"
                >
                  {settings.showEmail ? (
                    <FiEye className="w-5 h-5 text-primary-purple" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Afficher le niveau</div>
                  <div className="text-sm text-gray-500">Visible sur votre profil</div>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showLevel: !prev.showLevel }))}
                  className="p-2"
                >
                  {settings.showLevel ? (
                    <FiEye className="w-5 h-5 text-primary-purple" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Afficher les événements</div>
                  <div className="text-sm text-gray-500">Visible sur votre profil</div>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showEvents: !prev.showEvents }))}
                  className="p-2"
                >
                  {settings.showEvents ? (
                    <FiEye className="w-5 h-5 text-primary-purple" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-purple text-white rounded-xl"
            >
              Enregistrer
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}