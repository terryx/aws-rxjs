const AWS = require('aws-sdk')
const { Observable } = require('rxjs')

const constructor = (spec) => {
  const sqs = new AWS.SQS(spec)

  const sendMessage = (params) => {
    return Observable.fromPromise(sqs.sendMessage(params).promise())
  }

  const receiveMessages = (params, { throttle = 100, limit = 10 }) => {
    return Observable
        .interval(parseInt(throttle))
        .take(parseInt(limit))
        .mergeMap(count => {
          return Observable
            .fromPromise(sqs.receiveMessage(params).promise())
            .skipWhile(res => res.Messages === undefined)
            .map(res => res.Messages[0])
        })
        .toArray()
  }

  const deleteMessage = (params) => {
    return Observable.fromPromise(sqs.deleteMessage(params).promise())
  }

  return { sendMessage, receiveMessages, deleteMessage }
}

module.exports = constructor
