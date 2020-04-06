# TechDegree-Project-8
 SQL Library Manager

 --Description
This project is a Library Database Application that provides a user friendly interface to create, read, update, and delete books in a database.  


--Skills and Process
Skills: SQLite, Sequelize, Express, Pug
-Site was created with Express Generator and configured to use Pug as the templating engine. 
-SQLite Database was setup and configured via the Sequelize-CLI. Sequelize ORM utilized to interact with the database from express.
-This application demonstrates the following skills:
    1. Website constructed from the terminal via Express Generator and configured to use the Pug templating engine.
    2. Database setup and configured LOCALLY via the Sequelize CLI, and synchronized via the Sequelize ORM.
    3. Express routes use Sequelize to interact with a database to take advantage of each CRUD operation. By default, all entries in database are sorted via 'year' in 'descending' order.
    4. Web Application uses express routes to generate html via pug templates in the 'views' folder.
    5. Custom front-end CSS and JS served statically to allow list pagination and a quick search tool for user convenience.
    

--Project Attempt
Exceeds Expectations
-Project meets 'Exceeds Expectations' requirement. 
-Both list pagination and a case-insensitive user search exist via front-end scripts included in /public/javascripts/index.js.
-Pagination is configured to load 7 results but can easily be changed from one variable.
-Pagination loads page links dynamically to reflect number of results on page depending on number of search results.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.