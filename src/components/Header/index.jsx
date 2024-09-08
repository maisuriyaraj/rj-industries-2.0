import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import resume from '../../assets/resume/Raj-Maisuriya-Resume.pdf';
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
                                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMjAuMjIyOUM3LjEwNDU3IDIwLjIyMjkgOCAxOS4zNDMgOCAxOC4yNTc1QzggMTcuMTcyIDcuMTA0NTcgMTYuMjkyIDYgMTYuMjkyQzQuODk1NDMgMTYuMjkyIDQgMTcuMTcyIDQgMTguMjU3NUM0IDE5LjM0MyA0Ljg5NTQzIDIwLjIyMjkgNiAyMC4yMjI5WiIgZmlsbD0iIzQwQkE3NyIvPgo8cGF0aCBkPSJNMzEgMTcuMjc0OUgxMUMxMC40NDc3IDE3LjI3NDkgMTAgMTcuNzE0OSAxMCAxOC4yNTc2VjE5LjI0MDRDMTAgMTkuNzgzMSAxMC40NDc3IDIwLjIyMzEgMTEgMjAuMjIzMUgzMUMzMS41NTIzIDIwLjIyMzEgMzIgMTkuNzgzMSAzMiAxOS4yNDA0VjE4LjI1NzZDMzIgMTcuNzE0OSAzMS41NTIzIDE3LjI3NDkgMzEgMTcuMjc0OVoiIGZpbGw9IiM0MEJBNzciLz4KPHBhdGggZD0iTTMxIDI0LjE1NDNINUM0LjQ0NzcyIDI0LjE1NDMgNCAyNC41OTQzIDQgMjUuMTM3VjI2LjExOThDNCAyNi42NjI1IDQuNDQ3NzIgMjcuMTAyNSA1IDI3LjEwMjVIMzFDMzEuNTUyMyAyNy4xMDI1IDMyIDI2LjY2MjUgMzIgMjYuMTE5OFYyNS4xMzdDMzIgMjQuNTk0MyAzMS41NTIzIDI0LjE1NDMgMzEgMjQuMTU0M1oiIGZpbGw9IiM0MEJBNzciLz4KPHBhdGggZD0iTTMxIDkuNDEzMDlINUM0LjQ0NzcyIDkuNDEzMDkgNCA5Ljg1MzA3IDQgMTAuMzk1OFYxMS4zNzg2QzQgMTEuOTIxMyA0LjQ0NzcyIDEyLjM2MTMgNSAxMi4zNjEzSDMxQzMxLjU1MjMgMTIuMzYxMyAzMiAxMS45MjEzIDMyIDExLjM3ODZWMTAuMzk1OEMzMiA5Ljg1MzA3IDMxLjU1MjMgOS40MTMwOSAzMSA5LjQxMzA5WiIgZmlsbD0iIzQwQkE3NyIvPgo8L3N2Zz4K"
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
