import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import bungeeFont from '../fonts/Bungee-Regular.ttf';
extend({ TextGeometry })
const ThreeDText = () => {


  const bungee = new FontLoader().parse(bungeeFont)
  console.log('helvetiker regular ->', bungee);

  const textOptions = {
    font: bungee,
    size: 5,
    height: 1,
  }
  
  return(
    <mesh position={[0,4,0]} rotation={[0, 0, 0]}>
      <textGeometry attach='geometry' args={["three.js", textOptions]}/>
      <meshLambertMaterial attach='material' color={'gold'}/>
    </mesh>
  )

}

export const projects = [
  {
    title: "TicketPulse",
    url: "https://r3f-wawatmos-final.vercel.app/",
    image: "projects/wawatmos.jpg",
    description: "Performant Ticket Application using Microservice and gRPC",
  },

  {
    title: "QNN",
    url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
    image: "projects/avatar.jpg",
    description: "Prediction of Asian Options pricing using a hybrid quantum-classical neural network for DBS",
  },
  {
    title: "ConnectMe",
    url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
    image: "projects/kanagame.jpg",
    description: "A mobile application to encourage members of the community to bond. Built with React Native, Express and Firestore",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.2);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.2);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[4.4, 4]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[4, 2.4, 2]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={4}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-2, -1.2, 0]}
        className="font-bungee"
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-2, -1.4, 0]}
      >
        {project.description}
      </Text>
      
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 4,
            y: currentProject === index ? 0 : -0.4,
            z: currentProject === index ? -2 : -5,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
