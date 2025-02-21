import { get_team, escape_xml } from "./utils/utils.js"
import { TeamCard, Theme } from "./cards/TeamCard.js"
import { error_svg } from "./utils/error.js";
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/', async (req: Request, res: Response) => {
    const teamid: string = req.query.teamid as string;
    const year: number = new Date().getFullYear();
    let theme: Theme = Theme.LIGHT;
    res.set('Content-Type', 'image/svg+xml');

    if (!teamid) {
        res.send(error_svg("Missing or invalid team id", 404));
        return;
    }

    if (req.query.theme as string && (req.query.theme as string) == "dark") {
        theme = Theme.DARK;
    }

    (get_team(parseInt(teamid))).then((data): void => {
        new TeamCard(
            escape_xml(data.name),
            escape_xml(data.logo), 
            escape_xml(data.country),
            data.rating[year].country_place,
            data.rating[year].rating_place,
            theme).render_svg().then((svg) => {
                res.send(svg);
            })
        return;
    }).catch((err): void => {
        console.log(err);
        res.send(error_svg("Internal Server Error", 500));
        return;
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});