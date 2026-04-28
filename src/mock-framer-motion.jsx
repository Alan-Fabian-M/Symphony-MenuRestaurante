import React from 'react';

// Mock framer-motion since we are running offline
const createMotionComponent = (Tag) => React.forwardRef((props, ref) => {
  const { initial, animate, transition, whileInView, viewport, whileHover, variants, ...rest } = props;
  
  // Basic translation of some framer-motion props to style/className if needed, 
  // but mostly just passing rest props down so it doesn't crash.
  return <Tag ref={ref} {...rest} />;
});

export const motion = new Proxy({}, {
  get: (_, prop) => createMotionComponent(prop)
});

export const AnimatePresence = ({ children }) => <>{children}</>;
