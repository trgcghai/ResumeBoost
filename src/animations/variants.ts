// Common animation configs
const springTransition = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  duration: 0.7,
  mass: 0.8
};

const springHover = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

// Scroll reveal transition
const scrollRevealTransition = {
  type: "spring",
  duration: 1,
  bounce: 0.2,
  stiffness: 40,
  damping: 20
};

// Base variants
export const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...scrollRevealTransition,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 40,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

export const textVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      duration: 0.5
    }
  },
};

// Card variants
export const cardVariants = {
  hidden: { 
    scale: 0.95,
    opacity: 0,
    y: 30
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      ...springTransition,
      duration: 0.6
    }
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
    scale: 0.9,
    opacity: 0,
    y: 30,
    rotate: -3
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      ...springTransition,
      duration: 0.6
    }
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: springHover,
  }
};

// Team section variants
export const teamContainerVariants = {
  hidden: { 
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...scrollRevealTransition,
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

export const teamMemberVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    }
  },
  hover: {
    y: -5,
    transition: springHover,
  }
};

// Icon variants
export const iconVariants = {
  hidden: { 
    scale: 0,
    y: 15,
    rotate: -45
  },
  visible: {
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      ...springTransition,
      duration: 0.4
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: springHover,
  }
};

// Button variants
export const buttonVariants = {
  hover: {
    scale: 1.03,
    y: -2,
    transition: springHover,
  },
  tap: {
    scale: 0.97,
  },
}; 