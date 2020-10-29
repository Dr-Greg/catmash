# catmash

CatMash is a FaceMash like application for cats, implemented in NodeJS

## Production

This app is deployed @ **https://catmash2020.herokuapp.com**
The front-end application is deployed @ **https://catmash-app.netlify.app/**

## Development

To install **CatMash** in a development environment:

```sh
echo "DB_NAME=catmash
DB_CONNECTION_STRING=localhost:27013
" >> .env
git clone https://github.com/Dr-Greg/catmash.git
cd catmash
npm i
npm run dev
```

**NOTE**: You must first install a local MongoDB on port 27013 OR change the env vars to match your mongo setup

## API endpoints

### POST /api/round {previous: [<mongoid>]}

**expects** : an Object with key "previous:[]" that contains Strings of mongodb ObjectIds. The array can by empty

**returns** : an Array of Objects, ex:

```JSON
[
  {
    "score": 952,
    "_id": "5f9a9e39017c595212d2c73b",
    "id": "2pp",
    "url": "http://25.media.tumblr.com/tumblr_kstpz9IxDK1qzefipo1_250.gif",
    "__v": 0
  },
  {
    "score": 1013,
    "_id": "5f9a9e39017c595212d2c761",
    "id": "is",
    "url": "http://29.media.tumblr.com/tumblr_ly4w9oJVgE1r189uao1_500.jpg",
    "__v": 0
  }
]
```

### PUT /api/vote

**expects** : an Object with key "vote:[2]". ex:

```JSON
{
	 "vote":[
		 { "_id": "5f9a9e39017c595212d2c745", "score": 1000, "win": true },
		 { "_id": "5f9a9e39017c595212d2c745", "score": 1000, "win": false }
	 ]
}
```

```JSON
[
  {
    "score": 1009,
    "_id": "5f9a9e39017c595212d2c747",
    "id": "27m",
    "url": "http://27.media.tumblr.com/tumblr_lh6ywkF22D1qfyzelo1_1280.jpg",
    "__v": 0
  },
  {
    "score": 1032,
    "_id": "5f9a9e39017c595212d2c785",
    "id": "dp",
    "url": "http://28.media.tumblr.com/tumblr_ly7rtpsCSc1qgop81o1_1280.jpg",
    "__v": 0
  }
]
```

**returns** : an Array of Objects, ex:

```JSON
[
  {
    "_id": "5f9a9e39017c595212d2c745",
    "score": 1010,
    "win": true
  },
  {
    "_id": "5f9a9e39017c595212d2c745",
    "score": 990,
    "win": true
  }
]
```

## Test

To test the application:

```sh
npm run test
```
