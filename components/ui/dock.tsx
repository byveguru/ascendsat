// @ts-nocheck
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

const DockContext = createContext(null);

function DockProvider({ children, value }) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("useDock must be used within a DockProvider");
  }
  return context;
}

export function Dock({
  children,
  className,
  isLight = false,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4);
  }, [magnification]);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  const outerStyle = {
    height,
    scrollbarWidth: "none",
    display: "flex",
    maxWidth: "100%",
    alignItems: "flex-end",
    overflowX: "auto",
    marginLeft: 8,
    marginRight: 8,
  };
  const innerStyle = {
    height: panelHeight,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    width: "fit-content",
    gap: 16,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "flex-end",
    background: "transparent",
  };

  return (
    <motion.div style={outerStyle} className={className}>
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        style={innerStyle}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

export function DockItem({ children, className, onClick, isActive = false, isLight = false }) {
  const ref = useRef(null);
  const { distance, magnification, mouseX, spring } = useDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect?.() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthTransform, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={cn(className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child, { width, isHovered, isLight, isActive })
      )}
    </motion.div>
  );
}

export function DockLabel({ children, className, ...rest }) {
  const isHovered = rest.isHovered;
  const isLight = rest.isLight;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered?.on) return undefined;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  const labelStyle = {
    position: "absolute",
    top: -24,
    left: "50%",
    width: "fit-content",
    whiteSpace: "pre",
    borderRadius: 6,
    border: isLight ? "1px solid #e5e7eb" : "1px solid #262626",
    backgroundColor: isLight ? "#f3f4f6" : "#262626",
    color: isLight ? "#404040" : "#ffffff",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 12,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, x: "-50%" }}
          animate={{ opacity: 1, y: -10, x: "-50%" }}
          exit={{ opacity: 0, y: 0, x: "-50%" }}
          transition={{ duration: 0.2 }}
          style={labelStyle}
          className={cn(className)}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DockIcon({ children, className, ...rest }) {
  const width = rest.width;
  const isActive = rest.isActive;
  const isLight = rest.isLight;
  const widthTransform = useTransform(width, (val) => val / 2);
  const color = isActive
    ? (isLight ? "#c86a4b" : "#f5c518")
    : (isLight ? "#525252" : "#d4d4d4");

  return (
    <motion.div
      style={{
        width: widthTransform,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { DOCK_HEIGHT };
