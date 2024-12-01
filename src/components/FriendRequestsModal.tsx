import { Dialog } from '@headlessui/react';
import { useUser } from '../contexts/UserContext';
import { FiUserPlus } from 'react-icons/fi';
import { suggestedFriends } from '../contexts/UserContext';

interface FriendRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FriendRequestsModal({ isOpen, onClose }: FriendRequestsModalProps) {
  const { friends, addFriend } = useUser();

  // Get available friends by filtering out current friends
  const availableFriends = suggestedFriends.filter(
    suggested => !friends.some(friend => friend.id === suggested.id)
  );

  const handleSendRequest = (friendId: string) => {
    addFriend(friendId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl p-6">
          <Dialog.Title className="text-xl font-bold mb-6">
            Suggestions d'amis
          </Dialog.Title>

          <div className="space-y-4">
            {availableFriends.length > 0 ? (
              availableFriends.map(friend => (
                <div
                  key={friend.id}
                  className="flex items-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    {friend.displayName[0]}
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold">{friend.displayName}</h4>
                    <p className="text-sm text-gray-500 capitalize">{friend.salsaLevel}</p>
                    <p className="text-xs text-gray-400">{friend.biography}</p>
                  </div>
                  <button
                    onClick={() => handleSendRequest(friend.id)}
                    className="flex items-center text-primary-purple hover:text-primary-purple/80 transition-colors"
                  >
                    <FiUserPlus className="mr-1" />
                    Ajouter
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucune suggestion d'ami disponible pour le moment
              </div>
            )}
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