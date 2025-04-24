// src/components/AlertModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AlertModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  const modalStyle = {
    backgroundColor: "white",
    padding: "clamp(20px, 4vw, 30px)",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    zIndex: 1000,
    width: "min(90%, 500px)",
    maxHeight: "90vh",
    overflowY: "auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 999,
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonStyle = {
    padding: "clamp(10px, 2vw, 12px) clamp(20px, 4vw, 24px)",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "clamp(14px, 2vw, 16px)",
    transition: "all 0.3s ease",
    width: "fit-content",
  };

  const titleStyle = {
    color: "#333",
    marginBottom: "clamp(15px, 3vw, 20px)",
    fontSize: "clamp(20px, 4vw, 24px)",
    width: "100%",
  };

  const textStyle = {
    color: "#666",
    lineHeight: "1.5",
    fontSize: "clamp(14px, 2vw, 16px)",
    marginBottom: "clamp(8px, 2vw, 10px)",
    width: "100%",
    padding: "0 clamp(10px, 2vw, 20px)",
  };

  const iconContainerStyle = {
    fontSize: "clamp(24px, 5vw, 32px)",
    marginBottom: "clamp(10px, 2vw, 15px)",
    display: "inline-block",
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={overlayStyle}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
        >
          <motion.div
            style={modalStyle}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              style={iconContainerStyle}
              variants={iconVariants}
              initial="initial"
              animate="animate"
            >
              🚧
            </motion.div>
            <motion.h2 style={titleStyle}>Website Under Construction</motion.h2>
            <motion.p style={textStyle}>
              Welcome to Roots of Renewal BATA! We are currently in active
              development.
            </motion.p>
            <motion.p style={textStyle}>
              The content and layout may be updated as we continue to enhance
              your experience.
            </motion.p>
            <motion.button
              style={buttonStyle}
              onClick={() => setIsVisible(false)}
              whileHover={{ scale: 1.05, backgroundColor: "#45a049" }}
              whileTap={{ scale: 0.95 }}
            >
              I Understand
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
