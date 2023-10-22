import React from "react";
import "./Dropdown.css";

const DropdownCard = ({ item, index, isSelected, updateSelection }) => {
  return (
    <div
      key={index}
      className={isSelected ? "dropdownItem selectedItem" : "dropdownItem"}
      onClick={() => {
        updateSelection(index);
      }}
    >
      {item}
    </div>
  );
};

export default DropdownCard;
