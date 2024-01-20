import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import About from "./About";
import RadialMenu from "./RadialMenu";
import SkillsDescription from "./SkillsDescription";

import { selectSkillAtom } from "../store/index";


interface skillsInterface{
  skillName: string;
  skills: string[];
}

const Section= (props) => {
  const { children, className } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center relative 
  ${className?className:""}`}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section className="right-[4rem]">
      <h1 className="text-6xl font-extrabold leading-snug font-bungee">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic font-bungee">Fadhel</span>
      </h1>
      <motion.div
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        <About/>
      </motion.div>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 40,
  },
  {
    title: "React / React Native",
    level: 80,
  },
  {
    title: "NodeJS/Express",
    level: 70,
  },
  {
    title: "Typescript",
    level: 70,
  },
];
const languages = [

  {
    title: "🇺🇸 English",
    level: 100,
  },
  {
    title: "🇮🇩 Bahasa Indonesia",
    level: 100,
  },
  {
    title: "🇯🇵 Japanese",
    level: 20,
  },
];

const additionalSkills: skillsInterface[] = [
  {
    skillName: "Languages",
    skills:["Java", "TypeScript", "JavScript", "Python", "C", "GoLang"]
  },
  {
    skillName: "Frameworks",
    skills:["React", "Next.Js", "Express", "Node", "React Native"]
  },
  {
    skillName: "Technologies",
    skills:["MongoDB", "SQL", "Redis", "Prisma", "gRPC", "Stripe", "System Design", "FireBase", "ThreeJs", "Networking", "pyTorch", "sciKit", "AWS", "Firebase Cloud Functions", "Docker"]
  },
  {
    skillName:"Communication",
    skills:["People Skills", "Teamwork"]
  }
];

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useAtom(selectSkillAtom);
  const [selectedDescription, setSelectedDescription] = useState<skillsInterface>({
    skillName:"Technologies", skills:["MongoDB", "SQL", "Redis", "Prisma", "gRPC", "Stripe", "System Design", "FireBase", "ThreeJs", "Networking", "pyTorch", "sciKit", "Qiskit", "HTML", "CSS"]
  });

  const skillSelectorHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataSkill = e.currentTarget.dataset.skill;
    setSelectedSkill(dataSkill!);
    const matchedSkillDescription = additionalSkills.find(skill => skill.skillName===dataSkill);
    setSelectedDescription(matchedSkillDescription!);
  }

  return (
    <Section>
      <div className="flex justify-between w-full">
        <RadialMenu>
        {additionalSkills.map(skill => {
            const matchedSkillName = selectedSkill === skill.skillName;
            return(
              <button className={` ${matchedSkillName?"bg-red-200": "bg-gray-700"} text-bungee rounded-full px-6 py-2 transform transition-transform duration-300 hover:scale-110`} data-skill={skill.skillName} onClick={skillSelectorHandler} key={skill.skillName}>{skill.skillName}</button>
            )
          })}
        </RadialMenu>
        <SkillsDescription skillName={selectedDescription.skillName} skillList={selectedDescription.skills} className="z-[-2] top-[5rem] relative"/>
      </div>

    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section className="relative top-[6rem]">
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-5xl font-bold">Projects</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section>
      <h2 className="text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white w-96 max-w-full">
        <form>
          <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <label
            htmlFor="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <label
            htmlFor="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <button className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
};
