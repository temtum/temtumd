# Temtum node

[www.temtum.com](https://www.temtum.com/)

### Requirements
1. Node.js 10.11.2+
2. Git 1.7+
3. Redis 4+

### Installation

```
npm install
npm install pm2 -g
```

### Start

#### Setup environment
Create ```.env``` file by ```.env.example``` in the root folder.

To be able to receive new blocks add test NATS servers to ```NATS_SERVERS``` field in ```.env``` file.

```
NATS_SERVERS=nats://178.62.4.22:4222,nats://138.68.93.104:4222
```

Add test synchronization server address to ```SYNC_ADDRESS``` field in ```.env``` file for node synchronization with temtum network to work.

```
SYNC_ADDRESS=http://178.128.164.124:3001/v1
```

#### Development
```
npm run dev
pm2 log
```

#### Production
```
npm start
```

#### Block structure
```
{
    "index": number,
    "hash": string,
    "previousHash": string,
    "timestamp": number,
    "data": [{
        "type": "coinbase",
        "txIns": [{
            "txOutIndex": number
        }],
        "txOuts": [{
            "amount": number,
            "address": string
        }],
        "timestamp": number,
        "id": number
    }]
}
```
### Transaction creation
To create a transaction use [temtumjs-lib](https://github.com/temtum/temtumjs-lib) and send it to Temtum network using ```transaction/send``` endpoint.

#### Transaction structure
```
{
    "type": "regular",
    "txIns": [{
        "txOutIndex": number
        "txOutId": string,
        "amount": number,
        "address": string,
        "signature": string
    }],
    "txOuts": [
      {
          "amount": number,
          "address": string
      },
      {
          "amount": number,
          "address": string
      }
    ],
    "timestamp": number,
    "id": number
}
```
### Example
```
{
  "type": "regular",
  "txIns": [
    {
      "txOutIndex": 1,
      "txOutId": "a759dc3b2421aa2f3ed8e646c96d565fa7ba4113c963b7566fea81a5e5d6797a",
      "amount": 999994,
      "address": "03921738dadb4e40d22b9023b169fa2c03811c7022d915ec24a29fff288b660f49",
      "signature": "b2445ee21c4bae3051792586c1ac28e0a4cecc0b03dfbc0547e7f0287d9f7ea00ac8b870899d981bc8a095d8da0c44d7be2a9529d73d4570db73d8029b001da2"
    }
  ],
  "txOuts": [
    {
      "address": "030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1",
      "amount": 1
    },
    {
      "address": "03921738dadb4e40d22b9023b169fa2c03811c7022d915ec24a29fff288b660f49",
      "amount": 999993
    }
  ],
  "timestamp": 1562066406,
  "id": "959ab548a380033438f1d4d5612127185f96bc80421c046ea31792b9cab8c891"
}
```

## Endpoints

##### Get blockchain
```
curl http://localhost:3001/v1/blocks/:page(\d+)?
```
where *page: number* is not mandatory (return first page if no page set)\
Response: *{ blocks: array of objects(Block), pages: number }*

##### Get block by hash
```
curl http://localhost:3001/v1/block/:hash([a-zA-Z0-9]{64})
```
where *hash: string* is a hash of the block\
Response: *block: object(Block)*\
Example:
```
curl http://localhost:3001/v1/block/04bfcab8722991ae774db48f934ca79cfb7dd991229153b9f732ba5334aafcd8e7266e47076996b55a14bf9913ee3145ce0cfc1372ada8ada74bd287450313534b
```

##### Get block by index
```
curl http://localhost:3001/v1/block/:index(\\d+)
```
where *index: number* is an index of the block\
Response: *block: object(Block)*\
Example:
```
curl http://localhost:3001/v1/block/2
```

##### Flexible search method
```
curl -H "Content-type:application/json" --data '{"query" : "2"}' http://localhost:3001/v1/search
```
Provide search in blocks by hash and index and in transactions by hash.\
where *query* can be hash of block or transaction or index of a block(number)\
Response: *block: object(Block)* || *transaction: object(Transaction)*

##### Get transaction by id
```
curl http://localhost:3001/v1/transaction/:id([a-zA-Z0-9]{64})
```
where *id: string* (hash of the transaction)\
Response: *transaction: object*\
Example:
```
curl http://localhost:3001/v1/transaction/04bfcab8722991ae774db48f934ca79cfb7dd991229153b9f732ba5334aafcd8e7266e47076996b55a14bf9913ee3145ce0cfc1372ada8ada74bd287450313534b
```

##### Get balance
```
curl http://localhost:3001/v1/address/:address/balance
```
where *address: string* is wallet\
Response: *{balance: balance: number}*\
Example:
```
curl http://localhost:3001/v1/address/04bfcab8722991ae774db48f934ca79cfb7dd991229153b9f732ba5334aafcd8e7266e47076996b55a14bf9913ee3145ce0cfc1372ada8ada74bd287450313534b/balance
```

##### Create address

```
curl -X POST http://localhost:3001/v1/address/create
```
Response: *{address: address}*, where *address: string*

- clean the database:
```
npm run clear:db
```
