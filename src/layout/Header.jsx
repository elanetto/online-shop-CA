import { Link } from 'react-router-dom';

export function Header () {
    return (
        <header className='w-screen bg-blue-600 text-white h-24 flex justify-between py-6 mx-auto px-48'>
            <div className='font-black text-3xl text-white hover:text-amber-200 flex justify-center text-center items-center'>
                <p>Logo</p>
            </div>
            <div>
                <input type="text" placeholder='Search for item' aria-label='Search here'
                className='rounded p-2 w-96 bg-white text-blue-950' />
            </div>
            <nav className='flex flex-row gap-4 justify-center text-center items-center'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to='/cart'>Cart</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}