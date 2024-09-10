import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
    return (
       
        <nav className='bg-black text-white px-8 md:px-16 lg:px-24'>
            <div className='container py-2 flex justify-center md:justify-between items-center'>
                <div className='text-2xl font-bold hidden md:inline'>Money Control</div>
                <div className='space-x-6'>
                    <nav>
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
                        </ul>
                    </nav>
                </div>
                <button className='bg-gradient-to-r from-green-400 to-blue-500 text-white hidden md:inline
            transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full'>Connect Me</button>
            </div>
        </nav>
    )
}

export default Navbar