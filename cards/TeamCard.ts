import { get_ctftime_logo, image_to_base64, image_to_svg } from "../utils/utils";

export enum Theme {
    LIGHT,
    DARK
}

interface Dimensions {
    width: number,
    height: number,
    duration: number,
}

/**
 * Represents a card for a ctftime team.
 */

export class TeamCard {
    readonly name: string;
    readonly logo: string;
    readonly country: string;
    readonly global_rating: number;
    readonly country_rating: number;
    readonly theme: Theme;
    dimensions: Dimensions;
    

    constructor(
        name: string = "Unknown",
        logo: string = "",
        country: string = "us",
        country_rating: number = NaN,
        global_rating: number = NaN,
        theme: Theme = Theme.LIGHT,
        dimensions: Dimensions = {width: 400, height: 200, duration: 2}
    ) {
        this.name = name;
        this.logo = logo;
        this.country = country;
        this.country_rating = country_rating;
        this.global_rating = global_rating;
        this.theme = theme;
        this.dimensions = dimensions;
    }

    /**
     * Generates the svg of a team card.
     * @returns the svg
     */

    async render_svg(): Promise<string> {
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

        const logo_b64: string = await image_to_base64(this.logo);
        const country_flag = await image_to_svg(`https://ctftime.org/static/images/sf/${this.country.toLowerCase()}.svg`);
        const ctftime_logo = await get_ctftime_logo();

        let logo_str: string = this.logo.length > 0 ? `<image x="320" y="20" width="60" height="60" href="data:image/png;base64,${logo_b64}"/>`: "";
        let country_str: string = this.country.length > 0 ? `<image x="100" y="110" width="20" height="20" href="data:image/svg+xml;utf8,${country_flag}"/>` : "";

        let bg_color: string = "#ffffff";
        let text_color: string = "#000000";
        let bar_color_filled: string = "#4CAF50";
        let bar_color_unfilled: string = "#e4e4e4";

        if (this.theme == Theme.DARK) {
            bg_color = "#24292e";
            text_color = "#ffffff";
            bar_color_filled = "#0d74e7";
            bar_color_unfilled = "#e4e4e4";
        }

        return `<svg width="${this.dimensions.width.toString()}" height="${this.dimensions.height.toString()}" viewBox="0 0 ${this.dimensions.width.toString()} ${this.dimensions.height.toString()}" xmlns="http://www.w3.org/2000/svg" fill="none">
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
            .fade-in {
                opacity: 0;
                animation: fadeIn 1.5s forwards;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        </style>
        <rect x="0" y="0" width="${this.dimensions.width.toString()}" height="${this.dimensions.height.toString()}" rx="7.5" fill="${bg_color}" stroke="#e1e4e8" stroke-width="2"/>
        <text x="20" y="50" font-size="30" font-weight="bold" id="team-name" fill="${text_color}">${this.name}</text>
        <g class="fade-in">
        ${logo_str}

        <text x="20" y="90" font-size="13" fill="${text_color}">Global rank</text>
        <rect x="20" y="100" width="300" height="5" rx="2" fill="${bar_color_unfilled}"/>

        <rect id="progress-bar" x="20" y="100" width="0" height="5" rx="2" fill="${bar_color_filled}">
            <animate attributeName="width" from="0" to="${global_bar_fill}" dur="${this.dimensions.duration.toString()}s" fill="freeze"/>
        </rect>
        <text id="progress-text" x="330" y="106" font-size="12" fill="${text_color}">${!isNaN(this.global_rating) ? this.global_rating.toString(): "N/A"}</text>
        
        
        <text x="20" y="125" font-size="13" fill="${text_color}">Country rank</text>
        ${country_str}
        <rect x="20" y="135" width="300" height="5" rx="2" fill="${bar_color_unfilled}"/>

        <rect id="progress-bar" x="20" y="135" width="0" height="5" rx="2" fill="${bar_color_filled}">
            <animate attributeName="width" from="0" to="${country_bar_fill}" dur="${this.dimensions.duration.toString()}s" fill="freeze"/>
        </rect>
        <text id="progress-text" x="330" y="141" font-size="12" fill="${text_color}">${!isNaN(this.country_rating) ? this.country_rating.toString(): "N/A"}</text>
        </g>
        <text x="20" y="180" font-size="10" fill="#6a737d">Powered by </text>
        <image x="75" y="157" width="40" height="40" href="data:image/svg+xml;utf8,${ctftime_logo}"/>
        <script>
            const text = document.getElementById("team-name");
            
            let bbox = text.getBBox();
            let maxWidth = 300;

            if (bbox.width > maxWidth) {
                let scale = maxWidth / bbox.width;
                text.setAttribute("transform", \`scale(\$\{scale\}, 1)\`);
            }
        </script>
    </svg>`;
    }
}