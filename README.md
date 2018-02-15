# ServerSideProject

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
        "loc": [ 10.25154, 40.25544],
        "placeName": "Place saint jean",
        "seriousness": 3,
        "date": "2018-02-15T14:24:02.216Z"
    }
]
```

### `POST /api/accident/`

#### User-Permission: **MANAGER**
Create a new accident

#### Request Body

```json
{ 
    "loc": [10.25154, 40.25544],
    "placeName": "Place saint jean",
    "seriousness": 2
}
```

#### Response body

```json
{ 
    "id": "eb1235a46",
    "loc": [10.25154, 40.25544],
    "placeName": "Place saint jean",
    "seriousness": 3,
    "date": "2018-02-15T14:24:02.216Z"
}
```

### `DELETE /api/accident/{accident_id}`
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

### `GET /api/accident/{accident_id}/comments`
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

### `POST /api/accident/{accident_id}/comments`
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
