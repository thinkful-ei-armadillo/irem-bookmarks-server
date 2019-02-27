'use strict';

const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');

describe.only('BookMark Endpoints', function() {
  let db;
  before('make knex instance',() =>{
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  app.set('db', db);

  after('disconnect from db', () => db.destroy());
  
  before('clean the table', () => db('bookmarks').truncate());

  afterEach('delete bookmarks', ()=> db('bookmarks').truncate());

  describe('Given there are bookmarks', () => {
    const testBookmarks= [
      {
        id: 1,
        title: 'First test bookmark!',
        url: 'https://somesite.com',
        description: 'Online site to get things done',
        rating: 4
      },
      {
        id: 2,
        title: 'Second test bookmark!',
        url: 'https://someothersite.com',
        description: 'Online site to get help with getting things done',
        rating: 4
      }
    ];

    context('gets bookmarks', ()=>{
      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks);
      });
      
      it('GET/bookmarks responds with 200 and shows all bookmarks', () =>{
        return supertest(app).get('/bookmarks').expect(200, testBookmarks);
      });
    });
  });

});