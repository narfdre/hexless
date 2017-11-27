'use strict';

var kafka = require('kafka-node'),
Producer = kafka.Producer,
KeyedMessage = kafka.KeyedMessage,
client = new kafka.Client('zookeeper.kubeless.svc.cluster.local:2181/'),
producer = new Producer(client),
payloads = [
    { topic: 'event_test', messages: 'hi from kafka' }
];

module.exports = {
  publish: (req, res) => {
    console.log('waiting for ready...')
    producer.on('ready', function () {
      console.log('ready');
      producer.send(payloads, function (err, data) {
        console.log('THIS WAS THE ERROR: ', err)
        console.log('MESSAGE SENT: ', data);
        res.end('Done sending message')
      });
    });

    producer.on('error', function(err){
      res.end('error!' + err)
    })
  }
};