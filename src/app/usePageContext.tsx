"use client"
import React, { useEffect, useRef, useState } from "react";

const calculateBoxes = () => {
  if (typeof window !== "undefined") {
    const boxSize = window.innerWidth / 100;
    const height = window.innerHeight;
    const rows = Math.floor(height / boxSize);
    const totalBoxes = 100 * rows;
    return new Array(totalBoxes).fill(null).map(() => ({ color: "white", active: false }));
  }
  return [];
};

const COLORS = ["#FF5733", "#FFA600", "#4CAF50", "#00A8E8", "#8B5CF6", "#FF66B2", "#A52A2A", "#FFD700" , "white"];

const usePageContext = () => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [defaultColor, setDefaultColor] = useState(COLORS[0]);
  const [isVisible,setIsVisible] = useState(false)
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const boxesState = useRef(calculateBoxes());
  const isSelecting = useRef(false);
  const needsUpdate = useRef(false);
  
  
  const updateUI = () => {
    if (!needsUpdate.current) return;
    needsUpdate.current = false;
    boxesRef.current.forEach((box, index) => {
      if (box) {
        box.style.backgroundColor = boxesState.current[index].color;
      }
    });
  };

  const toggleColor = (index: number) => {
    if (boxesState.current[index]) {
      
        boxesState.current[index].active = true;
        boxesState.current[index].color = defaultColor;
        needsUpdate.current = true;

      requestAnimationFrame(updateUI);
    }
  };

  const handleMouseDown = (event: React.MouseEvent, index: number) => {
    if (event.button !== 0) return;
    hanldeMenuClose()
    isSelecting.current = true;
    if(boxesState.current[index].active === true && boxesState.current[index].color === defaultColor)
      {
        boxesState.current[index].color = "white";
        boxesState.current[index].active = false;
        needsUpdate.current = true;
        requestAnimationFrame(updateUI);
      }
      else toggleColor(index);
    
  };

  const handleMouseUp = () => {
    isSelecting.current = false;
  };

  const handleMouseEnter = (index: number) => {
    if (isSelecting.current) {
      toggleColor(index);
    }
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
    setTimeout(() => setIsVisible(true), 10);
  };

  const handleMenu = (index: number) => {
    setDefaultColor(COLORS[index]);
    hanldeMenuClose()
  };

  const hanldeMenuClose = () => {
    setIsVisible(false)
    setTimeout(() => setContextMenu(null), 10);
  }

  useEffect(() => {
    boxesState.current = calculateBoxes();
    needsUpdate.current = true;
    requestAnimationFrame(updateUI);
  }, []);

  return {
    COLORS,
    handleMouseDown,
    handleMouseEnter,
    handleRightClick,
    handleMenu,
    contextMenu,
    boxesState,
    boxesRef,
    handleMouseUp,
    isVisible,
    hanldeMenuClose,
    defaultColor
  }
}

export { usePageContext };