# CHANGELOG

[README](../README.md) / CHANGELOG

## v2.0

- Redirect from HTTP to HTTPS. (Deactivated currently)
- Added default configuration in [.env.example](../.env.example) file.
- Internationalization of nodepop.
- Added users for private API requests.
- Configured authentication with Bearer token for private API requests.
- Added capability for upload image on API request.
- Create micro-service for get thumbnail from upload image.
- Refactorized many files.

## v1.1

Fixed issues from teacher:

- Indexes on database fields.
- Abstract functions on modules.
- Integrated Prettier + ESLint + Airbnb. [Followed steps](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a).

## v1.0

Basic practice version. Include:

- List of ads with filters via API and website.
- List of tags via API.
- Register of ad via API.
- Homepage with simple EJS design.
- Initialization script of database.
- README doc with use instructions.
