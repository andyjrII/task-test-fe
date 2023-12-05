import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NAME_REGEX = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

const Register = () => {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [sectors, setSectors] = useState([]);
  const [validSectors, setValidSectors] = useState(false);

  const [sectorOptions, setSectorOptions] = useState([]);

  const [terms, setTerms] = useState(false);
  const [validTerms, setValidTerms] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = sectors.length > 0;
    setValidSectors(result);
  }, [sectors]);

  useEffect(() => {
    const result = terms === true;
    setValidTerms(result);
  }, [terms]);

  useEffect(() => {
    setErrMsg("");
  }, [name]);

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

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSectors(selectedOptions);
  };

  const handleBlur = (e) => {
    // Use the selected options when the select box loses focus
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSectors(selectedOptions);
  };

  const handleCheckboxChange = (e) => {
    setTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "users/register",
        JSON.stringify({
          name,
          sectorIds: sectors,
          terms
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Registraton Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <div className='container pt-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <div className='registration-wrap py-4'>
              <h3 className='text-center mb-0'>User Registration</h3>
              <p className='text-center'>
                Please enter your name and pick the Sectors you are currently
                involved in.
              </p>
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                <div className='form-group'>
                  <div
                    className='select-container'
                    style={{ maxHeight: "150px", overflowY: "auto" }}>
                    <select
                      value={sectors}
                      onChange={handleSelectChange}
                      onBlur={handleBlur}
                      className='form-select text-warning'
                      id='sectorSelector'
                      multiple
                      size={5}
                      required>
                      {sectorOptions.map((sector) => (
                        <option key={sector.id} value={sector.id}>
                          {sector.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-group pt-3'>
                  <label className='text-white'>
                    <input
                      type='checkbox'
                      className='mx-2'
                      checked={terms}
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
                    Save
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

export default Register;
