import React from "react";
import styles from "../styles/ShineCard.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

interface ShineCardProps{
    className?: String | string,
    children?: React.ReactNode
}

const ShineCard = ({className, children}: ShineCardProps) => {
  return (
    <div className={`${className ?? ""} ${styles["custom-shine"]}`}>{children}</div>
  )
}

export default ShineCard