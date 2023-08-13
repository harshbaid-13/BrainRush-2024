import React from "react";
import { motion } from "framer-motion";

const Toast = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-0 left-0 right-0 flex justify-center items-center p-4"
    >
      <div className="bg-green-500 text-white p-2 rounded-md">{message}</div>
    </motion.div>
  );
};

export default Toast;
