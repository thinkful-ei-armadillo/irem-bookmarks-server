'use strict';

const express = require('express');
const xss = require('xss');
const BookmarkService = require('./service');

const bookmarkRouter = express.Router();

bookmarkRouter
  .route('/bookmarks')
  .get((req,res, next)=>{
    const db= req.app.get('db');
    BookmarkService.getAllBookmarks(db)
      .then(bookmarks => res.json(bookmarks))
      .catch(next);
  })
  .post((req,res, next)=>{
    console.log(req.body);
    const {title, url, description, rating} = req.body;
    const newBookmark ={title, url, description, rating};
    if (!title) {
      return res.status(400).json({
        error: { message: 'Missing \'title\' in request body' }
      });
    }

    if (!url) {
      return res.status(400).json({
        error: { message: 'Missing \'url\' in request body' }
      });
    }

    if (!rating) {
      return res.status(400).json({
        error: { message: 'Missing \'rating\' in request body' }
      });
    }
    
    BookmarkService.insertBookmark(
      req.app.get('db'), 
      newBookmark
    )
      .then(bookmark =>{
        res
          .status(201)
          .location(`/bookmarks/${bookmark.id}`)
          .json({
            id: bookmark.id,
            title: xss(bookmark.title),
            url: xss(bookmark.url),
            description: xss(bookmark.description),
            rating: bookmark.rating
          });
      })
      .catch(next);
  });
  
bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res, next)=>{
    const db=req.app.get('db');
    BookmarkService.getById(db, req.params.id)
      .then(bookmark => {
        if(!bookmark){
          return res.status(404).json({error: {message: 'Bookmark doesn\'t exist'}
          });
        }
        res.json(bookmark);
      })
      .catch(next);
  })
  .delete((req,res, next)=>{
    const db=req.app.get('db');
    const id =req.params.id;
    BookmarkService.getById(db, req.params.id)
      .then(bookmark => {
        if(!bookmark) {
          return res.status(404).json({error: {message: 'Bookmark doesn\'t exist'}});
        }
      })
      .catch(next);
   
      
    BookmarkService.deleteBookmark(
      req.app.get('db'),
      req.params.id
    )
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  });

module.exports = bookmarkRouter;