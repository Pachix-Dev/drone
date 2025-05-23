import React, { useState, useEffect, useRef } from 'react';


function CustomMultiSelect({ options, value, onChange, label, className = '', hasSelectAll = false, translates }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    if (value.some((selected) => selected.value === option.value)) {
      onChange(value.filter((selected) => selected.value !== option.value));
    } else {
      onChange([...value, option]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`custom-multi-select ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-bold mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          className="w-full border text-white border-gray-300 rounded py-4 px-4  text-left focus:outline-none focus:border-indigo-500"
          onClick={toggleDropdown}
        >
          {value.length > 0
            ? value
              .filter(item => item && item.label && typeof item.label === 'string' && item.label.trim() !== '' && item.value)
              .map((item) => item.label)
              .join(', ')
            : translates.select_options}
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg overflow-auto py-1 max-h-48">
            <ul className="max-h-48 overflow-auto py-1">
              {options.map((option) => (
                <li key={option.value}>
                  <label className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={value.some((selected) => selected.value === option.value)}
                      onChange={() => toggleOption(option)}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomMultiSelect;