import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { User } from '../types/user';
import { useUser } from '../contexts/UserContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const { updateProfile } = useUser();
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    biography: user.biography || '',
    salsaLevel: user.salsaLevel,
    preferredStyles: [...user.preferredStyles]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    onClose();
  };

  const handleStyleToggle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      preferredStyles: prev.preferredStyles.includes(style)
        ? prev.preferredStyles.filter(s => s !== style)
        : [...prev.preferredStyles, style]
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl p-6">
          <Dialog.Title className="text-xl font-bold mb-6">
            Modifier le profil
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom d'affichage
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={e => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biographie
              </label>
              <textarea
                value={formData.biography}
                onChange={e => setFormData(prev => ({ ...prev, biography: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Niveau de danse
              </label>
              <select
                value={formData.salsaLevel}
                onChange={e => setFormData(prev => ({ ...prev, salsaLevel: e.target.value as User['salsaLevel'] }))}
                className="w-full p-3 border border-gray-200 rounded-xl"
              >
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="avancé">Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Styles préférés
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Salsa', 'Bachata', 'Kizomba', 'Merengue'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleStyleToggle(style)}
                    className={`p-2 rounded-xl border-2 ${
                      formData.preferredStyles.includes(style)
                        ? 'border-primary-purple bg-primary-purple/10 text-primary-purple'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-purple text-white rounded-xl"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}