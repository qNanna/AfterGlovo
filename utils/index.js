// TODO: HASH
import crypto from 'crypto'

function getHash (data, encryption = 'sha256', encoding = 'base64') {
  return crypto.createHash(encryption).update(JSON.stringify(data)).digest(encoding)
}

export default {
  getHash
}
