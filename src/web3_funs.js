const Web3 = require('web3')
const web3 = new Web3('ws://127.0.0.1:7545')
const tabAbi = require('../build/contracts/CustomerTab.json')
const ownerAddress = '0x33c666579F78Df432CCd451037200937E88475e4'
const tabContract = new web3.eth.contract(tabAbi.abi, ownerAddress)
const { unixToFullTime } = require('./time_funs.js')

const pubKey = '0xa467f2ACA8801a63eA9bBA15d5D64344e9c3Abfe'
const privKey =
  'feca8d612d66376db05f92b83d14764dc7284e5327b3fec2bfe9a40067e961c0'

web3.eth.accounts.wallet.add({
  privateKey: privKey,
  address: pubKey,
})

const gasLimit = 500000

async function addItem(_customerPubKey, _itemID, _price) {
  let response = ''
  try {
    await tabContract.methods
      .addSaleForCustomer(_customerPubKey, _itemID, _price)
      .send({ from: ownerAddress, gas: gasLimit })
      .once('receipt', (receipt) => {
        response = { 0: receipt.transactionHash }
      })
    onabort('error', (error) => {
      response = error
    })
  } catch (err) {
    console.log(err)
  }
  return response
}

async function getTab(_customerPubKey) {
  try {
    result = await tabContract.methods.getTabForCustomer(_customerPubKey).call()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function resetTab(_customerPubKey) {
  try {
    await tabContract.methods
      .resetTab(_customerPubKey)
      .send({ from: ownerAddress, gas: gasLimit })
  } catch (err) {
    console.log(err)
  }
}

async function itemPaid(_customerPubKey, _itemID) {
  let response = ''
  try {
    await tabContract.methods
      .itemPaidByCustomer(_customerPubKey, _itemID)
      .send({ from: ownerAddress, gas: gasLimit })
      .once('receipt', (receipt) => {
        response = { 0: receipt.transactionHash }
      })
    onabort('error', (error) => {
      response = error
    })
  } catch (err) {
    console.log(err)
  }
  return response
}
