import { FiBookmark } from 'react-icons/fi';

const mentors = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    title: 'Professeur de Salsa',
    avatar: 'https://i.pravatar.cc/48?img=1'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    title: 'Expert en Bachata',
    avatar: 'https://i.pravatar.cc/48?img=2'
  }
];

export default function TopMentors() {
  const handleBookmark = (mentorId: number) => {
    console.log(`Bookmarked mentor ${mentorId}`);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Top Mentors</h3>
        <button className="text-sm text-gray-500">Show All</button>
      </div>
      <div className="space-y-3">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="mentor-card">
            <img src={mentor.avatar} alt={mentor.name} className="avatar" />
            <div>
              <h4 className="font-semibold">{mentor.name}</h4>
              <p className="text-sm text-gray-500">{mentor.title}</p>
            </div>
            <button 
              className="ml-auto"
              onClick={() => handleBookmark(mentor.id)}
            >
              <FiBookmark className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}