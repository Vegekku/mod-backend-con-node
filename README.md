# NODEPOP

## 1. Configuration

### Install dependencies
```shell
$ npm install
```

### Init database
Below command **will delete your current database** and will load base data. Go to `lib/connectMongoose.js` for checking the connection to database.
```shell
$ npm run install-db
```

### Run the app
On production environment:
```shell
$ npm start
```

On develop environment:
```shell
$ npm run dev
```

## 2. Use API

### GET ads
GET: http://localhost:3001/api/v1/ads

## 3. Use website

### Home
Access to http://localhost:3001/