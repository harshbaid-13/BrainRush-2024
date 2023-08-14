import React from "react";
import { motion } from "framer-motion";

const Toast = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -20 }}
      className="bg-gray-500 text-red rounded-md fixed bottom-0 left-0 right-0 flex justify-center items-center p-4"
    >
      <div className="text-red">{message}</div>
    </motion.div>
  );
};

export default Toast;
