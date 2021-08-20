import crypto from 'crypto'
import fs from 'fs/promises'

function getHash (data, encryption = 'sha256', encoding = 'base64') {
  return crypto.createHash(encryption).update(JSON.stringify(data)).digest(encoding)
}

async function readFile (path) {
  try {
    const buf = await fs.readFile(path)
    return JSON.parse(buf.toString())
  } catch {
    return null
  }
}
export default {
  getHash,
  readFile
}
