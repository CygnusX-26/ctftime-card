
interface Dimensions {
    width: number,
    height: number,
    theme?: string
}



export default class TeamCard {
    readonly name: string;
    readonly logo: string;
    readonly country: string;
    readonly global_rating: number;
    readonly country_rating: number;
    dimensions: Dimensions;
    

    constructor(
        name: string = "Unknown",
        logo: string = "",
        country: string = "us",
        country_rating: number = NaN,
        global_rating: number = NaN,
        dimensions: Dimensions = {width: 200, height: 100}
    ) {
        this.name = name;
        this.logo = logo;
        this.country = country;
        this.country_rating = country_rating;
        this.global_rating = global_rating;
        this.dimensions = dimensions
    }

    render_svg(): string {
        
        let global_percentage: number = 1.0;
        if (!isNaN(this.global_rating) && this.global_rating <= 200) {
            global_percentage = this.global_rating / 200;
        }

        

        let country_percentage: number = 1.0;
        if (!isNaN(this.country_rating) && this.country_rating <= 200) {
            country_percentage = this.country_rating / 200;
        }

        const global_bar_fill: number = Math.floor((1 - global_percentage) * 300);
        const country_bar_fill: number = Math.floor((1 - country_percentage) * 300);

        let logo_str: string = this.logo.length > 0 ? `<image x="320" y="20" width="60" height="60" href="${this.logo}"/>`: "";
        let country_str: string = this.country.length > 0 ? `<image x="100" y="110" width="20" height="20" href="https://ctftime.org/static/images/sf/${this.country.toLowerCase()}.svg"/>` : "";

        return `
    <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" fill="none">
        <style>
            /* latin */
            @font-face {
                font-family: 'Roboto';
                font-style: normal;
                src: url(//fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmYUtfBBc4AMP6lQ.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            text {
                font-family: "Roboto", sans-serif;
            }
        </style>
        <rect x="0" y="0" width="400" height="200" rx="7.5" fill="#fff" stroke="#e1e4e8" stroke-width="2"/>
        <text x="20" y="50" font-size="30" font-weight="bold" fill="#000000">${this.name}</text>

        ${logo_str}

        <text x="20" y="90" font-size="13" fill="#000000">Global rank</text>
        <rect x="20" y="100" width="300" height="5" rx="2" fill="#e4e4e4"/>

        <rect id="progress-bar" x="20" y="100" width="0" height="5" rx="2" fill="#4CAF50">
            <animate attributeName="width" from="0" to="${global_bar_fill}" dur="1.5s" fill="freeze"/>
        </rect>
        <text id="progress-text" x="330" y="106" font-size="12" fill="#000000">${!isNaN(this.global_rating) ? this.global_rating.toString(): "N/A"}</text>
        
        
        <text x="20" y="125" font-size="13" fill="#000000">Country rank</text>
        ${country_str}
        <rect x="20" y="135" width="300" height="5" rx="2" fill="#e4e4e4"/>

        <rect id="progress-bar" x="20" y="135" width="0" height="5" rx="2" fill="#4CAF50">
            <animate attributeName="width" from="0" to="${country_bar_fill}" dur="1.5s" fill="freeze"/>
        </rect>
        <text id="progress-text" x="330" y="141" font-size="12" fill="#000000">${!isNaN(this.country_rating) ? this.country_rating.toString(): "N/A"}</text>
        <text x="20" y="180" font-size="10" fill="#6a737d">Powered by </text>
        <image x="75" y="157" width="40" height="40" href="https://ctftime.org/static/images/ct/logo.svg"/>
    </svg>`;
    }
}