# simple_flask_react_app
A simple implementation of python flask as backend with an React App as corresponding frontend. The App provides the possibility of adding and managing notes with corresponding deadline Dates (just for Showcase reasons) which are stored in `./backend/note.db`

<h2 align="center">
  <img src=https://github.com/papstchaka/simple_flask_react_app/blob/master/simple_app-fe/src/assets/frontend_view.jpg alt="Frontend View" width="800px" />
</h2>

## Requirements
* flask
* flask_sqlalchemy
* flask_cors
--> install via `pip install flask flask_sqlalchemy flask_cors`

* npm to have the frontend working

## Fork project and set it up to work on local laptop
* Fork/Clone the repository to your local machine into a folder like `simple_flask_react_app`, go to that folder into the `simple_app-fe` folder and run `npm install` to install all the required npm packages.
* start the backend due to run `python app.py` in `backend`-folder. 2222 is the projects default backend port. If you want to change that, please head into `simple_app-fe/src/constants/index.js` and change the line to `export const API_URL = "http://localhost:<desired-port>/api/simple_app/";` to make sure that the frontend is listening to the right port. Furthermore you have to change the last line of `backend/app.py` to `app.run(debug=True, host='0.0.0.0', port=<desired_port>)`. Make sure you have the database initialised! Either by copying the database from the project or by initialising it using python. Therfor open a new python-Terminal in the `backend`-folder and run 
```python
from app import db
db.create_all()
```
* start the frontend due to `npm start` in the `simple_app-fe`-folder and head to `localhost:3000` to see the frontend
* OPTIONAL: Desired style of website can be easily changed by changing the colors in `simple_app-fe/src/style/_variables.scss`
* Project has the same frontend and functionality as <a href="https://github.com/papstchaka/simple_django_react_app" target="_blank">simple_django_react_app</a>


## Further information
You can access the current data in the DataBase due to run 

```python
datapath = "./backend/note.db"

import sqlite3
import pandas as pd
# Create your connection.
cnx = sqlite3.connect(datapath)

pd.read_sql_query("SELECT * FROM sqlite_master", cnx)["name"]
pd.read_sql_query("SELECT * FROM notes",cnx)
```
