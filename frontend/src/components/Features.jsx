import { Clock, RefreshCw, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round the clock help for our farmers'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'No delivery charges on fresh produce'
  },
  {
    icon: RefreshCw,
    title: '7 Days Replacement',
    description: 'Easy returns for damaged or spoiled items'
  },
  {
    icon: Shield,
    title: 'Quality Product',
    description: 'Only certified and safe vegetables'
  }
];

function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-lime-50 via-green-100 to-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-lime-200 shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <div className="absolute -top-6 bg-green-100 border border-green-300 rounded-full p-4 shadow-md">
                <feature.icon className="h-6 w-6 text-green-700" />
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-emerald-800 mb-2 group-hover:text-green-900 transition">
                  {feature.title}
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
