import { useState } from 'react'
import '../sass/components/_box.scss'

interface BoxProps {
    label: string;
    img?: string;
    isSelected: boolean;
    onSelect: () => void;
}
export const Box = ({ label, img, isSelected, onSelect }: BoxProps) => {

    return (
        <div
            onClick={onSelect}
            className={`box ${isSelected ? 'selected' : ''}`}
        >
            {img && <img src={img} alt={label} />} 
            <p>{label}</p>
        </div>
    )
}