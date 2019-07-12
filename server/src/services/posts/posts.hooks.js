const { authenticate } = require('@feathersjs/authentication').hooks;

const authhook = require('feathers-authentication-hooks');

const hooks = require('feathers-hooks-common');

const populateSchema = {
  include: [{ 
    service: 'users',
    nameAs: 'author',
    parentField: 'author',
    childField: '_id',
  },
  {
    service: 'likes',
    nameAs: 'likes',
    asArray: true,
    select: (hook, parentItem) => ({ post: parentItem._id }),
  }],
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ 
      authhook.associateCurrentUser({
          as: 'author'
        })
      ],
    update: [
      authhook.restrictToOwner({
        ownerField: 'author'
      }),
      hooks.dePopulate(),
    ],
    patch: [
      authhook.restrictToOwner({
        ownerField: 'author'
      }) 
    ],
    remove: [ 
      authhook.restrictToOwner({
        ownerField: 'author'
      }) 
    ],
  },

  after: {
    all: [hooks.populate({ schema: populateSchema})],
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
