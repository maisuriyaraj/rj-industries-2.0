import React, { useEffect } from 'react';
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
import TechStack from '../components/techStack';
import QL from '../assets/portfolioVideos/QuickLending.mp4';
import GL from '../assets/portfolioVideos/Glozic.mp4';
import GC from '../assets/portfolioVideos/graphCommunity.mp4';
import ECOm from '../assets/portfolioVideos/e-commerce.mp4';
import movie from '../assets/portfolioVideos/movie_ticket_booking.mp4';
import MF from '../assets/portfolioVideos/finance_website.mp4';
import CHAT from '../assets/portfolioVideos/chat-3.mp4';


export default function Portfolio() {

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);
    const projects = [
        {
            name: "QuickLending",
            video: QL,
            techs: [angular, bootstrap],
            description: "Quicklending is a USA based Finance Company that Provides Loans to their customers. All the Process of Loan is Completely Online. QuickLending Frontend is handled by me.",
            projectLink: "https://www.quicklending.com/",
            // productionUrl : "https://www.quicklending.com/"
        },
        {
            name: "Glozic",
            video: GL,
            techs: [react, bootstrap],
            description: "Glozic is the Platform where their user can make their own website with the minimal lines of code. It is Advance Project that based on Low code No code Concept.",
            projectLink: ""
        },
        {
            name: "Graph Community",
            video: GC,
            techs: [nextJS, tailwind, node, mongo, express],
            description: "This Project is my personal project like stackoverflow."
        },
        {
            name: "E-Commarce Project",
            video: ECOm,
            techs: [angular, bootstrap],
            description: "It is E-Commarce Project and Frontend handled by me."
        },
        {
            name: "Real time Chat Application",
            video: CHAT,
            techs: [react,tailwind, node,express],
            description:"This is My New MERN Project which allows User to chat with another user at real time and also allows to transfer money online .. (Not Original Bank account )."
        },
        {
            name: 'Movie Ticket Booking System',
            video: movie,
            techs: [angular, node, express, mongo],
            description: "It is My Collage Project During BCA."
        },
        {
            name: 'Muthoot Finance Clone Design',
            video: MF,
            techs: [html, css,bootstrap],
            description:"Muthoot Finance Website Clone Design With simple Html ,css ,javascript and Bootstrap"
        }
    ]
    return (
        <div>
            <div style={{ maxWidth: 1536, margin: "auto", width: "100%" }}>
                {projects.map((x) => (
                    <div className="p-8 bg-gray-50 " key={x.name}>
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
                            {/* Left - Image Section */}
                            <div className="flex-shrink-0 w-full md:w-1/2">
                                {/* <img src="path/to/app-screenshot.png" alt="Law Pocket App" className="rounded-xl shadow-lg" /> */}
                                <video src={x.video} controls className="rounded-xl shadow-lg"></video>
                            </div>

                            {/* Right - Content Section */}
                            <div className="w-full md:w-1/2 space-y-8">
                                {/* Title and Description */}
                                <section className="text-center md:text-left">
                                    <h1 className="text-4xl font-bold text-gray-800">{x.name}</h1>
                                    <p className="text-gray-700 mt-4">
                                        {x.description}
                                    </p>
                                </section>

                                {/* Tech Stack */}
                                <div className='w-full lg:w-[50%]'>
                                    <TechStack skills={x.techs} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
