import React, { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  className?: string;
  top?: number;
  left?: number;
}

const Stack: React.FC<StackProps> = ({
  children,
  className = "",
  top = 10,
  left = 10,
}) => {
  return (
    <div className={`stack relative ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="absolute w-full transition-all duration-300 ease-in-out"
          style={{
            top: `${index * top}px`,
            left: `${index * left}px`,
            zIndex: index,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Stack;
