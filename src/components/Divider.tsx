import React from "react";

interface DividerProps {
  thickness?: string;
  color?: string;
}

const Divider: React.FC<DividerProps> = ({
  thickness = "1px",
  color = "gray-300",
}) => {
  return (
    <hr
      className={`border-${color} my-4`}
      style={{ borderTopWidth: thickness }}
    />
  );
};

export default Divider;
