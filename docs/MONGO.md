# MONGO

## Usefull commands

Firstly connect to your mongo db

```shell
$ mongo mongodb://localhost/nodepop
```

Now you are in mongo shell.

```shell
# list of all databases
> show dbs
# use <database>
> use nodepop
# list of collections from used database
> show collections
# see data of <collection>
> db.ads.find()
> db.ads.find().pretty()
# remove <collection>
> db.sessions.drop()
```