# Ctftime README stats

Get dynamically generated ctftime statistics for your READMEs.

## Examples
![My ctftime stats](https://ctf.neilhommes.xyz/?teamid=11464&theme=light)
![b01lers](https://ctf.neilhommes.xyz/?teamid=11464&theme=dark)

## Usage
Copy and past the following into your markdown.

Change `?teamid=11464` to your ctftime team id.
```md
![My ctftime stats](https://ctf.neilhommes.xyz/?teamid=11464&theme=light)
```

Want dark themed cards?
> Pass the query parameter `theme=dark`.

## Deploy
```bash
docker compose up -d --build
```
Your cards will be accessible at `localhost:11464`

## Contributing
Pull requests and feedback are welcome.
