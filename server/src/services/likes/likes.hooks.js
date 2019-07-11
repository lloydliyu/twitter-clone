const { authenticate } = require('@feathersjs/authentication').hooks;

const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      hooks.associateCurrentUser({
          as: 'userId'
        })
    ],
    update: [],
    patch: [],
    remove: [
      hooks.restrictToOwner({
        ownerField: 'userId'
      }) 
    ]
  },

  after: {
    all: [],
    find: [],
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
