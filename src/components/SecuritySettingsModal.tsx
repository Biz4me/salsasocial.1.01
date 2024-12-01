import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { FiLock, FiSmartphone, FiKey } from 'react-icons/fi';

interface SecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecuritySettingsModal({ isOpen, onClose }: SecuritySettingsModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic
    console.log('Password change requested');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl p-6">
          <Dialog.Title className="text-xl font-bold mb-6">
            Paramètres de sécurité
          </Dialog.Title>

          <div className="space-y-6">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <FiKey className="w-5 h-5 mr-2" />
                Changer le mot de passe
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary-purple text-white rounded-xl"
              >
                Mettre à jour le mot de passe
              </button>
            </form>

            <div className="border-t pt-6">
              <h3 className="font-semibold flex items-center mb-4">
                <FiSmartphone className="w-5 h-5 mr-2" />
                Double authentification
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Authentification à deux facteurs</div>
                  <div className="text-sm text-gray-500">
                    {twoFactorEnabled 
                      ? 'Activée - Votre compte est plus sécurisé'
                      : 'Désactivée - Activez pour plus de sécurité'
                    }
                  </div>
                </div>
                <div className={`w-12 h-7 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-primary-purple' : 'bg-gray-200'
                }`}>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-1 ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Fermer
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}