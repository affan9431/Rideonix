const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Logo and Help Center */}
        <div className="mb-12">
          <h1 className="text-2xl font-semibold mb-2">Rideonix</h1>
          <a href="#" className="text-sm text-gray-300 hover:underline">
            Visit Help Center
          </a>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#">About us</a></li>
              <li><a href="#">Our offerings</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-3">Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#">Ride</a></li>
              <li><a href="#">Drive</a></li>
              <li><a href="#">Eat</a></li>
              <li><a href="#">Rideonix for Business</a></li>
              <li><a href="#">Rideonix Freight</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Rideonix Health</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-3">Global citizenship</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#">Safety</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold mb-3">Travel</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#">Reserve</a></li>
              <li><a href="#">Airports</a></li>
              <li><a href="#">Cities</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
