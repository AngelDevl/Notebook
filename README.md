# Notebook App

## About

A simple notebook app to manage notes.

## How to run -

## Production:

## \* Important if you choose to run in development and try to pass .env to postgres service instead of .env.development the server will not choose the .env since its not considered a production environment (Production environment = Docker). In production it does not matter if you choose .env or .env.production since Docker inject the env variables from the file that was given.
<br>

```console
git clone git@github.com:AngelDevl/Notebook.git
```

```console
docker compose --env-file .env.development up -d --build
```

```console
Reach http://localhost:5173 or the frontend-port that is mentioned in .env.development
```

## Development:

### Running postgres

```console
docker compose --env-file .env.development up -d postgres
```

### Running backend

```console
cd Backend
```

```console
npm install
```

## Option 1

```console
npm run dev:run
```

## Option 2

```console
npm run gen
```

```console
npm run dev:migrate
```

```console
npm run dev
```

### Running frontend (In frontend dir)

```console
cd Frontend
```

```console
npm install
```

```console
npm run dev
```
