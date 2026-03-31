# Notebook App

## About

A simple notebook app to manage notes.

## How to run:

## First clone:

```console
git clone git@github.com:AngelDevl/Notebook.git
```

```console
cd Notebook
```

### Production:

##### Initialize .env file with the same configuration as .env.example

```console
npm run start
```

##### or

```console
docker compose up -d --build
```

### Development:

##### Initialize .env.development file with the same configuration as .env.example

##### First install the dependencies:

```console
npm install
```

#### To run both backend and frontend:

```console
npm run dev
```

#### To run them separately:

#### Backend:

```console
npm run dev:backend
```

#### Frontend:

```console
npm run dev:frontend
```

### Testing:

##### Initialize .env.test file with the same configuration as .env.example

```console
npm run test
```
