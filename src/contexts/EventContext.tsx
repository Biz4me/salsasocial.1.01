import { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types/event';

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const defaultEvents: Event[] = [
  {
    id: '1',
    title: "Soirée Salsa",
    description: "Une soirée de danse latine exceptionnelle",
    type: 'party',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600000),
    location: {
      address: "123 Rue de la Danse, Paris",
      latitude: 48.8566,
      longitude: 2.3522
    },
    price: 15,
    organizerId: 'org1',
    acceptedLevels: [],
    participants: [],
    danceStyles: ['Salsa', 'Bachata']
  },
  {
    id: '2',
    title: "Cours de Bachata",
    description: "Apprenez les bases de la bachata",
    type: 'class',
    startDate: new Date(Date.now() + 86400000),
    endDate: new Date(Date.now() + 90000000),
    location: {
      address: "456 Avenue des Arts, Paris",
      latitude: 48.8584,
      longitude: 2.2945
    },
    price: 20,
    organizerId: 'org2',
    acceptedLevels: ['débutant'],
    participants: [],
    danceStyles: ['Bachata']
  }
];

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(defaultEvents);

  const addEvent = (event: Event) => {
    setEvents(prev => {
      const index = prev.findIndex(e => e.id === event.id);
      if (index !== -1) {
        const newEvents = [...prev];
        newEvents[index] = event;
        return newEvents;
      }
      return [...prev, { ...event, id: Date.now().toString() }];
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}