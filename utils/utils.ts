import TeamCard from "../cards/TeamCard";

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