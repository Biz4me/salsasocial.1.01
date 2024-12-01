import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { FiUser, FiBriefcase } from 'react-icons/fi';

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email, formData.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Salsa Social</h1>
          <p className="text-gray-600">
            Rejoignez la communauté de danse et partagez votre passion
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-6">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-purple text-white rounded-xl font-medium"
            >
              Se connecter
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">Comptes de démonstration</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-purple/10 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-primary-purple" />
              </div>
              <div>
                <p className="font-medium">Compte Danseur</p>
                <p className="text-sm text-gray-600">Email: dancer@demo.com</p>
                <p className="text-sm text-gray-600">Mot de passe: demo123</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-orange/10 flex items-center justify-center">
                <FiBriefcase className="w-5 h-5 text-primary-orange" />
              </div>
              <div>
                <p className="font-medium">Compte Professionnel</p>
                <p className="text-sm text-gray-600">Email: pro@demo.com</p>
                <p className="text-sm text-gray-600">Mot de passe: demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}