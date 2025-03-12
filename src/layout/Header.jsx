import { Link } from 'react-router-dom';
import { Search } from '../components/search';
import { CartIcon } from '../components/cartIcon';

export function Header() {
    return (
        <header className="w-full bg-blue-600 text-white h-32 lg:h-28 flex flex-wrap justify-between items-center p-4 sm:p-8 md:px-16 lg:px-24 xl:px-48">
            <div className="font-black text-3xl hover:text-amber-200">
                <Link to="/">Shop</Link>
            </div>

            <div className="w-full md:w-auto order-3 md:order-none mt-2 md:mt-0">
                <Search />
            </div>

            <nav className="flex gap-2 sm:gap-4 items-center">
                <ul><li><Link to="/" className="hover:text-yellow-300 text-sm sm:text-base">Home</Link></li></ul>
                <ul><li><Link to="/contact" className="hover:text-yellow-300 text-sm sm:text-base">Contact</Link></li></ul>
                <ul><li><CartIcon /></li></ul>
            </nav>
        </header>
    );
}
