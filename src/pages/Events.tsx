import { useState } from 'react';
import Navigation from '../components/Navigation';
import EventMap from '../components/EventMap';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import { FiMap, FiList } from 'react-icons/fi';

export default function Events() {
  const { events } = useEvents();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Événements</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-primary-purple text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FiList className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg ${
              viewMode === 'map'
                ? 'bg-primary-purple text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FiMap className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="mb-6">
          <EventMap events={events} />
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <Navigation />
    </div>
  );
}