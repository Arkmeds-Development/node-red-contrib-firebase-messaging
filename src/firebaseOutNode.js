function FirebaseOutNode(config) {
  if (!config.admin) {
    throw "No firebase admin specified";
  }

  this.messaging = config.admin.messaging;
  this.kind = config.kind === "notification" ? "notification" : "data";
	this.onStatus = ()=>{}
}

FirebaseOutNode.prototype.onInput = function(msg, out) {
  // send msg, on ok call out, error call errorcb
  const { topic, payload, token } = msg;

  if (!payload || Array.isArray(payload) || typeof payload !== 'object' || Object.keys(payload).length === 0){
    out({'payload': 'MessageId not returned'})
    return;
  }

  msg.debug = payload;
  const message = {};
  if (payload.data !== null)
    message.data = payload.data;

  if (payload.notification !== null)
    message.notification = payload.notification;

  if (token){
    message.token = token;
    message.android = {
      "ttl": 0
    };
  } else {
    message.topic = topic;
    message.android = {
      "ttl": 60000
    };
  }

  this.messaging.send(message)
  .then((response) => {
    msg.firebaseResponse = response;
    out(msg);
  })
  .catch((error) => {
    msg.firebaseError = error;
    out(msg);
  });
};

FirebaseOutNode.prototype.setStatusCallback = function(cb) {
	this.onStatus = cb;
};

module.exports = FirebaseOutNode
