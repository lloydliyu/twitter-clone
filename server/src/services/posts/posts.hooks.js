const { authenticate } = require('@feathersjs/authentication').hooks;

const hooks = require('feathers-authentication-hooks');

const populate = require('feathers-populate-hook');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ 
      hooks.associateCurrentUser({
          as: 'author'
        })
      ],
    update: [
      hooks.restrictToOwner({
        ownerField: 'author'
      })
    ],
    patch: [
      hooks.restrictToOwner({
        ownerField: 'author'
      }) 
    ],
    remove: [ 
      hooks.restrictToOwner({
        ownerField: 'author'
      }) 
    ],
  },

  after: {
    all: [],
    find: [
      populate({
        author: {
          service: 'users',
          f_key: 'id',
          one: true
        },
        likes: {
          service: 'likes',
          l_key: 'post',
        },
      })
    ],
    get: [],
    create: [],
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
