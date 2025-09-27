import React, { useState, useEffect, useRef } from 'react';
import { ChromePicker } from 'react-color';
import { FaPalette } from 'react-icons/fa';

interface ColorPickerProps {
    color: { r: number, g: number, b: number };
    onChange: (color: { r: number, g: number, b: number }) => void;
    label?: string;
    className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    color,
    onChange,
    label = "Text Color",
    className = ""
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const hexColor = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;

    const handleColorChange = (colorResult: any) => {
        onChange({
            r: colorResult.rgb.r,
            g: colorResult.rgb.g,
            b: colorResult.rgb.b
        });
    };

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    return (
        <div ref={pickerRef} className={`space-y-3 relative ${className}`}>
            <label className="block text-base font-medium text-[#ededed]">{label}</label>
            <div className="flex items-center space-x-3">
                <div
                    className="w-12 h-12 rounded-lg border-2 border-[#a1a1a1] cursor-pointer"
                    style={{ backgroundColor: hexColor }}
                    onClick={() => setShowPicker(!showPicker)}
                />
                <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#3758c9] hover:bg-[#43b6f0] text-[#ededed] rounded-lg transition-colors"
                >
                    <FaPalette size={16} />
                    <span>Choose Color</span>
                </button>
            </div>

            {showPicker && (
                <div className="absolute z-50 -top-2 left-0 transform -translate-y-full">
                    <div className="bg-[#1a1a1a] rounded-lg shadow-2xl p-2 border border-[#a1a1a1]/20">
                        <ChromePicker
                            color={hexColor}
                            onChange={handleColorChange}
                            disableAlpha
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
