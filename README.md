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
docker compose up -d --build
```

### Development:
##### Initialize .env.development file with the same configuration as .env.example
#### Backend:
```console
cd Backend
```
```console
npm install
```
```console
npm run dev:run
```
#### Frontend:
```console
cd Frontend
```
```console
npm install
```
```console
npm run dev
```

### Testing:
##### Initialize .env.test file with the same configuration as .env.example
```console
cd Backend
```
```console
npm install
```
```console
npm run test
```