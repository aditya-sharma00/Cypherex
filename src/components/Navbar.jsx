import React, { useState, useEffect, useRef } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onGroupingChange, onOrderingChange }) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [isNightMode, setNightMode] = useState(false);
  const [groupingOption, setGroupingOption] = useState('status');
  const [orderingOption, setOrderingOption] = useState('priority');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplayOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDisplayOptions = () => {
    setDisplayOptions(!displayOptions);
  };

  const toggleNightMode = () => {
    setNightMode(!isNightMode);
    document.body.classList.toggle('night-mode', !isNightMode);
  };

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
    onGroupingChange(option);
  };

  const handleOrderingChange = (option) => {
    setOrderingOption(option);
    onOrderingChange(option);
  };

  return (
    <div>
      <nav className={`navbar ${isNightMode ? 'night-mode' : ''}`}>
        <div className="display-container" ref={dropdownRef}>
        <button className={`display-button ${displayOptions ? 'open' : ''}`} onClick={toggleDisplayOptions}>
            Display <FontAwesomeIcon icon={displayOptions ? faAngleUp : faAngleDown} />
          </button>{displayOptions && (
            <div className="dropdown-options">
              <div>
                <label>Grouping:</label>
                <select value={groupingOption} onChange={(e) => handleGroupingChange(e.target.value)}>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
              </div>
              <div>
                <label>Ordering:</label>
                <select value={orderingOption} onChange={(e) => handleOrderingChange(e.target.value)}>
                  <option value="title">Title</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div>
          <button onClick={toggleNightMode} className="night-mode-toggle">
            {isNightMode ? <FaSun style={{ color: '#fff' }} /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
