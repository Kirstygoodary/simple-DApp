const IPFS = require('ipfs')
const all = require('it-all')

/**
 * Initialises local IPFS node
 */
async function ipfsInit() {
  try {
    const node = await IPFS.create()
    return node
  } catch (e) {
    console.log(e)
  }
}

/**
 * Adds a file to IPFS
 * @param {IPFS node} node
 * @param {buffer} data
 */
async function ipfsAdd(node, data) {
  try {
    return await node.add(data)
  } catch (e) {
    console.log(e)
  }
}

/**
 * Retrieves data behind CID on IPFS
 * @param {IPFS node} node
 * @param {string} cid
 */
async function ipfsGet(node, cid) {
  try {
    const data = Buffer.concat(await all(node.cat(cid)))
    return { 0: data.toString() }
  } catch (e) {
    console.log(e)
  }
}

module.exports = { ipfsInit, ipfsAdd, ipfsGet }
