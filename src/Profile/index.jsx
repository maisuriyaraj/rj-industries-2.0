import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import vnagu from '../assets/images/vnagu.png';
import react from '../assets/images/react.svg';
import angular from '../assets/images/angular.svg';
import node from '../assets/images/node.svg';
import express from '../assets/images/express.svg';
import mongo from '../assets/images/mongo.svg';
import nextJS from '../assets/images/next.svg';
import html from '../assets/images/html.png';
import css from '../assets/images/css.png';
import tailwind from '../assets/images/tailwindcss.svg';
import bootstrap from '../assets/images/bootstrap.svg';
import constantsys from '../assets/images/constantsys_logo.jpeg';
import myProfile from '../assets/images/me.webp';

export default function Profile() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    let skills = [
        {
            img: html,
            name: 'Html'
        },
        {
            img: css,
            name: 'css'
        },
        {
            img: tailwind,
            name: 'Tailwind'
        },
        {
            img: bootstrap,
            name: 'Bootstrap'
        },
        {
            img: react,
            name: 'React'
        },
        {
            img: angular,
            name: 'Angular'
        },
        {
            img: nextJS,
            name: 'NextJS'
        },
        {
            img: node,
            name: 'Nodejs'
        },
        {
            img: express,
            name: 'Express'
        },
        {
            img: mongo,
            name: 'MongoDB'
        }
    ]
    return (
        <div style={{ maxWidth: 1536, margin: "auto", width: "100%" }}>
            <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row justify-center items-start p-4 md:p-6">
                {/* Left Section: Main Profile */}
                <div className="bg-white rounded-lg shadow-lg w-full md:w-3/4 mb-4 md:mb-0 md:mr-6" >
                    {/* Banner Section */}
                    <div className="relative">
                        {/* <img
                            src="https://via.placeholder.com/800x200" // Placeholder for Banner Image
                            alt="Banner"
                            className="w-full h-32 md:h-48 object-cover rounded-t-lg"
                        /> */}
                        {/* <div className="absolute -bottom-12 left-8">
                            <img
                                src={me} // Placeholder for Profile Picture
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white"
                            />
                        </div> */}
                    </div>

                    {/* Profile Info Section */}
                    <div className="p-4 md:p-6">
                        <div className="flex flex-col">
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">Raj Maisuriya</h2>
                                <p className="text-gray-500 text-sm"><i className="bi bi-geo-fill text-red-600 text-xl"></i>Surat, Gujarat, India</p>
                                <p className="text-gray-600 text-sm">React JS | Angular | Next JS | Node JS Developer</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg w-full md:w-1/4 p-4">
                                <img src={myProfile} className='object-cover' alt="" />
                            </div>

                        </div>
                    </div>

                    {/* Education Info Section */}
                    <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">Education</h2>
                                <div className="mt-4 flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
                                    {/* University Logo */}
                                    <img
                                        src={vnagu}
                                        alt="VNSGU Logo"
                                        className="w-16 h-16 object-contain"
                                    />

                                    {/* University and Course Info */}
                                    <div>
                                        <h2 className="text-sm font-bold text-gray-800">
                                            Veer Narmad South Gujarat University, Surat
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Bachelor of Computer Application (B.C.A)
                                        </p>
                                        <p className="text-sm text-gray-600">2021 - 2024</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Skills Info Section */}
                    <div className="p-4 md:p-6">
                        <div className="w-full lg:w-[70%]">
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">Skills</h2>
                                <div className="grid grid-cols-3 gap-y-[3rem] gap-x-[3rem] py-[24px] md:grid-cols-4 md:gap-y-[5rem]">
                                    {skills.map((x, i) => (<div className="flex items-center justify-center" key={i}>
                                        <div className="h-[40px] w-[40px] md:h-[70px] md:w-[70px]">
                                            <img
                                                src={x.img}
                                                alt={x.name}
                                                className='p-[2px] rounded-lg bg-[#0095ff0f]'
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                    // border:'2px solid #0095ff'
                                                }}
                                            />
                                            <div className="flex justify-center">
                                                <p className="mt-[5px] text-sm font-semibold text-secondary">{x.name}</p>
                                            </div>
                                        </div>
                                    </div>))}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Experience Info Section */}
                    <div className="p-4 md:p-6">
                        <div className="w-full lg:w-[50%]">
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">Experience</h2>
                                <div className="mt-4 flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
                                    {/* University Logo */}
                                    <img
                                        src={constantsys}
                                        alt="Company Logo"
                                        className="w-16 h-16 object-contain"
                                    />

                                    {/* University and Course Info */}
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">
                                            Jr. Software Engineer
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Constantsys
                                        </p>
                                        <p className="text-sm text-gray-600">May-2023 - Present . 1 yr 5 mos</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        <div className="w-full">
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">Description</h2>
                                <div className="rounded-lg max-w-4xl mx-0 mt-8">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                        Raj - Full Stack Developer
                                    </h1>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        Technologies in I can work on:
                                    </h2>
                                    <ul className="list-disc list-inside text-gray-600 mb-6">
                                        <li>
                                            <strong>Front End Development:</strong> React, Next.js, HTML, CSS,
                                            Bootstrap, Hooks, Redux, Styled Components, jQuery, Bootstrap, Material
                                            UI, Socket.io, Tailwind CSS .
                                        </li>
                                        <li>
                                            <strong>Back End Development:</strong> Node.js, Express, MVC, MongoDB,
                                            MySQL
                                        </li>
                                        <li>
                                            <strong>Programming Expertise:</strong>Node.js, React, TypeScript,
                                            JavaScript, MongoDB
                                        </li>
                                    </ul>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        Additional Skills:
                                    </h2>
                                    <ul className="list-disc list-inside text-gray-600 mb-6">
                                        <li>Git (Active open-source contributor)</li>
                                        <li>Hosting with Vercel and Render</li>
                                        {/* <li>Version Control via GitHub/GitLab</li> */}
                                    </ul>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Why Hire Me?</h2>
                                    <ul className="list-disc list-inside text-gray-600 mb-6">
                                        <li>Ready to work for 40 Hours Per Week.</li>
                                        <li>Daily Update on your Project.</li>
                                        <li>Meeting Deadline Efficiently.</li>
                                    </ul>
                                    <p className="text-gray-600">
                                        I am Providing Services on Front-End Development, Website, Responsive Design, ReactJS, Next.js,
                                        TypeScript, HTML5, CSS3, SCSS, Bootstrap, Material-UI, JavaScript, Tailwind
                                        CSS, Redux, React Bootstrap, Website Redesign, Web Application, E-commerce
                                        Website, Back-End Development, MERN stack, MongoDB, Express.js, React.js,
                                        Node.js, Next.js, API Design, SQL, .
                                    </p>
                                    <p className="text-gray-800 font-bold mt-8">Warm Regards,</p>
                                    <p className="text-gray-800 font-bold">Raj Maisuriya</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Side Info */}
                <div className="bg-white rounded-lg shadow-lg w-full md:w-1/4 p-4">
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">Communication languages</h3>
                        <p className="text-gray-500 text-sm">English and Hindi</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">LinkedIn profile & URL</h3>
                        <a href="https://www.linkedin.com/in/raj-maisuriya-671274237" className="text-blue-600 text-sm">
                            www.linkedin.com/in/raj-maisuriya-671274237
                        </a>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">Twitter profile & URL</h3>
                        <a href="https://x.com/Rj8703" className="text-blue-600 text-sm">
                            https://x.com/Rj8703
                        </a>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">Github</h3>
                        <a href="https://github.com/maisuriyaraj" className="text-blue-600 text-sm">
                            https://github.com/maisuriyaraj
                        </a>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">My Youtube</h3>
                        <a href="https://www.youtube.com/@111_MaisuriyaRaj" className="text-blue-600 text-sm">
                            https://www.youtube.com/@111_MaisuriyaRaj
                        </a>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">Email</h3>
                        <a href="mailto:maisuriyaraj664@gmail.com" className="text-blue-600 text-sm">
                            maisuriyaraj664@gmail.com
                        </a>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold text-sm md:text-base">Contact</h3>
                        <a href="tel:+91 7623870030" className="text-blue-600 text-sm">
                            +91 76238 70030
                        </a>
                    </div>
                    <div className='mb-4'>
                        <Link
                            to={'/portfolio'}
                            className="w-full cursor-pointer rounded bg-[#0095ff] py-[10px] px-[12px] font-medium text-white drop-shadow-sm sm:bg-hero-gradient-start"
                        >
                            Portfolio Projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}