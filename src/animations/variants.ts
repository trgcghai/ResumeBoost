// Common animation configs
const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  duration: 0.5,
  delay: 0.2,
};

const springHover = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

// Base variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: springTransition,
  },
};

export const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

// Card variants
export const cardVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
  hover: {
    scale: 1.03,
    y: -5,
    transition: springHover,
  },
};

// Image variants
export const imageVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
    rotate: -5
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: springTransition,
  },
  hover: {
    scale: 1.05,
    rotate: 3,
    transition: springHover,
  }
};

// Team section variants
export const teamContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

export const teamMemberVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      delayChildren: 0.3,
      staggerChildren: 0.15,
    }
  },
  hover: {
    y: -5,
    transition: springHover,
  }
};

// Icon variants
export const iconVariants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: springTransition,
  },
  hover: {
    scale: 1.1,
    rotate: 10,
    transition: springHover,
  }
};

// Button variants
export const buttonVariants = {
  hover: {
    scale: 1.03,
    transition: springHover,
  },
  tap: {
    scale: 0.97,
  },
}; 