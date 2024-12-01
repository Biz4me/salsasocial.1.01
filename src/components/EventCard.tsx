import { FiMapPin, FiClock, FiUsers, FiUserPlus, FiCheck } from 'react-icons/fi';
import { Event } from '../types/event';
import { useUser } from '../contexts/UserContext';
import { useEvents } from '../contexts/EventContext';
import { useState } from 'react';
import InviteFriendsModal from './InviteFriendsModal';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { currentUser } = useUser();
  const { addEvent } = useEvents();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const isRegistered = event.participants.includes(currentUser?.id || '');

  const handleRegistration = () => {
    if (!currentUser) return;

    const updatedEvent = {
      ...event,
      participants: isRegistered
        ? event.participants.filter(id => id !== currentUser.id)
        : [...event.participants, currentUser.id]
    };

    addEvent(updatedEvent);
  };

  return (
    <div className="course-card">
      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{event.description}</p>
      
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <FiClock className="w-4 h-4 mr-2" />
          <span>
            {new Date(event.startDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </span>
        </div>
        
        <div className="flex items-center">
          <FiMapPin className="w-4 h-4 mr-2" />
          <span>{event.location.address}</span>
        </div>

        <div className="flex items-center">
          <FiUsers className="w-4 h-4 mr-2" />
          <span>{event.participants.length} participant(s)</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {event.danceStyles.map(style => (
          <span 
            key={style}
            className="px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-xs"
          >
            {style}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-lg">{event.price}€</span>
        <div className="flex space-x-2">
          {isRegistered && (
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-4 py-2 bg-primary-orange text-white rounded-xl text-sm flex items-center"
            >
              <FiUserPlus className="mr-1" />
              Inviter
            </button>
          )}
          <button 
            onClick={handleRegistration}
            className={`px-4 py-2 rounded-xl text-sm flex items-center ${
              isRegistered 
                ? 'bg-red-500 text-white' 
                : 'bg-primary-purple text-white'
            }`}
          >
            {isRegistered ? (
              <>
                <FiCheck className="mr-1" />
                Inscrit
              </>
            ) : (
              "S'inscrire"
            )}
          </button>
        </div>
      </div>

      <InviteFriendsModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        eventId={event.id}
      />
    </div>
  );
}