import React, { useState } from "react";
import Select from "react-select";

const options = [
  {
    label: "Category 1",
    options: [
      { value: "opt1", label: "Option 1" },
      { value: "opt2", label: "Option 2" }
    ]
  },
  {
    label: "Category 2",
    options: [
      { value: "opt3", label: "Option 3" },
      { value: "opt4", label: "Option 4" }
    ]
  }
];

function NestedSelect() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  return (
    <Select
      options={options}
      value={selectedOptions}
      isMulti
      onChange={handleChange}
      closeMenuOnSelect={false}
    />
  );
}

export default NestedSelect;
