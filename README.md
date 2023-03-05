# test-task-gymbuddy

## How to start:
1) Clone this project: `git clone https://github.com/AdiletMaksatuly/test-task-gymbuddy.git`
2) Go to the project directory `cd test-task-gymbuddy`
3) Install all dependencies by `npm i`
4) Install json-server npm package globally `npm i -g json-server` for a local api server. 
5) If you're going to run this project on your mobile device, then install localtunnel npm package globally `npm i -g localtunnel`.
6) Run api server: `npm run server`
7) Open .env file in root directory and edit API_URL variable to yours. It can be emulator IP address, or if you're using your physical mobile device, run in terminal `lt --port 5000`. It will generate you a URL, that you need to copy and paste to API_URL env. variable.
8) After you set API_URL, you can just run the project in terminal: `npm start`

## What you need to know:
- If data don't load from API, try restart json-server and localtunnel simply by starting from 6-th step above

## About this project
This project is a test task for Frontend Developer (React Native). 

Stack: React Native, TypeScript, styled-components

