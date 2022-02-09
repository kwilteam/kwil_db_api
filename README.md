API for connecting with a Kwil Database

We will write and link documentation for how to set up a Kwil Database soon.

# Introduction

This repo is a basic toolkit for interacting with Kwil Databases.  Please note that, while we try our hardest to create the highest quality developer experience, that there will be some bugs, as up until very recently, Kwil Databases were only used by Kwil Social.  Please notify us of any bugs, errors, or improvements you would like to see by emailing brennan@kwil.com.

At face value, a Kwil Database is very similar to a normal relational database.  Under the hood, each node uses a Postgresql database for storing its own data.  Each node contains an application built around this database to allow for inter-database synchronization, distributed filesystem capabilities, and snapshot backups (stored on the blockchain, of course!).

In the near future, we can expect functionality for fully encrypted distributed databases, a native ORM / SQL Builder, and the ability to switch between instant and block-based syncrhonization methods.

## Initialize:
```
npm install kwildb
```

```js
const KwilDB = require('kwildb')
```

## Basic Queries
In order to access a Kwil Database, the client should use the KwilDB connector.  The connector interfaces with the Kwil Database, which then handles interactions with the underlying relational database (Postgres by default).  When accessed through the connector, the Kwil Database automatically handles synchronization.  All the client needs to do is specify if they want each query to propagate to the rest of the network.

In general, you will want all write operations to sync, while read operations do not sync.  By default, queries will not propagate.
```js
const connector = KwilDB({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    user: 'kwil',
    password: 'password',
    moat: 'testmoat'
})

//Query that will sync with the rest of the network
const result = await connector.query('INSERT INTO ...', true)

//Query that won't sync with the rest of the network.
const result = await connector.query('SELECT ...', false)

//Or, if unspecified, it will not sync.

const result = await connector.query('SELECT ...')
```

## WebSocket (Currently Experimental)
By default, each Kwil Database utilizes a connection pool when interacting with the underlying database.  However, since the client is interfacing with the Kwil Database, we must use WebSockets in order to achieve the same effect.
```js
const kwilSocket = connector.createWebSocket()

kwilSocket.ws.on('message', function(_message) {
    //If the database returns a result, we will need to parse it.  If it returns an error, it will fail to parse
    try {
        console.log(JSON.parse(_message)) //This will be what the query returns
    } catch(e) {
        console.log(_message) //Console logging the error message returned by database
    }
    
})

kwilSocket.query('SELECT ...', false)
```

Currently, only support for queries is built into WebSockets, however full photo, file, and transaction functionality will exist soon.

## Transactions
Kwil Databases allow for SQL transactions with automatic rollbacks.  The Kwil Database will automatically execute your queries sequentially, and rollback if any fail.

Transactions can also be set to propagate on commit.  If a transaction is set to propagate but triggers a rollback, it will not propagate.
```js
const myTransaction = connector.createTransaction()

myTransaction.begin()
myTransaction.query('INSERT INTO ...') //It is worth noting that there is no second input here for propagating this query
myTransaction.query('UPDATE ...')
myTransaction.commit(true) //by passing "true" to commit, the entire transaction will propagate if it does not rollback
```

## Images and Files
On top of a database, Kwil Databases come loaded with a full-featured file system.  Files will propagate across nodes just like queries, and can be accessed via the "public/{data_moat}" endpoint.  Currently, Kwil Databases only support files with no extensions (can be used for text) and JPEGs.  The first input is the path to the file/image, the second is the file data, and the third is whether or not it should be propagated (false by default).

It is important to note that the beginning of the file path should just be the directory name, and should NOT contain './'.

Images that are submitted should be BASE64 encoded.  Depending on how you read in the image, there may be padding at the start (if you are using the NodeJS 'fs' module, this won't be a problem).  It is important that the padding is removed and only the raw image data is submitted.
```js0x
//Storing a file

const settingsData = {settings: ...}
await connector.storeFile('users/satoshi/settings', settingsData, true) //Will propagate

//Storing a JPEG

let satoshiPFP = fs.readFileSync('./satoshiPFP)
satoshiPFP = satoshiPFP.toString('base64')

await connector.storeJPEG('images/satoshi/profile_picture', satoshiPFP, true)
```