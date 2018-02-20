# Web project

## Prerequisites

- Docker
- Docker-compose

## Instructions

- Clone this repository
- Run the next commands in the root directory (same as docker-compose.yml)
```bash 
$ docker-compose build
````
- To run the backend server use:
```bash
$ docker-compose up
```
- Use this command to stop the backend server
```bash
$ docker-compose down
```

- To run the frontend server run this commands in the `client` directory:
```bash
$ npm install
$ npm run dev
```

## Tests
While the backend server is running:
- Open new terminal and use this commands to launch the 
tests
```bash
$ sudo docker exec -i -t server /bin/bash
$ npm test
```
## Database

Open data from the administration can be use.
Here you can test it thanks to this script which will use caracteristiques_2016.csv in root directory to fill the database.

To run this script and fill the database, follow the next instructions:

- open a terminal and attach it to the backend container using:
```bash
$ sudo docker exec -i -t server /bin/bash
```
- run the next command in the server directory (you might see a file called caracteristisques_2016.csv):
```bash
node fillthedataba.js
```

The database will be auto filled. To display this data in the frontend, you can use the button `afficher les anciennes données` in the bottom left.

## API Description

### `GET /api/accidents/`
#### User-Permission: **PUBLIC**

Retrieve accidents for a given area.

#### Query string parameters:
- lat : latitude
- lon : longitude
- rad : radius

#### Response
```json
[
    { 
        "id": "1235ae46b",
        "loc": [ 10.25154, 40.25544],    //loc is [longitude, lattitude] couple
        "placeName": "Place saint jean",
        "seriousness": 3,
        "date": "2018-02-15T14:24:02.216Z"
    }
]
```

### `POST /api/accidents/`
#### User-Permission: **MANAGER**

Create a new accident

#### Request Body
```json
{ 
    "loc": [10.25154, 40.25544],    //loc is [longitude, lattitude] couple
    "placeName": "Place saint jean",
    "seriousness": 2
}
```

#### Response body
```json
{ 
    "id": "eb1235a46",
    "loc": [10.25154, 40.25544],     //loc is [longitude, lattitude] couple
    "placeName": "Place saint jean",
    "seriousness": 3,
    "date": "2018-02-15T14:24:02.216Z"
}
```

### `DELETE /api/accidents/{accident_id}`
#### User-Permission: **MANAGER**

Delete an accident from the database

#### Response body
If everything is OK:
````json
{
    "n": 1,
    "ok": 1
}
````

If the id is not found: status 404

````json
{
"message": "not found, not deleted Ehhhré :D"
}
````

### `GET /api/accidents/{accident_id}/comments`
#### User-Permission: **PUBLIC**

Retrieve comments for a given accident

#### Query string parameters
- accident_id : the accident to get the comments.

#### Response
```json
[
    {
        "id": "ab121654",
        "user_id": "b1564aa8",
        "title": "omg very dangerous",
        "message": "Be very carreful it is really dangerous ! Oh my god !",
        "date": "2018-02-15T14:24:02.216Z"
    },
    {
        "id": "ae1214584",
        "user_id": "a157897bb48",
        "title": "chill bill",
        "message": "It's cool man, chill !",
        "date": "2018-02-15T14:24:02.216Z"
    }
]
```

### `POST /api/accidents/{accident_id}/comments`
#### User-Permission: **PUBLIC**

Post a comment for a given accident

#### Request body
```json
{
    "title": "omg very dangerous",
    "message": "Be very carreful it is really dangerous ! Oh my god !"
}
```

#### Response body
```json
{
    "id": "ae1214584",
    "user_id": "ab15648",
    "title": "omg very dangerous",
    "message": "Be very carreful it is really dangerous ! Oh my god !",
    "date": "2018-02-15T14:24:02.216Z"
}
```

### `GET /api/accidents/{accident_id}`
#### User-Permission: **PUBLIC**

Retrieve accident for a given id

#### Query string parameters
- accident_id : the accident to get.

#### Response
```json
{ 
    "id": "eb1235a43",
    "loc": [43.6237776, 7.0473906],
    "placeName": "Route des Dolines",
    "seriousness": 3,
    "date": "2018-02-15T14:24:02.216Z"
}
```

## Tools

- Postman (https://www.getpostman.com/) : tool for test ours API by sending requests. 
- Mongo Compass (https://www.mongodb.com/products/compass) : tool for visually explore ours data and manipulate it as necessary.

## Contributors

#### Rami AJROUD
###### rami.ajroud@etu.unice.fr
- Work on server side :
    - API
    - data storage in a NoSQL database (MongoDB)
    - people access manager
    - tests
- Work on client side

#### Yasin EROGLU
###### yasin.eroglu@etu.unice.fr
- Work on server side :
    - open data parser
    - data filter and cleaner
    - data storage in a NoSQL database (MongoDB)
    - tests
- Work on client side

#### Günther JUNGBLUTH
###### gunther.jungbluth@etu.unice.fr
- Work on client side :
    - data display
    - user interface (users and managers)
    - accidents and comments manipulation
    - real-time mode
- Work on server side

