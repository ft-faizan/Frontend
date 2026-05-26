// 'use client';

// import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
// import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

// function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {
//   const ref = useRef(null);
//   const isHovered = useMotionValue(0);

//   const mouseDistance = useTransform(mouseX, val => {
//     const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
//     return val - rect.x - baseItemSize / 2;
//   });

//   const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
//   const size = useSpring(targetSize, spring);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ width: size, height: size }}
//       onHoverStart={() => isHovered.set(1)}
//       onHoverEnd={() => isHovered.set(0)}
//       onFocus={() => isHovered.set(1)}
//       onBlur={() => isHovered.set(0)}
//       onClick={onClick}
//       className={`relative inline-flex items-center justify-center rounded-full bg-[#120F17] border-neutral-700 border-2 shadow-md ${className}`}
//       tabIndex={0}
//       role="button"
//       aria-haspopup="true"
//     >
//       {Children.map(children, child => cloneElement(child, { isHovered }))}
//     </motion.div>
//   );
// }

// function DockLabel({ children, className = '', ...rest }) {
//   const { isHovered } = rest;
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const unsubscribe = isHovered.on('change', latest => setIsVisible(latest === 1));
//     return () => unsubscribe();
//   }, [isHovered]);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 0, y: 0 }}
//           animate={{ opacity: 1, y: -10 }}
//           exit={{ opacity: 0, y: 0 }}
//           transition={{ duration: 0.2 }}
//           className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#120F17] px-2 py-0.5 text-xs text-white`}
//           role="tooltip"
//           style={{ x: '-50%' }}
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// function DockIcon({ children, className = '' }) {
//   return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
// }

// export default function Dock({
//   items,
//   className = '',
//   spring = { mass: 0.1, stiffness: 150, damping: 12 },
//   magnification = 70,
//   distance = 200,
//   panelHeight = 64,
//   dockHeight = 256,
//   baseItemSize = 50,
// }) {
//   const mouseX = useMotionValue(Infinity);
//   const isHovered = useMotionValue(0);

//   const maxHeight = useMemo(
//     () => Math.max(dockHeight, magnification + magnification / 2 + 4),
//     [magnification, dockHeight]
//   );
//   const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
//   const height = useSpring(heightRow, spring);

//   return (
//     <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
//       <motion.div
//         onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
//         onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
//         className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border-2 pb-2 px-4`}
//         style={{ height: panelHeight }}
//         role="toolbar"
//         aria-label="Application dock"
//       >
//         {items.map((item, index) => (
//           <DockItem
//             key={index}
//             onClick={item.onClick}
//             className={item.className}
//             mouseX={mouseX}
//             spring={spring}
//             distance={distance}
//             magnification={magnification}
//             baseItemSize={baseItemSize}
//           >
//             <DockIcon>{item.icon}</DockIcon>
//             <DockLabel>{item.label}</DockLabel>
//           </DockItem>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }







'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref       = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={()  => isHovered.set(0)}
      onFocus={()     => isHovered.set(1)}
      onBlur={()      => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden cursor-pointer ${className}`}
      tabIndex={0}
      role="button"
    >
      {Children.map(children, (child) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = isHovered.on('change', (v) => setIsVisible(v === 1));
    return () => unsub();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.92 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.92 }}
          transition={{ duration: 0.15 }}
          className={`${className} absolute -top-8 left-1/2 w-fit whitespace-pre rounded-lg border border-[#2a2d3a] bg-[#0f1117]/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xl`}
          style={{ x: '-50%' }}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className         = '',
  spring            = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification     = 66,
  distance          = 140,
  panelHeight       = 68,
  dockHeight        = 256,
  baseItemSize      = 52,
}) {
  const mouseX   = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height    = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className="flex w-full max-w-full items-end justify-center"
    >
      <motion.div
        onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
        onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
        className={`${className} flex items-end gap-3 rounded-2xl border border-[#D6E1FD] bg-[#FFFFFF]/80 backdrop-blur-xl px-4 pb-2 shadow-2xl`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Recent tools dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}