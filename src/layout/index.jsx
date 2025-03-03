import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export function Layout () {
    return (
        <> 
            <body className='m-0 p-0 h-screen w-screen flex flex-col'>
                <Header />
                <main className='grow sm:p-0 px-48 py-6 flex flex-col'>
                    <Outlet />
                </main>
                <Footer />
            </body>
        </>
    )
}