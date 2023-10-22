import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
import dropdownLogo from "./assets/react.svg";
import DropdownCard from "./DropdownCard";

const Dropdown = ({ data, multi_select }) => {
  const [showDropdown, setShowDropdown] = useState(false); //tracks when dropdown is shown or not
  const [selectedIndices, setSelectedIndices] = useState([]); //tracks which options are selected
  const [text, setText] = useState(""); //allows the selected options to be visible

  const ref = useRef(); //ref to ensure components don't cross-communicate (since I used querySelector)

  const deselectAll = () => {
    const selectedItems = ref.current.querySelectorAll(".selectedItem");

    selectedItems.forEach((element) => {
      element.classList.remove("selectedItem");
    });
    setSelectedIndices([]);
  };

  const selectAll = () => {
    const allItems = ref.current.querySelectorAll(".dropdownItem");

    let allIndices = [];
    allItems.forEach((element) => {
      element.classList.add("selectedItem");
    });

    setSelectedIndices(
      Array.from(
        { length: ref.current.querySelectorAll(".dropdownItem").length },
        (_, i) => i + 1
      )
    );
  };

  //update text when component changes
  useEffect(() => {
    let str = "";
    const currentSelectedItems = ref.current.querySelectorAll(".selectedItem");
    for (let item of currentSelectedItems) {
      str += item.innerText + ", ";
    }
    str = str.slice(0, -2); //remove comma from last element
    setText(str);
  });

  const updateSelection = (item) => {
    //multi-select can only have one selected at a time.
    if (!multi_select) {
      if (item == selectedIndices[0]) {
        //remove single-select
        setSelectedIndices([]);
      } else {
        setSelectedIndices([item]);
      }
    } else {
      if (selectedIndices.includes(item)) {
        //user clicked on an already-selected item, so remove it
        setSelectedIndices(selectedIndices.filter((id) => id !== item));
      } else {
        //otherwise add it
        setSelectedIndices([...selectedIndices, item]);
      }
    }
  };

  return (
    <div className="container" ref={ref}>
      <div className="dropdownMenu">
        <button
          id="search"
          className={showDropdown ? "active" : ""}
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <span> {text} </span>
          <img
            src={dropdownLogo}
            className={showDropdown ? "dropdownLogo invert" : "dropdownLogo"}
            alt="Dropdown Logo"
          />
        </button>
      </div>

      {multi_select ? (
        <div>
          <button
            id="selectDeselect"
            onClick={() => {
              selectAll();
            }}
          >
            Select All
          </button>

          <button
            id="selectDeselect"
            onClick={() => {
              deselectAll();
            }}
          >
            De-select All
          </button>
        </div>
      ) : null}

      <div
        className={showDropdown ? "dropdownList" : "dropdownList hiddenList"}
      >
        {data.map((item, index) => (
          <DropdownCard
            item={item}
            index={index}
            isSelected={selectedIndices.includes(index)}
            updateSelection={updateSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
