import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { FiCheck } from 'react-icons/fi';

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

export default function InviteFriendsModal({ isOpen, onClose, eventId }: InviteFriendsModalProps) {
  const { friends } = useUser();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

  const handleInvite = () => {
    setInvitedFriends(prev => [...prev, ...selectedFriends]);
    setSelectedFriends([]);
    // Here you would typically send invitations through your backend
    console.log(`Inviting friends ${selectedFriends.join(', ')} to event ${eventId}`);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl p-6">
          <Dialog.Title className="text-xl font-bold mb-6">
            Inviter des amis
          </Dialog.Title>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {friends
              .filter(friend => !invitedFriends.includes(friend.id))
              .map(friend => (
                <div
                  key={friend.id}
                  onClick={() => {
                    setSelectedFriends(prev =>
                      prev.includes(friend.id)
                        ? prev.filter(id => id !== friend.id)
                        : [...prev, friend.id]
                    );
                  }}
                  className={`flex items-center p-4 rounded-xl cursor-pointer ${
                    selectedFriends.includes(friend.id)
                      ? 'bg-primary-purple/10 border-2 border-primary-purple'
                      : 'bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {friend.displayName[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{friend.displayName}</h4>
                    <p className="text-sm text-gray-500">{friend.email}</p>
                  </div>
                  {selectedFriends.includes(friend.id) && (
                    <FiCheck className="ml-auto text-primary-purple" />
                  )}
                </div>
              ))}

            {invitedFriends.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Invitations envoyées</h4>
                {friends
                  .filter(friend => invitedFriends.includes(friend.id))
                  .map(friend => (
                    <div
                      key={friend.id}
                      className="flex items-center p-4 rounded-xl bg-green-50"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {friend.displayName[0]}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">{friend.displayName}</h4>
                        <p className="text-sm text-green-600">Invitation envoyée</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Fermer
            </button>
            {selectedFriends.length > 0 && (
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-primary-purple text-white rounded-xl"
              >
                Inviter ({selectedFriends.length})
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}