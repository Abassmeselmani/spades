const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-red-500/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      </div>

      {/* Floating Spades */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500/10 text-4xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-spades ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            ♠
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-24">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 mb-20">
            {/* Brand Section */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4 group">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-black rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-black rounded-3xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-red-500/25">
                      <span className="text-white font-black text-3xl">♠</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black tracking-tighter text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-white group-hover:bg-clip-text transition-all duration-500">
                      SPADES
                    </h3>
                    <div className="text-red-400 text-sm uppercase tracking-widest font-semibold">
                      Premium E-Commerce
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Connect with Us</h4>
                <div className="flex space-x-4">
                  {[
                    { name: "Instagram", icon: "IG" },
                    { name: "Twitter", icon: "TW" },
                    { name: "Facebook", icon: "FB" },
                    { name: "TikTok", icon: "TT" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="group relative w-14 h-14 bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl border border-red-500/20 rounded-2xl flex items-center justify-center hover:border-red-500/40 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/20"
                    >
                      <span className="text-white/60 group-hover:text-red-400 transition-colors duration-300 text-xs font-bold">
                        {social.icon}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-black/0 group-hover:from-red-500/10 group-hover:to-black/10 rounded-2xl transition-all duration-300"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Stay in the Game</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Subscribe to get exclusive deals and early access to new arrivals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-gray-900/50 border border-red-500/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 transition-all duration-300"
                />
                <button className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-black rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-red-500 to-black text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transform group-hover:scale-105 transition-all duration-300">
                    Subscribe
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: "Shop",
                links: ["New Arrivals", "Best Sellers", "Sale Items", "Gift Cards", "Collections"]
              },
              {
                title: "Lucky Games",
                links: ["Spades Challenge", "Daily Deals", "Spin Wheel", "Card Draw", "Lucky Hours"]
              },
              {
                title: "Support",
                links: ["Help Center", "Size Guide", "Returns", "Shipping", "Contact Us"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Partners", "Blog"]
              }
            ].map((section, index) => (
              <div key={index} className="space-y-8">
                <h4 className="text-lg font-black uppercase tracking-widest text-white">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-white/60 hover:text-red-400 transition-colors duration-300 text-sm font-medium relative group"
                      >
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-red-500 to-white group-hover:w-full transition-all duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-red-500/20 pt-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Store Location",
                content: "123 Spades Avenue, Card City, Game State 12345",
                icon: "📍"
              },
              {
                title: "Customer Service",
                content: "+1 (800) SPADES-1 | Available 24/7",
                icon: "📞"
              },
              {
                title: "Business Inquiries",
                content: "partnerships@spades.com | Let's collaborate",
                icon: "✉️"
              }
            ].map((contact, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl border border-red-500/20 rounded-2xl flex items-center justify-center group-hover:border-red-500/40 transition-all duration-500 flex-shrink-0">
                  <span className="text-3xl text-red-500">{contact.icon}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-bold uppercase tracking-wide text-white/90">
                    {contact.title}
                  </div>
                  <div className="text-white/60 leading-relaxed">
                    {contact.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-500/20 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-12">
              <p className="text-white/40 text-sm">
                © 2024 Spades Premium E-Commerce. All rights reserved.
              </p>
              <div className="flex items-center space-x-8 text-sm">
                <a href="#" className="text-white/40 hover:text-red-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-white/40 hover:text-red-400 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-white/40 hover:text-red-400 transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-white/40 text-sm">Play Your Cards Right</div>
              <div className="text-2xl text-red-500 animate-pulse">♠</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-spades {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.2; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;