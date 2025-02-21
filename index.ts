import { get_team } from "./utils/ctftime.js"
import TeamCard from "./cards/TeamCard.js"
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', async (req: Request, res: Response, next) => {
    const teamid: string = req.query.teamid as string;
    const year: number = new Date().getFullYear();
    res.set('Content-Type', 'image/svg+xml');

    if (!teamid) {
        next("Invalid team id")
    }

    (get_team(parseInt(teamid))).then((data) => {
        res.send(
            new TeamCard(
                data.name,
                data.logo, 
                data.country,
                data.rating[year].country_place,
                data.rating[year].rating_place).render_svg()
            );
    }) 
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error('Internal Server Error:', err);
    res.status(500).set('Content-Type', 'image/svg+xml').send(`
        <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="lightgray"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="black" dy=".3em">
                <tspan font-size="32" font-weight="bold">500</tspan>
                <tspan font-size="18" dy="1.2em">Internal Server Error</tspan>
            </text>
        </svg>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});