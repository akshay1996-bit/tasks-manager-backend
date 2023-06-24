# Tasks-Manager-Backend

This repo contains backend of tasks manager made using express js.

To Run this project, follow below steps:
1. clone the repo using git clone https://github.com/akshay1996-bit/tasks-manager-backend.git command.
2. Run cd tasks-manager-backend
3. Run npm i
4. Run start
5. In console you'll see server started at port 3000.

Following are the API's:

GET '/' - shows welcome page, to make sure server is up and running.

GET '/tasks' - Fetchs all the tasks.

GET '/tasks/:id' - Fetchs the tasks by the id

GET '/priority/:priority' - Fetches all the tasks by particular priority

POST '/tasks' - Creates a new task

PUT '/tasks/:id' - Updates a task by Id

DELETE '/tasks/:id' - Deletes a task by id.

Following is the schema:

"title" - string *required

"description" - string *required

"isComplete" - boolean

"priority" - string value can be one of the three -> "low","medium","high".

Validation provided are:
1. All fields are mandatory but title and description cannot be empty.
2. isComplete should be boolean.
3. id while updating and deleting should be valid.
4. priortiy can have one of the three value - > low,medium,high


