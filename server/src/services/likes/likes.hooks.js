const { authenticate } = require('@feathersjs/authentication').hooks;

const hooks = require('feathers-authentication-hooks');

const populate = require('feathers-populate-hook');



module.exports = {
  before: {
    all: [ authenticate('jwt'), populate.compatibility() ],
    find: [],
    get: [],
    create: [
      hooks.associateCurrentUser({
          as: 'user'
        })
    ],
    update: [],
    patch: [],
    remove: [
      hooks.restrictToOwner({
        ownerField: 'user'
      }) 
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ (context) => {
      console.log(context);
      context.app.service('posts').patch(
        context.result.post, {
          $push: {likes: context.result}
        })
      },
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
