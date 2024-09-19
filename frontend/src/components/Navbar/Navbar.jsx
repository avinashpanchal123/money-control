import {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [userName, setUserName] = useState('Avinsh');

    useEffect(() => {
        // console.log('goasoo');
        
        // const fetchProfile = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:3000/profile', {
        //             withCredentials: true // To ensure the token is sent with the request
        //         });
        //         console.log(response, 'hhhhhhhhhhhhh');
                
        //         setUserName(response.data); // Set the userName in the frontend state
        //     } catch (error) {
        //         console.error('Failed to fetch profile', error);
        //     }
        // };

        // fetchProfile();
    }, []);

    return (
        <nav className='bg-black text-white px-8 md:px-16 lg:px-24'>
            <div className='container py-2 flex justify-between items-center'>
                <div className='text-2xl font-bold hidden md:inline'>Money Control</div>
                <div className='space-x-6'>
                    <ul className='flex space-x-8'>
                        <li className='hover:text-gray-400'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='hover:text-gray-400'>
                            <Link to="/analysis">Analysis</Link>
                        </li>
                        <li className='hover:text-gray-400'>
                            <Link to="/budget">Budget</Link>
                        </li>
                        <li className='hover:text-gray-400'>
                            <Link to="/category">Category</Link>
                        </li>
                        <li className='hover:text-gray-400'>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                        <li className='hover:text-gray-400'>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center space-x-4'>
                    {/* Avatar and Profile Dropdown */}
                    {
                        !!userName &&
                        <div className='relative'>
                            <div className='flex items-center cursor-pointer'>
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="User Avatar"
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                                <span className='ml-2 hidden md:inline'>{userName}</span>
                            </div>
                            <div className='absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block'>
                                <ul>
                                    <li className='px-4 py-2 hover:bg-gray-200'>
                                        <Link to="/profile">My Profile</Link>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-200'>
                                        <Link to="/settings">Settings</Link>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-200'>
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar
