import { get_team, escape_xml } from "./utils/utils.js"
import { TeamCard, Theme, Dimensions } from "./cards/TeamCard.js"
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
    let x: string = req.query.x as string;
    let y: string = req.query.y as string;
    let theme: Theme = Theme.LIGHT;
    res.set('Content-Type', 'image/svg+xml');

    if (!teamid) {
        res.send(error_svg("Missing or invalid team id", 404));
        return;
    }

    if (req.query.theme as string && (req.query.theme as string) == "dark") {
        theme = Theme.DARK;
    }

    let x_dim = 400;
    if (x && parseInt(x)) {
        x_dim = parseInt(x);
    }
    let y_dim = 200;
    if (y && parseInt(y)) {
        y_dim = parseInt(y);
    }

    (get_team(parseInt(teamid))).then((data): void => {
        new TeamCard(
            escape_xml(data.name ? data.name : ""),
            escape_xml(data.logo ? data.logo : ""), 
            escape_xml(data.country ? data.country : ""),
            data.rating[year].country_place,
            data.rating[year].rating_place,
            theme,
            {width: x_dim, height: y_dim, duration: 2}).render_svg().then((svg) => {
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