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
//Node.js
const KwilDB = require('kwildb')
//JS
import KwilDB from 'kwildb';
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

## Troubleshooting and known issues.

This API depends on Web3, which can cause some issues when used in web development. The following are solutions for using this API with various JS frameworks.

### Web3 and Create-react-app

If you are using create-react-app version >=5 you may run into issues building. This is because NodeJS polyfills are not included in the latest version of create-react-app.

### Solution


- Install react-app-rewired and the missing modules

If you are using yarn:
```bash
yarn add --dev react-app-rewired process crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer
```

If you are using npm:
```bash
npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```

- Create `config-overrides.js` in the root of your project folder with the content:

```javascript
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}
```

- Within `package.json` change the scripts field for start, build and test. Instead of `react-scripts` replace it with `react-app-rewired`

before:
```typescript
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},
```

after:
```typescript
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

The missing Nodejs polyfills should be included now and your app should be functional with web3.
- If you want to hide the warnings created by the console:

In `config-overrides.js` within the `override` function, add:

```javascript
config.ignoreWarnings = [/Failed to parse source map/];
```

### Web3 and Angular

### New solution

If you are using Angular version >11 and run into an issue building, the old solution below will not work. This is because polyfills are not included in the newest version of Angular.

- Install the required dependencies within your angular project:

```bash
npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify
```

- Within `tsconfig.json` add the following `paths` in `compilerOptions` so Webpack can get the correct dependencies

```typescript
{
    "compilerOptions": {
        "paths" : {
        "crypto": ["./node_modules/crypto-browserify"],
        "stream": ["./node_modules/stream-browserify"],
        "assert": ["./node_modules/assert"],
        "http": ["./node_modules/stream-http"],
        "https": ["./node_modules/https-browserify"],
        "os": ["./node_modules/os-browserify"],
    }
}
```

- Add the following lines to `polyfills.ts` file:

```typescript
import { Buffer } from 'buffer';

(window as any).global = window;
global.Buffer = Buffer;
global.process = {
    env: { DEBUG: undefined },
    version: '',
    nextTick: require('next-tick')
} as any;
```

### Old solution

If you are using Ionic/Angular at a version >5 you may run into a build error in which modules `crypto` and `stream` are `undefined`

a work around for this is to go into your node-modules and at `/angular-cli-files/models/webpack-configs/browser.js` change  the `node: false` to `node: {crypto: true, stream: true}` as mentioned [here](https://github.com/ethereum/web3.js/issues/2260#issuecomment-458519127)

Another variation of this problem was an [issue opned on angular-cli](https://github.com/angular/angular-cli/issues/1548)