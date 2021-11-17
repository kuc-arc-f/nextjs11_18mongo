# nextjs11_18mongo

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/11/14

 update  :

***
### Summary

Next.js 11 + apollo-server-micro + headlessCMS + mongoDB, vercel sample


***
### headless CMS

https://github.com/kuc-arc-f/headless-1-ts

***
### Setup

* npm install

* apollo-client.ts

uri: if change domain, setting require
```
uri: 'http://localhost:3000/graphql',
```

* next.config.js : MONGODB_URI: mongodb+srv setting, user, password, cluster, dbname

* headlessCMS: MY_SITE_ID, MY_API_KEY, API_URL

```
MONGODB_URI: "mongodb+srv://username:<<password>>@cluster0.db1234.mongodb.net/dbname",
MONGODB_DB_NAME: "test",

MY_SITE_ID: "1111",
MY_API_KEY: "1111",
API_URL: "http://localhost:3001",
```


***
### Start server
* start :

yarn dev

***
### Blog:


***

