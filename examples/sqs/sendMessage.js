const sqsRx = require('../../src/sqs')
const sqs = sqsRx({ region: 'ap-southeast-1' })

const message = { parcel_id: 1 }
const params = {
  MessageBody: JSON.stringify(message),
  QueueUrl: 'QueueUrl'
}

sqs.sendMessage(params).subscribe(response => {
  console.log(response)
  /* { ResponseMetadata: { RequestId: '5f287f3a-4e04-5593-a850-2db6d06cb802' },
  MD5OfMessageBody: 'd8aedd7aa37124f798f4145b42bb442f',
  MessageId: '1ed4f528-e5fe-41ba-a0cb-39a1424ac9af' }
  */
})
