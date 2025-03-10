import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export function Layout({ products }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header products={products} />
            <main className="flex-grow w-full max-w-screen px-4 sm:px-0 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
