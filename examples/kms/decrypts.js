const kmsRx = require('../../src/kms')

const kms = kmsRx({ region: 'ap-southeast-1' })
const keys = [
  'base64textkeys',
  'base64textkeys'
]

kms.decrypts(keys).subscribe(response => {
  console.log(response)
})
