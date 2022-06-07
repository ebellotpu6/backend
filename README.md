# eCommerce Backend Project:

This is the third project of the **Full Stack Web Development** postgraduate course. The objective of the project is to use the knowledge learned in class to build a backend using Express and MongoDB. 

I have opted for making a typical Data model of an eCommerce.

![Data Model](https://github.com/ebellotpu6/backend-project/blob/master/Data%20Model.png)

How to run the project:

1. Clone the repository
2. Run the docker container
In db directory run the command:

`docker-compose up -d`

3. Inicialize the database with some test data 
In db directory run:

`./db-restore`

If the command doesn't work, add permissions using the chmod command.

4. Run the server
In server directory run the command:

`npm install`

Then, start the server:

`npm run dev`

5. Open insomnia and 

First open Insomnia and import the Insomnia json file  from the root directory. 
Then you can use the diferent requests to operate with the API.
