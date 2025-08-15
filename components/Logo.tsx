import React from 'react';

export const Logo: React.FC<{ size?: number }> = ({ size = 32 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="PongJit Logo"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--accent-start)' }} />
                    <stop offset="100%" style={{ stopColor: 'var(--accent-end)' }} />
                </linearGradient>
            </defs>
            
            {/* Outer circle representing wholeness/wellness */}
            <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="var(--accent-color)" 
                strokeOpacity="0.5" 
                strokeWidth="1.2" 
            />
            
            {/* Wave representing bio-signals */}
            <path 
                d="M 5,13 Q 9,10 12,13 T 19,13"
                stroke="var(--accent-color)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                fill="none"
            />

            {/* Spark representing AI insight */}
            <path 
                d="M12 5.5L11.5 7.5L9.5 8L11.5 8.5L12 10.5L12.5 8.5L14.5 8L12.5 7.5L12 5.5Z"
                fill="url(#logoGradient)"
            />
        </svg>
    );
};
