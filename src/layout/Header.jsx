import { Link } from 'react-router-dom';
import { Search } from '../components/search';
import { CartIcon } from '../components/cartIcon';
import { Home, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-neutral-800 text-white h-32 lg:h-28 flex flex-wrap justify-between items-center p-4 sm:p-8 md:px-16 lg:px-24 xl:px-48">
      <div className="font-black text-3xl hover:text-yellow-400">
        <Link to="/">Shop</Link>
      </div>

      <div className="w-full md:w-auto order-3 md:order-none mt-2 md:mt-0">
        <Search />
      </div>

      <nav className="flex gap-2 sm:gap-4 items-center">
        <ul>
          <li>
            <Link to="/" className="hover:text-yellow-400 text-sm sm:text-base flex items-center gap-1">
              <Home size={16} /> Home
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 text-sm sm:text-base flex items-center gap-1">
              <Mail size={16} /> Contact
            </Link>
          </li>
        </ul>
        <ul>
          <li><CartIcon /></li>
        </ul>
      </nav>
    </header>
  );
}
