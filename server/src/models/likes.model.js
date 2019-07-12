// likes-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const likes = new Schema({
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'users'
    },
    post: { 
      type: Schema.Types.ObjectId, 
      ref: 'posts', 
      required: true
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('likes', likes);
};
