import { get_team } from "./ctftime.js"
import TeamCard from "./cards/TeamCard.js"

const current_date: Date = new Date();
const year: number = current_date.getFullYear();

(get_team(1102)).then((data) => {
    console.log(
        new TeamCard(
            data.name,
            data.logo, 
            data.country,
            data.rating[year].rating_place,
            data.rating[year].country_place).render_svg());
});