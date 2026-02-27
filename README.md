# Notebook App
## About
A simple notebook app to manage notes.
## How to run in production
```console
> 1. git clone git@github.com:AngelDevl/Notebook.git
```
```console
> 2. docker compose --env-file .env.example up -d --build
```
```console
> 3. Reach http://localhost:5173
```
## How to run in development
```console 
> 1. docker compose --env-file .env.example up -d postgres
```
```console 
> 2. npm run dev:migrate
```
```console 
> 3. npm run dev
```
