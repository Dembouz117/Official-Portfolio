import React, { useState, useEffect, useRef } from 'react';

import styles from "../styles/About.module.css";
import ShineCard from './ShineCard';

import { MdMouse } from "react-icons/md";
import { motion, useScroll, useSpring } from "framer-motion";

const AboutMe = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const aboutModalRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    container: aboutModalRef,
  });
  const scaleX = useSpring(scrollYProgress,{
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setTimeout(()=>setFadeIn(true), 250);
  },[]);
  
  return (
    <ShineCard className={`bg-blue-300 relative text-white w-full h-auto mt-12 rounded-3xl overflow-hidden space-y-6 p-4 transition-transform ${fadeIn?"scale-100":"scale-0"} ease-out duration-3000`}>

      <div className="text-white font-bungee text-6xl font-bold">
        About Me
      </div>

      <div className = "inline-block w-max relative">
      <motion.div
          className={`bg-red-200 h-2 ${styles["progress-bar"]} w-[40rem]`}
          style={{ scaleX: scaleX }}
        />
        <div className="overflow-auto border-r-2 border-r-white text-lg w-[40rem] h-[12rem] text-white font-light scrollbar-hide" ref={aboutModalRef} >
          <div className="relative">
            I am a versatile <span className="text-red-300">Computer Science undergraduate</span> at Singapore Management University, driven by a commitment to excellence and a passion for collaboration. Currently pursuing a Bachelors&#39; as an Asean Undergraduate Scholarship Recipient, I am on track for <span className="text-red-300">Magna Cum Laude</span> and remain dedicated to balancing both my personal learning and school.

            <br/><br/>As a former <span className="text-red-300">Frontend Developer</span> at L3velUp Labs - a friend&#39;s startup, I received the pleasure of working with an amazing team and learning much from more seasoned developers within a team. I led the development of a concert seat selector using NEXT.JS and TailwindCSS and integrated Stripe for custom checkout flows involving different services. I also led the migration of the app-wide state management to Jotai.

            <br/><br/>I have also had the pleasure of being awarded the <span className="text-red-300">CS203 Outstanding Project Award</span>  for TicketPulse, a performant concert ticket booking platform in recognition for the best software engineering project in the cohort and for dutifully enforcing software engineering fundamentals. By exploring gRPC for the underlying micro service architecture for the platform’s backend, we managed to drive the performance up by a significant amount.

            <br/><br/>I've showcased good perseverance and a keen collaborative spirit in my stint as a <span className="text-red-300">Research and Development trainee</span> at SoftServe, where I explored the implementation of Quantum algorithms in NISQ-era devices. Despite being not even having taken important fundamental courses such as Linear Algebra, I relished the challenge. I picked up the concepts in quick time and conveyed complex ideas with the help of my peers, enabling us to deliver a successful capstone project together at the end of the term.
            I am always keen to take up new technologies on the go, and learning from others!
            <br/><br/>
            Currently, I&#39;m learning ThreeJs to create 3D websites to leverage browsers&#39; increasing WebGL compatabilities to deliver better web experiences. This portfolio website is the first step in this journey!
            </div>
        </div>
        <div className="text-white font-bungee font-extralight mt-6 flex items-center space-x-2 w-auto h-auto">
            <div>Scroll</div>
            <MdMouse className="animate-shake"/>
        </div>

      </div>

    </ShineCard>
  );
};

export default AboutMe;