import * as fs from 'fs/promises';

const TEAMS_URL_BASE: string = "https://ctftime.org/api/v1/teams/"

interface RatingData {
    rating_place?: number, 
    organizer_points?: number,
    rating_points?: number,
    country_place: number
}

interface TeamData {
    academic: boolean,
    primary_alias: string,
    university_website?: string,
    name: string,
    rating: Record<string, RatingData>,
    logo: string,
    country: string,
    university: string,
    id: number,
    aliases: string[]
}


/**
 * Returns the ctftime team data based on team id.
 * @param team_id the team id.
 * @returns A promise containing team data.
 */

export const get_team = async (team_id: number): Promise<TeamData> => {
    try {
        const response = await fetch(`${TEAMS_URL_BASE}${team_id.toString()}/`);
        return await response.json() as TeamData;
    } catch (error) {
        return {} as TeamData;
    }
}

/**
 * Makes sure xml rendering client side isn't messed up
 * @param str string to be escaped
 * @returns valid xml string
 */

export const escape_xml = (str: string): string => {
    return str.replace(/[<>&"']/g, (char) => {
        const escapeMap: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;'
        };
        return escapeMap[char] || char;
    });
}

/**
 * Converts an image from url to base64 to be encoded in an svg
 * @param url url to convert
 * @returns base64 encoded image
 */

export const image_to_base64 = async (url: string): Promise<string> => {
    const response: Response = await fetch(url);
    const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
    const buffer: Buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

/**
 * Converts a url to url encoded svg text
 * @param url url to convert
 * @returns url encoded svg 
 */

export const image_to_svg = async (url: string): Promise<string> => {
    const response: Response = await fetch(url);
    const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
    const buffer: Buffer = Buffer.from(arrayBuffer);
    const svgText:string = buffer.toString('utf-8');
    return encodeURIComponent(svgText);
}

/**
 * Gets the ctftime logo from a local file
 * @returns svg as string
 */

export const get_ctftime_logo = async (): Promise<string> => {
    return encodeURIComponent(await fs.readFile("./imgs/logo.svg", 'utf-8'));
}