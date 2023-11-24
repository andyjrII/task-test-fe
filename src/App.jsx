import "./App.css";
import { useState, useEffect } from "react";
import { FcHome, FcFolder, FcContacts } from "react-icons/fc";
import { FaCode } from "react-icons/fa";
import { PiWifiHighFill, PiBatteryChargingVerticalFill } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import Icons from "./components/Icons";

const App = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    // Function href update the date and time every second
    const interval = setInterval(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("default", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
      setCurrentDateTime(formattedDate);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <main id='desktop-bg'>
      <Icons />
      <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-bottom'>
        <div className='container-fluid d-flex justify-content-between align-items-center'>
          <div className='empty'></div>
          <ul className='navbar-nav mx-auto' id='footer'>
            <li className='nav-item me-3'>
              <a className='nav-a' href='#'>
                <FcHome title='Home' />
              </a>
            </li>
            <li className='nav-item me-3'>
              <a className='nav-a' href='#'>
                <FcFolder title='Projects' />
              </a>
            </li>
            <li className='nav-item me-3'>
              <a className='nav-a' href='#'>
                <FaCode title='Skills' />
              </a>
            </li>
            <li className='nav-item me-3'>
              <a className='nav-a' href='#'>
                <FcContacts title='Contact' />
              </a>
            </li>
          </ul>
          <ul className='navbar-nav d-flex me-5'>
            <li className='nav-item me-2'>
              <PiWifiHighFill />
            </li>
            <li className='nav-item me-2'>
              <HiSpeakerWave />
            </li>
            <li className='nav-item me-2'>
              <PiBatteryChargingVerticalFill />
            </li>
          </ul>
          <div className='navbar-text d-flex'>{currentDateTime}</div>
        </div>
      </nav>
    </main>
  );
};

export default App;
