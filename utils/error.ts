
/**
 * Returns an error svg based on message and code
 * @param msg Error message
 * @param code Error code
 * @returns SVGized error message
 */

export const error_svg = (msg: string, code: number): string => {
    return `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="lightgray"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="black" dy=".3em">
                <tspan font-size="32" font-weight="bold">${code}</tspan>
                <tspan font-size="18" dy="1.2em">${msg}</tspan>
            </text>
        </svg>`;
} 