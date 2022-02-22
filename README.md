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

## Creating a Kwil Data Moat
Any person can create a moat on Kwil DB.  For the time being, we are allowing anybody to do so for free, however in the future, it will cost a token.
```js
const myMoat = await await KwilDB.createMoat('https://test-db.kwil.xyz', 'test-moat', 'mySuperSecretPassword', 'myWalletAddr')
const privateKey = myMoat.privateKey
const secret = myMoat.secret
```
In testnet, there is no way to retrieve a lost private key or secret.  The only way is for validators to vote to change the public key and for that private key to change the secret, however during testnet, this is not possible.

## Basic Queries
In order to access a Kwil Database, the client should use the KwilDB connector.  The connector interfaces with the Kwil Database, which then handles interactions with the underlying relational database (Postgres by default).  When accessed through the connector, the Kwil Database automatically handles synchronization.  All the client needs to do is specify if they want each query to propagate to the rest of the network.

In general, you will want all write operations to sync, while read operations do not sync.  By default, queries will not propagate.
```js
const kwilDB = KwilDB({
    host: 'test-db.kwil.xyz',
    protocol: 'https',
    moat: 'test',
    privateKey: privateKey,
}, secret)

//Query that will sync with the rest of the network
const result = await kwilDB.query('INSERT INTO ...', true)

//Query that won't sync with the rest of the network.
const result = await kwilDB.query('SELECT ...', false)

//Or, if unspecified, it will not sync.

const result = await kwilDB.query('SELECT ...')
```

## Images and Files
On top of a database, Kwil Databases come loaded with a full-featured file system.  Files will propagate across nodes just like queries, and can be accessed via the "public/{data_moat}" endpoint.  Currently, Kwil Databases only support files with no extensions (can be used for any data) and JPEGs.  The first input is the path to the file/image, the second is the file data, and the third is whether or not it should be propagated (false by default).

It is important to note that the beginning of the file path should just be the directory name, and should NOT contain './'.

Images that are submitted should be BASE64 encoded.  Depending on how you read in the image, there may be padding at the start (if you are using the NodeJS 'fs' module, this won't be a problem).  It is important that the padding is removed and only the raw image data is submitted.
```js
//Storing a file

const settingsData = {settings: ...}
await kwilDB.storeFile('users/satoshi/settings', settingsData, true) //Will propagate

//Storing a JPEG

let satoshiPFP = fs.readFileSync('./satoshiPFP')
satoshiPFP = satoshiPFP.toString('base64')

await kwilDB.storeJPEG('images/satoshi/profile_picture', satoshiPFP, true)
```

Images can be found at the /public/{moat}/ endpoint.

If the above image was sent to the data moat "satoshi-social", it would be found at https://test-db.kwil.xyz/public/satoshi-social/images/satoshi/profile_picture.jpg

## Prepared Statements
In order to prevent against SQL injection attacks, KwilDB ships with the ability for users to submit prepared statements.

```js
await kwilDB.preparedStatement(`INSERT INTO user_posts (post_id, post_text, post_owner) VALUES ($1, $2, $3)`, ['wnv47vn213re', 'Hello Permaweb!', 'satoshi'], true)
```