import { get_ctftime_logo, image_to_base64, image_to_svg } from "../utils/utils";

export enum Theme {
    LIGHT,
    DARK
}

export interface Dimensions {
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

        const global_bar_fill: number = Math.floor((1 - global_percentage) * 75);
        const country_bar_fill: number = Math.floor((1 - country_percentage) * 75);

        const logo_b64: string = this.logo.length > 0 ? await image_to_base64(this.logo) : "";
        const country_flag: string = this.country.length > 0 ? await image_to_svg(`https://ctftime.org/static/images/sf/${this.country.toLowerCase()}.svg`): "";
        const ctftime_logo: string = await get_ctftime_logo();

        let logo_str: string = this.logo.length > 0 ? `<image x="80%" y="10%" width="15%" height="30%" href="data:image/png;base64,${logo_b64}"/>`: "";
        let country_str: string = this.country.length > 0 ? `<image x="26%" y="55%" width="5%" height="10%" href="data:image/svg+xml;utf8,${country_flag}"/>` : "";

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

        const fit_to_dimension = (value: number): number => {
            return value;
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
        <rect x="0%" y="0%" width="100%" height="100%" rx="7.5" fill="${bg_color}" stroke="#e1e4e8" stroke-width="2"/>
        <text x="5%" y="25%" font-size="2em" font-weight="bold" id="team-name" fill="${text_color}">${this.name}</text>
        <g class="fade-in">
        ${logo_str}

        <text x="5%" y="45%" font-size="0.83em" fill="${text_color}">Global rank</text>
        <rect x="5%" y="50%" width="75%" height="2.5%" rx="2" fill="${bar_color_unfilled}"/>

        <rect id="progress-bar" x="5%" y="50%" width="0%" height="2.5%" rx="2" fill="${bar_color_filled}">
            <animate attributeName="width" from="0%" to="${global_bar_fill}%" dur="${this.dimensions.duration.toString()}s" fill="freeze"/>
        </rect>
        <text id="progress-text" x="82.5%" y="53%" font-size="0.8em" fill="${text_color}">${!isNaN(this.global_rating) ? this.global_rating.toString(): "N/A"}</text>
        
        
        <text x="5%" y="62.5%" font-size="0.83em" fill="${text_color}">Country rank</text>
        ${country_str}
        <rect x="5%" y="67.5%" width="75%" height="2.5%" rx="2" fill="${bar_color_unfilled}"/>

        <rect id="progress-bar" x="5%" y="67.5%" width="0%" height="2.5%" rx="2" fill="${bar_color_filled}">
            <animate attributeName="width" from="0%" to="${country_bar_fill}%" dur="${this.dimensions.duration.toString()}s" fill="freeze"/>
        </rect>
        <text id="progress-text" x="82.5%" y="70.5%" font-size="0.8em" fill="${text_color}">${!isNaN(this.country_rating) ? this.country_rating.toString(): "N/A"}</text>
        </g>
        <text x="5%" y="90%" font-size="0.66em" fill="#6a737d">Powered by </text>
        <image x="18.75%" y="78.5%" width="10%" height="20%" href="data:image/svg+xml;utf8,${ctftime_logo}"/>
        <script>
            function scaleText() {
                const text = document.getElementById("team-name");
                const maxWidth = ${this.dimensions.width.toString()} * 0.75;
                if (text.getBBox().width > maxWidth) {
                    const bbox = text.getBBox(); // Get text dimensions
                    const scale = maxWidth / bbox.width;
                    const cx = 0;
                    const cy = bbox.y + bbox.height / 2;

                    text.setAttribute("transform", \`translate(\$\{cx\}, \$\{cy\}) scale(\$\{scale\}) translate(\$\{-cx\}, \$\{-cy\})\`);
                } 
            }
            window.addEventListener("resize", scaleText);
            window.addEventListener("load", scaleText);
        </script>
    </svg>`;
    }
}