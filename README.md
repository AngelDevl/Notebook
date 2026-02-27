# Notebook App
## About
A simple notebook app to manage notes.
## How to run in production
```console
git clone git@github.com:AngelDevl/Notebook.git
```
```console
docker compose --env-file .env.example up -d --build
```
```console
Reach http://localhost:5173
```
## How to run in development
### Running postgres
```console 
docker compose --env-file .env.example up -d postgres
```
### Running backend
```console 
npm run dev:migrate
```
```console 
npm run dev
```
### Running frontend (In frontend dir)
```console 
npm run dev
```
