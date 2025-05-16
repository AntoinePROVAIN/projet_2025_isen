/**
 * Composant Button.
 * 
 * @component
 * 
 * @param {Object} props - Les propriétés du composant Button
 * @param {() => void} [props.onClick] - Fonction callback appelée lors du clic sur le bouton
 * @param {React.ReactNode} props.children - Contenu à afficher dans le bouton
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - Style visuel du bouton
 *   - 'primary': Bouton principal bleu
 *   - 'secondary': Bouton secondaire gris
 *   - 'outline': Bouton avec contour bleu
 * @param {boolean} [props.disabled=false] - Désactive le bouton si true
 * @param {string} [props.className=''] - Classes CSS additionnelles à appliquer au bouton
 * 
 * @example
 * // Bouton principal
 * <Button onClick={() => console.log('Cliqué!')}>Cliquez-moi</Button>
 * 
 * // Bouton outline désactivé
 * <Button variant="outline" disabled>Action désactivée</Button>
 * 
 * @returns {JSX.Element} Un bouton stylisé avec les propriétés spécifiées
 */
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'outline',
    disabled = false,
    className = '',
}) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors';
    
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
    };

    const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </button>
    );
};

export default Button;