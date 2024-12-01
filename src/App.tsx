import { Routes, Route } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EventCreate from './pages/event-create/event-create-page';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <EventProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event-create" element={<EventCreate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </EventProvider>
      </UserProvider>
    </ThemeProvider>
  );
}