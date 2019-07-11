// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, method, result, params } = context;
    
    const posts = method === 'find' ? result.data : [ result ];
    
    await Promise.all(posts.map(async post => {
      likes = await app.service('likes').find({query: {postId: post._id}});
      post.likes = likes.total;
    }));
    
    return context;
  };
};
