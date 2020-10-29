# catmash

CatMash is a FaceMash like application for cats, implemented in NodeJS

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
