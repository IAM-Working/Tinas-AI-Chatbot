This is a simple ai chat policy assistance for turners cars

How to start

Backend:

npm install
npm start

Frontend:

npm install
npm run dev

make sure you have a .env file with your gemini api key in to use 

how to run with docker 

Backend:

docker run --env-file .env -p 3000:3000 tina-backend

frontend:

docker run -p 8080:80 tina-frontend
