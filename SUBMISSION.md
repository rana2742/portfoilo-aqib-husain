# Hackathon project entry: copy into the "your project" form

> Edit anything marked **[CONFIRM]** so it matches what really happened. Judges score honesty and clarity, so only keep what is true for you.

## Project name
Aqib Hussain — Portfolio with a DevOps Terminal

## Tagline
A portfolio you can talk to: a working terminal with 4 hidden secrets, a live "deploy" pipeline replay and a theme switcher, hosted on AWS Amplify.

## Live site
`https://<your-amplify-domain>.amplifyapp.com`   **[CONFIRM: paste your real URL]**

## GitHub repository
https://github.com/rana2742/portfoilo-aqib-husain   **[CONFIRM: repo is public and the name is correct]**

---

## What it is
A static, responsive portfolio for a Computer Engineering student specializing in cloud and DevOps. It has the three required sections (About, Skills, Projects) plus a Journey timeline, a creative feature, and an on-page explanation of how the site is deployed on AWS.

## The creative feature: Builder Lab terminal
Visitors type commands into a real working terminal embedded in the page. I chose a terminal because it matches how I work every day, in Linux and DevOps, and it lets visitors explore my portfolio the way I do.

**How visitors find it:** a pulsing banner in the hero ("Hidden in this site: a working terminal with 4 secrets"), a "Terminal · 4 secrets" navigation link, and a visible `SECRETS 0/4` counter inside the terminal.

**What it does**
- `deploy`: replays the real pipeline of this site (GitHub → Amplify → CloudFront).
- `aws`: documents the AWS services behind the site.
- `theme neon | dark | pastel | paper`: re-skins the entire website, and remembers the choice.
- `goto work`: scrolls the real page; `ls`, `cat`, history (Up/Down), Tab autocomplete, `Ctrl+L`.
- **4 hidden secrets**, tracked by a live counter. Finding them all lights up the terminal.

**It never gets in the way:** it is a normal section of the page, navigation is untouched, and every command is also available as a clickable shortcut button for mobile visitors.

## AWS services used
| Service | How I used it |
| --- | --- |
| AWS Amplify Hosting | Connected my GitHub repo; Amplify builds from `amplify.yml` and redeploys on every push |
| Amazon CloudFront (managed by Amplify) | Global CDN delivery for fast loads |
| Managed HTTPS (Amplify) | Site served over HTTPS; I added security headers with `customHttp.yml` |

**[CONFIRM / ADD]** If you also used other AWS services (for example EC2 for the AI Personal Finance Assistant demo, IAM, Route 53), add one line each here, and only if they are really part of your setup.

## Architecture
GitHub repository → AWS Amplify Hosting (build + deploy) → Amazon CloudFront (global CDN) → Visitor over HTTPS.
(A diagram is in the repository README and on the live site in the "How this site ships" section.)

## Screenshots to attach
1. Home page, desktop and mobile
2. The terminal after running `deploy` and `secret`
3. The neon theme
4. AWS Amplify app overview (app name, branch, domain)
5. Amplify deployment status showing a successful build

## What I learned **[CONFIRM: edit to your own words]**
- How a `git push` becomes a global deployment with Amplify Hosting and CloudFront.
- Linux servers are case-sensitive, so image file names must match the HTML exactly.
- How to theme a whole site with CSS custom properties instead of hard-coded colors.
- How to make an interactive widget accessible: live regions, keyboard support, focus styles and reduced motion.

## Challenges **[CONFIRM: keep only the ones you really faced, add your own]**
- Making a text terminal work well on mobile (shortcut buttons, 16px input to prevent iOS zoom).
- Keeping the creative feature fun without it blocking navigation.
- Making the portfolio readable on small screens after an early design used very small text.

## Originality
This portfolio is my own work, designed and built for this challenge. **[CONFIRM: it was not published before Oct 27. If an earlier version was ever public, tell me and we will handle it.]**
