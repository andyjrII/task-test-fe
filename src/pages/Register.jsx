import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcBusinessman, FcDiploma1 } from "react-icons/fc";

const NAME_REGEX = /[A-z-]{3,20}$/;

const Register = () => {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [sectors, setSectors] = useState([]);
  const [validSectors, setValidSectors] = useState(false);

  const [terms, setTerms] = useState(false);
  const [validTerms, setValidTerms] = useState(false);

  const [sectorOptions, setSectorOptions] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(sectors);

    const v1 = NAME_REGEX.test(name);
    const v2 = sectors.length > 0;

    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    if (!v2) {
      setErrMsg("Select a sector");
      return;
    }

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
            <div className='login-wrap py-4'>
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
                <div className='form-group'>
                  <div className='icon d-flex align-items-center justify-content-center'>
                    <span>
                      <FcBusinessman />
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Names'
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
                <div className='form-group pt-3'>
                  <select
                    value={sectors}
                    onChange={(e) => setSectors(e.target.value)}
                    className='form-select text-white'
                    id='sector'>
                    <option value=''>Sectors</option>
                    {sectorOptions.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.name}
                      </option>
                    ))}
                  </select>
                  <div className='select-icon d-flex align-items-center'>
                    <span>
                      <FcDiploma1 />
                    </span>
                  </div>
                </div>

                <div className='form-group pt-3'>
                  <label className='text-white'>
                    <input type='checkbox' className='mx-2' /> Agree to terms
                  </label>
                </div>

                <div className='form-group w-100 py-3'>
                  <button
                    className='btn form-control btn-primary rounded px-3'
                    type='submit'>
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
