# NODEPOP

Nodejs project for KeepCoding VI Bootcamp Web.

>**Important!** Annotations for DevOps practice are founded in [DEVOPS.md](./docs/DEVOPS.md).
> * Check static site on http://13.53.198.66/.
> * Check Nodepop on http://ec2-13-53-198-66.eu-north-1.compute.amazonaws.com/

0. [Requirements](#0.-requirements)
1. [Configuration](#1.-configuration)
2. [Use API](#2.-use-api)
3. [Use website](#3.-use-website)
4. [Docs](#4.-docs)
5. [EXTRAS](#5.-extras)

## 0. Requirements

* Node version 11 -> Use `nvm` is recommended.
* MongoDB v3.6.3 -> `sudo apt-get install mongodb`

## 1. Configuration

### Install dependencies

```shell
$ npm install
```

### Generate .env file

Execute next command to create a copy of `.env.example` and edit it your way:

```shell
$ cp .env.example .env
```

### Init database

Below command **will delete your current database** and will load base data. Go to `lib/connectMongoose.js` for checking the connection to database.

```shell
$ npm run install-db
```

### Generate SSL certificates

**Must have installed** [`mkcert`](https://github.com/FiloSottile/mkcert#installation)

```shell
$ mkdir certificates
$ npm run generate-certs
```

### Run the app

With pm2 in any environment. **Necessary** to run `thumbnail-microservice` join to nodepop.
```shell
# To start pm2
$ npm run pm2-start
# To use pm2 commands
$ npm run pm2 
```

Just nodepop on develop environment:

```shell
$ npm start
$ npm run dev
```

Just nodepop on production environment:

```shell
$ npm run build
```

> **Important!** If you obtain `Port XX requires elevated privileges` running the app, execute commands with **sudo**.

[Go to index](#nodepop)

## 2. Use API

### GET ads

GET: https://localhost:3001/api/v1/ads

You can filter results adding any of below query parameters:

- **start**: number where the initialization starts.
- **limit**: number to limit the obtained results.
- **sort**: string to order the results. Can be `name`, `sale` or `price`.
- **name**: search for ads which begin with this string.
- **tag**: search for ads which contains this tag. Add more `tag` parameter to add tags.
- **sale**: boolean to filter ads by sale.
- **price**: can be `range of prices` (10-50), `higher price` (10-), `lower price` (-50) or `price` (25.2).

Examples:

- https://localhost:3001/api/v1/ads?start=1&limit=3&sort=name&tag=lifestyle
- https://localhost:3001/api/v1/ads?tag=mobile&sale=false&name=ip&price=50-&start=0&limit=2&sort=price

### GET tags

GET: https://localhost:3001/api/v1/tags

### POST authenticate

POST: https://localhost:3001/api/v1/authenticate

Necessary body parameters to authenticate:

- **email**: string, user email.
- **password**: string, user password.

This request return a **JWT** used in request with authentication.

### POST ads

POST: https://localhost:3001/api/v1/ads

Necessary header to authenticate:

- **authenticate**: string, user token with format `Bearer <JWT_TOKEN>`.

Necessary body parameters to post ad:

- **name**: string, name of the ad.
- **sale**: boolean, true for sale, false for search.
- **price**: numeric, price for sale or search for.
- **tags**: string, can be `work`, `lifestyle`, `motor` or/and `mobile`. Add more tags parameter to add tags.
- **picture**: string, name of the picture file on server (`./public/images/`).

[Go to index](#nodepop)

## 3. Use website

### Home

Access to https://localhost:3001/

### Filter ads

Add to url any of query parameters used in [API GET ads](#get-ads). Examples:

- https://localhost:3001/?start=1&limit=3&sort=name&tag=lifestyle
- https://localhost:3001/?tag=mobile&sale=false&name=ip&price=50-&start=0&limit=2&sort=price

[Go to index](#nodepop)

## 4. Docs

- [CHANGELOG.md](./docs/CHANGELOG.md)
- [DEVOPS.md](./docs/DEVOPS.md)
- [MONGO.md](./docs/MONGO.md)
- [TASKS.md](./docs/TASKS.md)
- [TODO.md](./docs/TODO.md)

[Go to index](#nodepop)

## 5. EXTRAS

https://prettier.io/docs/en/options.html

[Go to index](#nodepop)
