import { useEvents } from '../contexts/EventContext';
import EventCard from './EventCard';

export default function EventList() {
  const { events } = useEvents();
  const upcomingEvents = events.slice(0, 2); // Show only 2 events on dashboard

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Événements à venir</h3>
        <button className="text-sm text-gray-500">Voir tout</button>
      </div>
      <div className="space-y-4">
        {upcomingEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}