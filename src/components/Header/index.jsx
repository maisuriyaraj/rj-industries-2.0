import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import resume from '../../assets/resume/Raj-Maisuriya-Resume.pdf';
import menu from '../../assets/images/menu.svg';
import './index.css'

export default function Header() {
    const [bgColor, setBgColor] = React.useState('transparent');
    const [currentPath,setPath] = useState("");
    const location = useLocation();

    useEffect(()=>{
        setPath(location.pathname);
    },[location.pathname]);


    const handleScroll = () => {
        if (window.scrollY > 40) {
          setBgColor('#f5fafd');
        } else {
          setBgColor('transparent');
        }
      };
    
      // Set up scroll event listener
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


      // Function to toggle navigation
      const toggleNav = () => {
        let nav = document.getElementById('mobile');
        if(nav != null){
            if(!nav.classList.contains('open')){
                nav.classList.add('open');   
            }else{
                nav.classList.remove('open');
            }
        }
      };
    return (
        <div className='header sticky top-0 w-full z-50' id='header'>
            <nav
                className="relative top-0 block items-start duration-300 ease-in-out"
                style={{
                    background:bgColor
                }}
            >
                <div style={{ maxWidth: 1536, margin: "auto", width: "100%" }}>
                    <div className="m-auto w-[90%]">
                        <div className="flex flex-col-reverse  md:flex-row">
                            <div className="flex w-full items-center justify-between py-[20px]">
                                <a aria-current="page" className="text-2xl font-audiowide font-semibold" to="/">
                                    RJ<span className='text-[#0095ff]'>INDUSTRIES</span>
                                </a>
                                <div className={`mobile-nav items-center justify-between lg:flex `} id='mobile'>
                                        <p className='text-end px-4 py-2 icon' onClick={() => toggleNav()}><i className='bi bi-x text-3xl text-white w-full'></i></p>
                                    <div className="flex w-full mobile-nav-items items-center gap-[40px] text-black-400">
                                        <p className={`shrink-0 font-medium  ${currentPath === '/' ? 'text-[#0095ff] font-semibold active' : ''}`}>
                                            <Link  className="" to="/" onClick={() => toggleNav()}>
                                                Home
                                            </Link>
                                        </p>
                                        <p className={`shrink-0 font-medium  ${currentPath === '/profile' ? 'text-[#0095ff] font-semibold active' : ''}`}>
                                            <Link to="/profile" onClick={() => toggleNav()}>Profile</Link>
                                        </p>
                                        <p className={`shrink-0 font-medium ${currentPath === '/portfolio' ? 'text-[#0095ff] font-semibold active' : ''}`}>
                                            <Link to="/portfolio" onClick={() => toggleNav()}>Portfolio</Link>
                                        </p>
                                        <a
                                            href={resume}
                                            download
                                            onClick={() => toggleNav()}
                                            className="cursor-pointer rounded bg-[#0095ff] py-[6px] px-[12px] font-medium text-white drop-shadow-sm sm:bg-hero-gradient-start"
                                        >
                                            Download CV
                                        </a>
                                    </div>
                                </div>
                                <div className="block flex h-[43px] w-[43px] cursor-pointer items-center justify-center lg:hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggleNav()}
                                    >
                                        <img
                                            alt="ICON"
                                            className='img-filter'
                                            src={menu}
                                            height={43}
                                            width={43}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </nav>

        </div>
    )
}
