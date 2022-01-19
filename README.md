This API is very easy to use right now.

## Initialize:

```
import createConnector from 'index.js'

const connector = await createConnector({
    host: 'localhost',
    protocol: 'http',
    database: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'password',
    moat: 'testmoat'
})

await connector.query('Some sql statement')
```

It's that easy