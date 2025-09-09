
import React from "react";

const Spinner = ({ size = "md", color = "black" }:{ size?: "sm" | "md" | "lg" ; color?:string }) => {
  const sizeClasses = {
    sm: "w-5 h-5 ",
    md: "w-8 h-8 ",
    lg: "w-10 h-10",
  };
  return (
    <div className="flex items-center justify-center h-fit my-auto">
      <div className={`${sizeClasses[size]} border-3 border-${color} border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

export default Spinner;
