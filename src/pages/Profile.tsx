import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Navigation from '../components/Navigation';
import { FiEdit2, FiMail, FiMapPin, FiUserPlus, FiUserMinus } from 'react-icons/fi';
import EditProfileModal from '../components/EditProfileModal';
import FriendRequestsModal from '../components/FriendRequestsModal';

export default function Profile() {
  const { currentUser, friends, removeFriend } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen p-4 pb-20">
      {/* Cover & Profile Picture */}
      <div className="relative mb-16">
        <div className="h-32 bg-gradient-to-r from-primary-purple to-primary-orange rounded-xl" />
        <div className="absolute -bottom-10 left-4 flex items-end">
          <div className="w-24 h-24 bg-white rounded-full p-1">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-2xl">
              {currentUser.displayName[0]}
            </div>
          </div>
          <div className="ml-4 mb-2">
            <h1 className="text-xl font-bold">{currentUser.displayName}</h1>
            <p className="text-sm text-gray-600 capitalize">{currentUser.salsaLevel}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="absolute bottom-0 right-4 px-4 py-2 bg-primary-purple text-white rounded-xl text-sm flex items-center"
        >
          <FiEdit2 className="mr-2" />
          Modifier le profil
        </button>
      </div>

      {/* Info Cards */}
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-3">À propos</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <FiMail className="w-4 h-4 mr-2" />
              {currentUser.email}
            </div>
            {currentUser.location && (
              <div className="flex items-center text-gray-600">
                <FiMapPin className="w-4 h-4 mr-2" />
                Paris, France
              </div>
            )}
          </div>
          <p className="mt-3 text-gray-600">{currentUser.biography}</p>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-3">Styles de danse préférés</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.preferredStyles.map(style => (
              <span
                key={style}
                className="px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Amis ({friends.length})</h2>
          <button
            onClick={() => setIsRequestsModalOpen(true)}
            className="text-sm text-primary-purple flex items-center"
          >
            <FiUserPlus className="mr-1" />
            Ajouter
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {friends.map(friend => (
            <div key={friend.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl mb-2">
                {friend.displayName[0]}
              </div>
              <p className="font-medium text-sm">{friend.displayName}</p>
              <p className="text-xs text-gray-500 capitalize mb-2">{friend.salsaLevel}</p>
              <button
                onClick={() => removeFriend(friend.id)}
                className="text-xs text-red-500 flex items-center"
              >
                <FiUserMinus className="mr-1" />
                Retirer
              </button>
            </div>
          ))}
        </div>
      </div>

      <Navigation />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={currentUser}
      />

      <FriendRequestsModal
        isOpen={isRequestsModalOpen}
        onClose={() => setIsRequestsModalOpen(false)}
      />
    </div>
  );
}