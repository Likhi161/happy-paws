import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Gateway -> Order Service
    axios.get('http://localhost:8000/orders/products')
      .then(res => {
        if(Array.isArray(res.data)) {
            setProducts(res.data);
        } else {
            setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback
        setProducts([
          { id: 1, name: 'Premium Salmon Kibble', price: 45.99, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400' },
          { id: 2, name: 'Plush Donut Bed', price: 34.50, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400' },
          { id: 3, name: 'Interactive Laser Toy', price: 18.99, image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=400' }
        ]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    // Add to local storage cart
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 font-serif">Pet Shop</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Premium products for your premium pets.</p>
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow hover-lift border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img src={product.image} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <div className="text-xl font-black text-primary mb-4 mt-auto">₹{(product.price * 80).toFixed(2)}</div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-primary text-white font-bold py-2.5 rounded-xl transition duration-300"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
