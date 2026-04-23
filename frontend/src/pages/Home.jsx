import { Link } from 'react-router-dom';
import { CalendarCheck, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-burgundy-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23b22240\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        </div>
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-serif">
            Premium Care for Your Best Friend
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Book trusted grooming, vaccination, and health checkups, or browse adorable pets waiting to meet you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full shadow-lg hover-lift transition">
              Book Appointment
            </Link>
            <Link to="/pets" className="bg-white text-primary border-2 border-primary hover:bg-burgundy-50 font-bold py-3 px-8 rounded-full shadow hover-lift transition">
              Meet Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Why Choose Happy Paws?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: CalendarCheck, title: "Easy Booking", desc: "Schedule appointments in seconds with our seamless booking system." },
              { icon: ShieldCheck, title: "Verified Professionals", desc: "All our pet care specialists are thoroughly vetted and highly trained." },
              { icon: HeartHandshake, title: "Loving Environment", desc: "We treat every pet like our own, ensuring a stress-free experience." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-burgundy-50 rounded-2xl p-8 text-center hover-lift border border-burgundy-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy-100 text-primary mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
