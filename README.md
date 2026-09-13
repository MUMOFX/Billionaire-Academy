# Billionaire Academy

Private trading education platform for disciplined traders.

## Project structure

- `index.html` contains the academy experience and public landing page.
- `styles.css` contains the responsive visual system.
- `script.js` contains navigation, checklist, quiz, playbook persistence, and account entry flows.
- `assets/` is reserved for academy-owned images, certificate artwork, EA imagery, and downloadable course files.

## Local development

This is currently served as a static front end while the production services are connected.

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Production integrations still required

- Secure authentication and user storage
- Admin approval workflow for certificates
- Private PDF/image storage
- Live market-data provider and server-side API key handling
- Real payments and EA delivery

Never commit API keys or private customer assets to the repository.