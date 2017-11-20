const AWS = require('aws-sdk')
const { Observable } = require('rxjs')

const constructor = (spec) => {
  const kms = new AWS.KMS(spec)

  const encrypt = ({ KeyId, Plaintext }) => {
    const credential = {
      KeyId,
      Plaintext: Buffer.from(Plaintext)
    }

    return Observable
      .fromPromise(kms.encrypt(credential).promise())
      .map(data => Buffer.from(data.CiphertextBlob, 'utf-8').toString('base64'))
  }

  const decrypt = (CiphertextBlob) => {
    const credential = {
      CiphertextBlob: Buffer.from(CiphertextBlob, 'base64')
    }

    return Observable
       .fromPromise(kms.decrypt(credential).promise())
       .map(data => String(data.Plaintext))
  }

  const encrypts = (Plaintexts, { KeyId }) => {
    return Observable
      .from(Plaintexts)
      .map(Plaintext => encrypt({ Plaintext, KeyId }))
      .toArray()
      .switchMap(data => Observable.zip.apply(null, data))
  }

  const decrypts = (CiphertextBlobs) => {
    return Observable
        .from(CiphertextBlobs)
        .map(CiphertextBlob => decrypt(CiphertextBlob))
        .toArray()
        .switchMap(data => Observable.zip.apply(null, data))
  }

  return { encrypts, decrypts }
}

module.exports = constructor
