const sqsRx = require('../../src/sqs')
const sqs = sqsRx({ region: 'ap-southeast-1' })

const params = {
  QueueUrl: 'QueueUrl',
  AttributeNames: ['All'],
  MessageAttributeNames: ['All'],
  VisibilityTimeout: 10,
  WaitTimeSeconds: 0,
  MaxNumberOfMessages: 1
}

const extraParams = {
  throttle: 100,
  limit: 10
}

sqs.receiveMessages(params, extraParams).subscribe({
  next: res => {
    console.log(res)
  },
  error: err => {
    console.error(err)
  }
})
