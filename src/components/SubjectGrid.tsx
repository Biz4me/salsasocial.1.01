import { useNavigate } from 'react-router-dom';

const subjects = [
  { id: 'party', name: 'Soirée', color: 'design' },
  { id: 'class', name: 'Cours', color: 'chemistry' },
  { id: 'festival', name: 'Festival', color: 'science' },
  { id: 'workshop', name: 'Stage', color: 'maths' }
];

export default function SubjectGrid() {
  const navigate = useNavigate();

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/events?type=${subjectId}`);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          className={`subject-card ${subject.color}`}
          onClick={() => handleSubjectClick(subject.id)}
        >
          <span className="text-white font-medium">{subject.name}</span>
        </button>
      ))}
    </div>
  );
}