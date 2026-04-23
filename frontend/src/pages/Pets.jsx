import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to API Gateway -> Pet Service
    axios.get('http://localhost:8000/pets/pets')
      .then(res => {
        if(Array.isArray(res.data)) {
            setPets(res.data);
        } else {
            setPets([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback for UI presentation
        setPets([
          { _id: '1', name: 'Bella', type: 'Dog', breed: 'Golden Retriever', age: 3, image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400' },
          { _id: '2', name: 'Luna', type: 'Cat', breed: 'Maine Coon', age: 2, image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400' },
          { _id: '3', name: 'Charlie', type: 'Dog', breed: 'French Bulldog', age: 1, image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 font-serif">Meet Our Furry Friends</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover adorable pets waiting for a visit or a new loving home.</p>
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-3xl overflow-hidden shadow-md hover-lift border border-gray-100 group">
              <div className="relative h-64 overflow-hidden">
                <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full text-primary hover:bg-primary hover:text-white transition cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                    <p className="text-primary font-medium">{pet.breed}</p>
                  </div>
                  <div className="bg-burgundy-50 text-primary px-3 py-1 rounded-lg text-sm font-bold">
                    {pet.age} yrs
                  </div>
                </div>
                <Link to={`/booking?pet=${pet._id}`} className="block w-full text-center bg-burgundy-100 hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-xl transition duration-300">
                  Book a Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
