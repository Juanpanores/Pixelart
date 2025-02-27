"use client"
import React from "react";
import "./page.styles.css";
import { usePageContext } from "./usePageContext";

const BoxesGrid: React.FC = () => {
  const {
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
  } = usePageContext();



  return (
    <div className="page__grid">
      <link rel="shortcut icon" href="/icon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      {contextMenu && (
        <div
          className="page__context-menu"
          style={{
            top: contextMenu.y -5,
            left: contextMenu.x -5,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.9)",
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            }}
          onContextMenu={(e) => {e.preventDefault()}}
          onMouseLeave={hanldeMenuClose}
        >
          {COLORS.map((color, index) => (
            <div
              key={index}
              className="page__context-menu__option "
              style={{ "--color": color, border: color === defaultColor ? "3px solid black": "1px solid black" } as React.CSSProperties}
              onClick={() => handleMenu(index)}
              data-color
            />
          ))}
        </div>
      )}
      {boxesState.current.map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) boxesRef.current[index] = el;
          }}
          className="page__box"
          onMouseUp={handleMouseUp}
          onMouseDown={(event) => handleMouseDown(event,index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onContextMenu={(event) => handleRightClick(event)}
        />
      ))}
    </div>
  );
};

export default BoxesGrid;
