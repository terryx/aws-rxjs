const kmsRx = require('../../src/kms')

const kms = kmsRx({ region: 'ap-southeast-1' })
const keys = [
  'plaintextpassword',
  'plaintextpassword'
]
const params = { KeyId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxx' }

kms.encrypts(keys, params).subscribe(response => {
  console.log(response)
})
