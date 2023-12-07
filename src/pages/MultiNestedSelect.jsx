import { useState, useEffect } from "react";
import ReactDropdown from "@quantalytix/react-dropdownbox";
import "@quantalytix/react-dropdownbox/dist/index.es.css";
import axios from "../api/axios";

const MultiNestedSelect = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);

  useEffect(() => {
    axios
      .get("sectors/all")
      .then((response) => {
        setSectorOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Sectors:", error);
      });
  }, []);

  const handleSelect = (value) => {
    // Ensure selectedValues is always an array
    const updatedValues = Array.isArray(selectedValues) ? selectedValues : [];

    // Check if the value already exists in updatedValues
    const isSelected = updatedValues.includes(value);

    if (isSelected) {
      // If already selected, remove it
      setSelectedValues(updatedValues.filter((val) => val !== value));
    } else {
      // If not selected, add it to the updatedValues array
      setSelectedValues([...updatedValues, value]);
    }
    console.log(selectedValues);
  };

  return (
    <ReactDropdown
      data={sectorOptions}
      placeholder='Search or select'
      initialValue='Sectors'
      onSelect={handleSelect}
      selectedValues={selectedValues}
    />
  );
};

export default MultiNestedSelect;
