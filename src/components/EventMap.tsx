import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Event } from '../types/event';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface EventMapProps {
  events: Event[];
}

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function EventMap({ events }: EventMapProps) {
  const center = { lat: 48.8566, lng: 2.3522 }; // Paris coordinates

  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={13} 
      className="h-[400px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => (
        <Marker 
          key={event.id}
          position={[event.location.latitude, event.location.longitude]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm font-medium mt-1">{event.price}€</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}