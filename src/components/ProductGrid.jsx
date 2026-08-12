import { useState } from 'react';
import SpadeAnimation from './SpadeAnimation';

const ProductGrid = ({ onTryLuck }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showSpadeAnimation, setShowSpadeAnimation] = useState(false);

  const products = [
    {
      id: 1,
      name: "Royal Ace Sneakers",
      category: "Premium Footwear",
      price: "$299",
      originalPrice: "$399",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop&crop=center",
      badge: "👑 Royal",
      description: "Step into luxury with our premium sneaker collection",
      discount: "25% OFF",
      rating: 4.9,
      reviews: 2847
    },
    {
      id: 2,
      name: "King's Crown Watch",
      category: "Luxury Timepiece",
      price: "$899",
      originalPrice: "$1299",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center",
      badge: "👑 Elite",
      description: "Timeless elegance meets modern sophistication",
      discount: "31% OFF",
      rating: 4.8,
      reviews: 1923
    },
    {
      id: 3,
      name: "Queen's Diamond Ring",
      category: "Fine Jewelry",
      price: "$1599",
      originalPrice: "$2299",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop&crop=center",
      badge: "💎 Luxury",
      description: "Exquisite craftsmanship with premium diamonds",
      discount: "30% OFF",
      rating: 4.9,
      reviews: 3156
    },
    {
      id: 4,
      name: "Jack's Leather Jacket",
      category: "Premium Apparel",
      price: "$449",
      originalPrice: "$649",
      image: "https://images.unsplash.com/photo-1551082719-00167b16eac5?w=500&h=600&fit=crop&crop=center",
      badge: "🧥 Classic",
      description: "Handcrafted leather with timeless style",
      discount: "31% OFF",
      rating: 4.7,
      reviews: 1654
    },
    {
      id: 5,
      name: "Ace Sunglasses",
      category: "Designer Eyewear",
      price: "$199",
      originalPrice: "$299",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop&crop=center",
      badge: "🕶️ Trendy",
      description: "UV protection meets cutting-edge design",
      discount: "33% OFF",
      rating: 4.6,
      reviews: 2341
    },
    {
      id: 6,
      name: "Royal Handbag",
      category: "Luxury Accessories",
      price: "$699",
      originalPrice: "$999",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop&crop=center",
      badge: "👛 Premium",
      description: "Elegant design with premium materials",
      discount: "30% OFF",
      rating: 4.9,
      reviews: 987
    }
  ];

  const handleTryLuck = (productId) => {
    setShowSpadeAnimation(true);
  };

  const handleSpadeAnimationComplete = () => {
    setShowSpadeAnimation(false);
    onTryLuck();
  };

  return (
    <section id="shop" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-black/10"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500/20 text-6xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-spades ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ♠
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/10 to-black/10 backdrop-blur-xl border border-red-500/20 rounded-full px-8 py-4 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-black rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">♠</span>
            </div>
            <span className="text-red-400 font-medium text-sm uppercase tracking-widest">Premium Collection</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
            <span className="block">ROYAL</span>
            <span className="block bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
              COLLECTION
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our premium collection where every purchase comes with a chance to
            <span className="text-red-400 font-semibold"> "Try Your Luck in Spades" </span>
            for exclusive discounts and prizes.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-red-500/20 rounded-3xl overflow-hidden hover:border-red-500/40 transition-all duration-700 hover:shadow-2xl hover:shadow-red-500/10"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 group-hover:from-red-500/20 to-black/0 group-hover:to-black/20 transition-all duration-700"></div>
              </div>

              {/* Badges */}
              <div className="absolute top-6 left-6">
                <div className="bg-gradient-to-r from-red-500 to-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {product.badge}
                </div>
              </div>
              <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-2 rounded-2xl text-xs font-bold uppercase">
                {product.discount}
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center space-y-4">
                  <div className="text-6xl text-red-500 animate-pulse">♠</div>
                  <div className="text-white font-bold text-lg">Premium Quality</div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 text-xs uppercase tracking-widest font-semibold">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-white/60 text-sm">{product.rating}</span>
                      <span className="text-white/40 text-xs">({product.reviews})</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-white group-hover:bg-clip-text transition-all duration-300">
                  {product.name}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-3 pt-4 border-t border-red-500/20">
                  <span className="text-3xl font-black bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-white/40 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-black rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-r from-red-500 to-black text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transform group-hover:scale-105 transition-all duration-300">
                      <span className="relative z-10">Buy Now</span>
                    </div>
                  </button>
                  <button onClick={() => handleTryLuck(product.id)} className="flex-1 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 rounded-2xl backdrop-blur-xl"></div>
                    <div className="relative border-2 border-red-500/50 hover:border-red-500 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-xl group-hover:bg-red-500/10">
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span className="text-lg">♠</span>
                        <span>Try Luck</span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-black rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-r from-red-500 to-black text-white px-16 py-6 rounded-3xl font-black text-xl uppercase tracking-wider transform group-hover:scale-105 transition-all duration-300 shadow-2xl">
              <span className="relative z-10 flex items-center space-x-4">
                <span>♠</span>
                <span>Load More Cards</span>
                <span>♠</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
          </button>
        </div>
      </div>

      {/* Spade Animation */}
      <SpadeAnimation
        isVisible={showSpadeAnimation}
        onComplete={handleSpadeAnimationComplete}
      />

      <style jsx>{`
        @keyframes float-spades {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;