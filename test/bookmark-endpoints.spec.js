'use strict';

const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');

describe('BookMark Endpoints', function() {
  let db;
  before('make knex instance',() =>{
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

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

    context('when the db have bookmarks', ()=>{
      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks);
      });
      
      it('GET/bookmarks responds with 200 and shows all bookmarks', () =>{
        return supertest(app).get('/bookmarks').expect(200, testBookmarks);
      });

      it('GET/bookmarks/:id responds with 200 and shows that bookmark', ()=>{
        const id=2;
        const expectedBookmark=testBookmarks[id-1];
        return supertest(app)
          .get(`/bookmarks/${id}`)
          .expect(200, expectedBookmark);
      });

      it('POST bookmark, responds with 201 and new bookmark',() =>{
        const newBookmark={
          title: 'Test newbookmark!',
          url: 'https://somesite.com',
          description: 'Online site to test things',
          rating: 3
        };
        return supertest(app)
          .post('/bookmarks');
      });

      it('responds with 400 and an error message when title is missing', () =>{
        return supertest(app)
          .post('/bookmarks')
          .send({
            url: 'https://somesite.com',
            description: 'Online site to test things',
            rating: 3
          }) 
          .expect(400, {
            error: {message: 'Missing \'title\' in request body'}
          });
      });

      it('responds with 204 and removes the article',()=>{
        const id=2;
        const expectedBookmarks=testBookmarks.filter(b => b.id !==id);
        return supertest(app)
          .delete(`/bookmarks/${id}`)
          .expect(204)
          .then(res => {
            supertest(app)
              .get('bookmarks')
              .expect(expectedBookmarks);
          });
      });
    });

    context('when the db have NO bookmarks', ()=>{
      it('responds with 404', () => {
        const id=491;
        return supertest(app)
          .delete(`/bookmarks/${id}`)
          .expect(404, {error: {message: 'Bookmark doesn\'t exist'}});
      });
    });
    
  });

});