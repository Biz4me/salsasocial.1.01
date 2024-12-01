import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User } from '../types/user';

interface UserContextType {
  currentUser: User | null;
  friends: User[];
  login: (email: string, password: string) => void;
  logout: () => void;
  addFriend: (friendId: string) => void;
  removeFriend: (friendId: string) => void;
  updateProfile: (profile: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const demoAccounts = {
  dancer: {
    id: 'dancer1',
    email: 'dancer@demo.com',
    password: 'demo123',
    displayName: 'Alex Danseur',
    salsaLevel: 'intermédiaire' as const,
    preferredStyles: ['Salsa', 'Bachata'],
    biography: 'Passionné de danses latines depuis 3 ans'
  },
  professional: {
    id: 'pro1',
    email: 'pro@demo.com',
    password: 'demo123',
    displayName: 'Marie Professeur',
    salsaLevel: 'avancé' as const,
    preferredStyles: ['Salsa', 'Bachata', 'Kizomba'],
    biography: 'Professeur de danse et organisatrice d\'événements'
  }
};

const suggestedFriends: User[] = [
  {
    id: 'suggested1',
    email: 'sophie@example.com',
    displayName: 'Sophie Martin',
    salsaLevel: 'débutant',
    preferredStyles: ['Salsa'],
    biography: 'Nouvelle dans la danse latine'
  },
  {
    id: 'suggested2',
    email: 'lucas@example.com',
    displayName: 'Lucas Dubois',
    salsaLevel: 'intermédiaire',
    preferredStyles: ['Bachata', 'Kizomba'],
    biography: 'Passionné de salsa depuis 2 ans'
  },
  {
    id: 'suggested3',
    email: 'maria@example.com',
    displayName: 'Maria Rodriguez',
    salsaLevel: 'avancé',
    preferredStyles: ['Salsa', 'Bachata'],
    biography: 'Professeur de danse'
  }
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);

  const login = useCallback((email: string, password: string) => {
    if (email === demoAccounts.dancer.email && password === demoAccounts.dancer.password) {
      setCurrentUser(demoAccounts.dancer);
      // Initialize with some friends for the dancer account
      setFriends([suggestedFriends[2]]);
    } else if (email === demoAccounts.professional.email && password === demoAccounts.professional.password) {
      setCurrentUser(demoAccounts.professional);
      setFriends([]);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setFriends([]);
  }, []);

  const addFriend = useCallback((friendId: string) => {
    const friendToAdd = suggestedFriends.find(f => f.id === friendId);
    if (friendToAdd && !friends.some(f => f.id === friendId)) {
      setFriends(prev => [...prev, friendToAdd]);
    }
  }, [friends]);

  const removeFriend = useCallback((friendId: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== friendId));
  }, []);

  const updateProfile = useCallback((profile: Partial<User>) => {
    setCurrentUser(prev => prev ? { ...prev, ...profile } : null);
  }, []);

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      friends, 
      login,
      logout,
      addFriend, 
      removeFriend,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Export for use in other components
export { suggestedFriends };