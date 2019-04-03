# NODEPOP

Nodejs project for KeepCoding VI Bootcamp Web.

1. [Configuration](#1.-configuration)
2. [Use API](#2.-use-api)
3. [Use website](#3.-use-website)
4. [Changelog](#4.-changelog)

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
$ npm run build
```

On develop environment:
```shell
$ npm start
$ npm run dev
```

[Go to index](#nodepop)

## 2. Use API

### GET ads
GET: http://localhost:3001/api/v1/ads

You can filter results adding any of below query parameters:

* **start**: number where the initialization starts.
* **limit**: number to limit the obtained results.
* **sort**: string to order the results. Can be `name`, `sale` or `price`.
* **name**: search for ads which begin with this string.
* **tag**: search for ads which contains this tag. Add more `tag` parameter to add tags.
* **sale**: boolean to filter ads by sale.
* **price**: can be `range of prices` (10-50), `higher price` (10-), `lower price` (-50) or `price` (25.2).

Examples:
* http://localhost:3001/api/v1/ads?start=1&limit=3&sort=name&tag=lifestyle
* http://localhost:3001/api/v1/ads?tag=mobile&sale=false&name=ip&price=50-&start=0&limit=2&sort=price

### GET tags
GET: http://localhost:3001/api/v1/tags

### POST ad
POST: http://localhost:3001/api/v1/ads

Necessary body parameters to post ad:

* **name**: string, name of the ad.
* **sale**: boolean, true for sale, false for search.
* **price**: numeric, price for sale or search for.
* **tags**: string, can be `work`, `lifestyle`, `motor` or/and `mobile`. Add more tags parameter to add tags.
* **picture**: string, name of the picture file on server (`./public/images/`).

[Go to index](#nodepop)

## 3. Use website

### Home

Access to http://localhost:3001/

### Filter ads

Add to url any of query parameters used in [API GET ads](#get-ads). Examples:

* http://localhost:3001/?start=1&limit=3&sort=name&tag=lifestyle
* http://localhost:3001/?tag=mobile&sale=false&name=ip&price=50-&start=0&limit=2&sort=price

[Go to index](#nodepop)

## 4. CHANGELOG

### v1.1

Fixed issues from teacher:
* Indexes on database fields.
* Abstract functions on modules.

### v1.0

Basic practice version. Include:
* List of ads with filters via API and website.
* List of tags via API.
* Register of ad via API.
* Homepage with simple EJS design.
* Initialization script of database.
* README doc with use instructions.

[Go to index](#nodepop)

## 5. EXTRAS

https://prettier.io/docs/en/options.html