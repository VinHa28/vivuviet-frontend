"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export default function AutocompleteInput({
    label,
    placeholder,
    value,
    onChange,
    options = [],
    onSelect,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const containerRef = useRef(null);

    // Filter options based on input value
    useEffect(() => {
        if (value.trim() === "") {
            // Show all options if input is empty
            setFilteredOptions(options);
        } else {
            // Filter options based on input - sort with exact match first
            const searchTerm = value.toLowerCase();
            const filtered = options.filter((option) =>
                option.toLowerCase().includes(searchTerm)
            );

            // Sort: exact matches first, then alphabetical
            filtered.sort((a, b) => {
                const aLower = a.toLowerCase();
                const bLower = b.toLowerCase();
                const searchLower = searchTerm;

                if (aLower === searchLower) return -1;
                if (bLower === searchLower) return 1;
                if (aLower.startsWith(searchLower) && !bLower.startsWith(searchLower)) return -1;
                if (!aLower.startsWith(searchLower) && bLower.startsWith(searchLower)) return 1;
                return aLower.localeCompare(bLower);
            });

            setFilteredOptions(filtered);
        }
    }, [value, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        if (onSelect) onSelect(option);
        setIsOpen(false);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange("");
        setFilteredOptions(options);
    };

    return (
        <div className="flex-1 px-4 py-3 relative" ref={containerRef}>
            <h3 className="text-[14px] font-bold text-black whitespace-nowrap mb-1">
                {label}
            </h3>
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className="text-[13px] text-gray-500 bg-transparent outline-none w-full pr-8"
                />

                {/* Clear button */}
                {value && (
                    <button
                        onClick={handleClear}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                )}

                {/* Dropdown indicator */}
                {!value && (
                    <ChevronDown
                        size={16}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                )}

                {/* Dropdown menu */}
                {isOpen && filteredOptions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${value === option
                                        ? "bg-blue-100 text-blue-700 font-semibold"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
