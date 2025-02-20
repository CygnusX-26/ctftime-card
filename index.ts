import { get_team } from "./ctftime.js"

const current_date: Date = new Date();
const year: number = current_date.getFullYear();
(get_team(-1)).then((data) => console.log(data["rating"][year.toString()]));