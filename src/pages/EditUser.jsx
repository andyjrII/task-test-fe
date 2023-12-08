import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDropdown from "@quantalytix/react-dropdownbox";
import "@quantalytix/react-dropdownbox/dist/index.es.css";

const NAME_REGEX = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

const EditUser = () => {
  const errRef = useRef();
  const userData = JSON.parse(localStorage.getItem("USER_DETAILS"));
  const { id, name, sectors, terms } = userData;
  const sectorOptions = JSON.parse(localStorage.getItem("SECTORS"));

  // Set initial states for the form fields using the retrieved data
  const [nameField, setNameField] = useState(name);
  const [validName, setValidName] = useState(true);
  const [nameFocus, setNameFocus] = useState(true);

  const [selectedValuesField, setSelectedValuesField] = useState(sectors);
  const [validSectors, setValidSectors] = useState(true);

  const [termsField, setTermsField] = useState(terms);
  const [validTerms, setValidTerms] = useState(true);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = NAME_REGEX.test(nameField);
    setValidName(result);
  }, [nameField]);

  useEffect(() => {
    const result = selectedValuesField.length > 0;
    setValidSectors(result);
  }, [selectedValuesField]);

  useEffect(() => {
    const result = termsField === true;
    setValidTerms(result);
  }, [termsField]);

  useEffect(() => {
    setErrMsg("");
  }, [nameField]);

  const handleSelect = (value) => {
    // Ensure sectors is always an array
    const updatedValues = Array.isArray(selectedValuesField)
      ? selectedValuesField
      : [];

    // Check if the value already exists in updatedValues
    const isSelected = updatedValues.includes(value);
    if (isSelected) {
      // If already selected, remove it
      const uniqueArray = [
        ...new Set(updatedValues.filter((val) => val !== value))
      ];
      setSelectedValuesField(uniqueArray);
    } else {
      // If not selected, add it to the updatedValues array
      const uniqueArray = [...new Set([...updatedValues, value])];
      setSelectedValuesField(uniqueArray);
    }
  };

  const handleCheckboxChange = (e) => {
    setTermsField(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sectorIds = selectedValuesField.map(
      (selectedValue) => selectedValue.value
    );
    try {
      const response = await axios.patch(
        `users/update/${id}`,
        JSON.stringify({
          name,
          sectorIds,
          terms
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      localStorage.setItem("USER_DETAILS", JSON.stringify(response.data));
      alert(`User with Name: ${name} successfully updated!`);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Update Failed");
      }
      errRef.current.focus();
    }
  };

  const texts = selectedValuesField.map((selectedValue) => {
    return (
      <span className='badge text-bg-primary m-1' key={selectedValue.value}>
        {selectedValue.text}
      </span>
    );
  });

  return (
    <section>
      <div className='container pt-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <div className='registration-wrap py-4'>
              <h3 className='text-center mb-0'>Update User</h3>
              <p className='text-center'>Update your details!</p>
              <p
                ref={errRef}
                className={`{errMsg ? "errmsg" : "offscreen"} text-center text-danger`}>
                {errMsg}
              </p>
              <form
                className='login-form rounded shadow-lg'
                onSubmit={handleSubmit}>
                <label className='text-white'>Name: </label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setNameField(e.target.value)}
                    value={nameField}
                    autoComplete='off'
                    required
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                  />
                  <div className='valid-icon d-flex align-items-center justify-content-center'>
                    <span className={validName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !name ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <p
                    className={
                      nameFocus && name && !validName
                        ? "instructions"
                        : "offscreen"
                    }>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    First name, Middle name (optional) & Last Name
                  </p>
                </div>

                <label className='text-white mb-2 pt-3'>Sectors: </label>
                <div className='form-group mt-1'>
                  <ReactDropdown
                    data={sectorOptions}
                    placeholder='Search or select'
                    initialValue='Sectors'
                    onSelect={handleSelect}
                    sectors={selectedValuesField}
                  />
                  <p className='mt-1'>Sectors: {texts}</p>
                </div>

                <div className='form-group pt-3'>
                  <label className='text-white'>
                    <input
                      type='checkbox'
                      className='mx-2'
                      checked={termsField}
                      onChange={handleCheckboxChange}
                    />
                    Agree to terms
                  </label>
                </div>

                <div className='form-group w-100 py-3'>
                  <button
                    className='btn form-control btn-primary rounded px-3'
                    type='submit'
                    disabled={!validName | !validSectors | !validTerms}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
