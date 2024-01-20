'use client'
import {useState, useEffect}from 'react'
import './header.css'
const Header = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isScrollingUp = currentScrollPos < prevScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(currentScrollPos === 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);

    return (
        <div className={`Navbar ${visible ? 'visible' : 'hidden'}`}>
        <div className='Navbar--inner navbar-links'>
            <a href='#name' >
            Home
            </a>
        </div>
        <div className='Navbar--outer'>
            <a className='navbar-links' href = '#upload'>
                Upload
            </a>
            <a className='navbar-links' href = '#friends'>
                Friends
            </a>
        </div>
    </div>
  )
}

export default Header