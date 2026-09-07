# SkyQuill authentication fix

## Local development

Run the backend from `server`:

```bash
npm install
npm run server
```

It listens on `http://localhost:5000`.

Run the frontend from `client` in another terminal:

```bash
npm install
npm run dev
```

The React app uses Vite's `/api` proxy, so it can run on 5173, 5174, 5175, etc. Sign-up calls:

`POST /api/user/register`

which Vite forwards to:

`http://localhost:5000/api/user/register`

Test the backend at:

`http://localhost:5000/api/health`

Expected response:

```json
{"success":true,"message":"SkyQuill API is healthy"}
```

## Production

Set the frontend environment variable:

`VITE_BASE_URL=https://YOUR-BACKEND-DOMAIN`

Then redeploy the frontend. Do not put MongoDB or JWT secrets in the client `.env`.
