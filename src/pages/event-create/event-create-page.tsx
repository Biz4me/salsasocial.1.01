import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../contexts/EventContext';
import { useUser } from '../../contexts/UserContext';
import Navigation from '../../components/Navigation';
import { FiMapPin, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi';

export default function EventCreate() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'party',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: {
      address: '',
      latitude: 48.8566,
      longitude: 2.3522
    },
    price: 0,
    danceStyles: [] as string[],
    acceptedLevels: [] as string[]
  });

  if (currentUser?.id !== 'pro1') {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    addEvent({
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type as 'party' | 'class' | 'festival',
      startDate: startDateTime,
      endDate: endDateTime,
      location: formData.location,
      price: formData.price,
      organizerId: currentUser.id,
      acceptedLevels: ['class', 'workshop'].includes(formData.type) ? formData.acceptedLevels : [],
      participants: [],
      danceStyles: formData.danceStyles
    });
    
    navigate('/events');
  };

  const handleStyleToggle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      danceStyles: prev.danceStyles.includes(style)
        ? prev.danceStyles.filter(s => s !== style)
        : [...prev.danceStyles, style]
    }));
  };

  const handleLevelToggle = (level: string) => {
    setFormData(prev => ({
      ...prev,
      acceptedLevels: prev.acceptedLevels.includes(level)
        ? prev.acceptedLevels.filter(l => l !== level)
        : [...prev.acceptedLevels, level]
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen pb-20">
      <div className="bg-white p-4 mb-4">
        <h1 className="text-2xl font-bold">Créer un événement</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'événement
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'party', label: 'Soirée' },
              { id: 'class', label: 'Cours' },
              { id: 'festival', label: 'Festival' },
              { id: 'workshop', label: 'Stage' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    type: type.id,
                    // Reset acceptedLevels when switching to non-class/workshop type
                    acceptedLevels: ['class', 'workshop'].includes(type.id) ? prev.acceptedLevels : []
                  }));
                }}
                className={`p-3 rounded-xl border-2 ${
                  formData.type === type.id
                    ? 'border-primary-purple bg-primary-purple/10 text-primary-purple'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-xl"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="inline mr-2" />
              Date de début
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiClock className="inline mr-2" />
              Heure de début
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="inline mr-2" />
              Date de fin
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiClock className="inline mr-2" />
              Heure de fin
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiMapPin className="inline mr-2" />
            Adresse
          </label>
          <input
            type="text"
            value={formData.location.address}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              location: { ...prev.location, address: e.target.value }
            }))}
            className="w-full p-3 border border-gray-200 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiDollarSign className="inline mr-2" />
            Prix (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            className="w-full p-3 border border-gray-200 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Styles de danse
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Salsa', 'Bachata', 'Kizomba', 'Merengue'].map(style => (
              <button
                key={style}
                type="button"
                onClick={() => handleStyleToggle(style)}
                className={`p-3 rounded-xl border-2 ${
                  formData.danceStyles.includes(style)
                    ? 'border-primary-purple bg-primary-purple/10 text-primary-purple'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {(formData.type === 'class' || formData.type === 'workshop') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Niveaux acceptés
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['débutant', 'intermédiaire', 'avancé'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleLevelToggle(level)}
                  className={`p-3 rounded-xl border-2 capitalize ${
                    formData.acceptedLevels.includes(level)
                      ? 'border-primary-purple bg-primary-purple/10 text-primary-purple'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-primary-purple text-white rounded-xl font-medium"
        >
          Créer l'événement
        </button>
      </form>

      <Navigation />
    </div>
  );
}