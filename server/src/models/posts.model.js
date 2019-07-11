// posts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  
  const posts = new Schema({
    body: { 
      type: String, 
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    imageUrl: {
      type: String,
    },
    likes: [{type: Schema.Types.ObjectId, ref: 'likes'}]
  }, {
    timestamps: true,
  });

  return mongooseClient.model('posts', posts);
};
