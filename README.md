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
        "id": 123546,
        "lat": 10.25154,
        "lon": 40.25544,
        "placeName": "Place saint jean",
        "seriousness": 3
    }
]
```

### `POST /api/accident/`

#### User-Permission: **MANAGER**
Create a new accident

#### Request Body

```json
{ 
    "lat": 10.25154,
    "lon": 40.25544,
    "placeName": "Place saint jean",
    "seriousness": 2
}
```

#### Response body

```json
{ 
    "id": 123546,
    "lat": 10.25154,
    "lon": 40.25544,
    "placeName": "Place saint jean",
    "seriousness": 3
}
```

### `DELETE /api/accident/{accident_id}`
#### User-Permission: **MANAGER**
Delete an accident from the database

### `GET /api/accident/{accident_id}/comments`
#### User-Permission: **PUBLIC**

Retrieve comments for a given accident

#### Query string parameters
- accident_id : the accident to get the comments.

#### Response
```json
[
    {
        "id": 121654,
        "user_id": 15648,
        "title": "omg very dangerous",
        "message": "Be very carreful it is really dangerous ! Oh my god !",
        "timestamp": 10064186164
    },
    {
        "id": 1214584,
        "user_id": 15789748,
        "title": "chill bill",
        "message": "It's cool man, chill !",
        "timestamp": 100641869789
    }
]
```

### `POST /api/accident/{accident_id}/comments`
#### User-Permission: **PUBLIC**

Post a comment for a given accident

#### Request body

```json

{
    "user_id": 15648,
    "title": "omg very dangerous",
    "message": "Be very carreful it is really dangerous ! Oh my god !"
}

```

#### Response body
```json
{
    "id": 1214584,
    "user_id": 15648,
    "title": "omg very dangerous",
    "message": "Be very carreful it is really dangerous ! Oh my god !",
    "timestamp": 100641869789
}
```
