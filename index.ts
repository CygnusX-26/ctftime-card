import { get_team } from "./ctftime.js"
import TeamCard from "./cards/TeamCard.js"

const current_date: Date = new Date();
const year: number = current_date.getFullYear();

(get_team(11460)).then((data) => {
    console.log(
        new TeamCard(
            data.name,
            data.logo, 
            data.country,
            data.rating[year].country_place,
            data.rating[year].rating_place).render_svg());
});