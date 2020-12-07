const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {
  addItem,
  removeItem,
  resetTab,
  getTab,
  trackAdded,
  trackRemoved,
  trackAll,
} = require('./src/web3_funs.js')
const { ipfsInit, ipfsAdd, ipfsGet } = require('./src/ipfs_funs.js')
const { cat } = require('ipfs/src/core/components')

let ipfsNode

// create application/json parser
var jsonParser = bodyParser.json()

// Location of libraries
app.use(express.static('src'))

// Sets path variable
const path = __dirname + '/views/'

app.get('/', (req, res) => {
  res.sendFile(path + 'index.html')
})

app.post('/addItem', jsonParser, (req, res) => {
  addItem(req.body.pubkey, req.body.itemID, req.body.price)
    .then((response) => {
      res.send(response)
    })
    .catch((e) => {
      res.status(500, {
        error: e,
      })
    })
})

app.post('/removeItem', jsonParser, (req, res) => {
  removeItem(req.body.pubkey, req.body.itemID)
    .then((response) => {
      res.send(response)
    })
    .catch((e) => {
      res.status(500, {
        error: e,
      })
    })
})

app.post('/getTab', jsonParser, (req, res) => {
  getTab(req.body.pubkey)
    .then((response) => {
      res.send(response)
    })
    .catch((e) => {
      res.status(500, {
        error: e,
      })
    })
})

app.post('/resetTab', jsonParser, (req, res) => {
  resetTab(req.body.pubkey)
    .then((response) => {
      res.send(response)
    })
    .catch((e) => {
      res.status(500, {
        error: e,
      })
    })
})

// Initiate IPFS node
ipfsNode = ipfsInit()

app.post('/ipfsAdd', jsonParser, (req, res) => {
  ipfsNode.then((ipfsNode) => {
    ipfsAdd(ipfsNode, req.body.newInfo)
      .then((response) => {
        res.send(response)
      })
      .catch((e) => {
        res.status(500, {
          error: e,
        })
      })
  })
})

app.post('/ipfsGet', jsonParser, (req, res) => {
  ipfsNode.then((ipfsNode) => {
    ipfsGet(ipfsNode, req.body.newInfo)
      .then((response) => {
        res.send(response)
      })
      .catch((e) => {
        res.status(500, {
          error: e,
        })
      })
  })
})

async function main() {
  const data = 'hello world'
  let added = await add(node, data)
  console.log(added)
  let retrived = await get(node, added.path)
  console.log(retrived.toString())
}

app.listen(8081, () => {
  console.log('Site available at: http://127.0.0.1:8081')
})
