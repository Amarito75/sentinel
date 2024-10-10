"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const FramerWrapper = ({ children }: any) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
