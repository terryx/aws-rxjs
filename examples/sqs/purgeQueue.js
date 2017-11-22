const sqsRx = require('../../src/sqs')
const sqs = sqsRx({ region: 'ap-southeast-1' })

const params = {
  QueueUrl: 'QueueUrl'
}

sqs.purgeQueue(params).subscribe({
  next: res => {
    console.log(res)
  },
  error: err => {
    console.error(err)
  }
})
