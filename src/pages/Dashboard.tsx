import { useState } from 'react';
import Header from '../components/Header';
import SubjectGrid from '../components/SubjectGrid';
import TopMentors from '../components/TopMentors';
import Navigation from '../components/Navigation';
import SearchModal from '../components/SearchModal';
import EventList from '../components/EventList';

export default function Dashboard() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen pb-20">
      <Header onSearchClick={() => setIsSearchModalOpen(true)} />
      
      <div className="p-4 mt-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Bienvenue sur</h1>
          <h2 className="text-3xl font-bold text-gray-800">Salsa Social</h2>
        </div>

        <SubjectGrid />
        <EventList />
        <TopMentors />
      </div>

      <Navigation />

      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={(filters) => {
          console.log('Search filters:', filters);
          setIsSearchModalOpen(false);
        }}
      />
    </div>
  );
}