'use strict';

const BookmarkService = {
  getAllBookmarks(db){
    return db.select('*').from('bookmarks');
  },

  insertBookmark(db, newBookmark) {
    return db
      .insert(newBookmark)
      .into('bookmarks')
      .returning('*')
      .then(rows => rows[0]);
  },

  getById(db, id) {
    return db.from('bookmarks').select('*').where('id', id).first();
  },

  deleteBookmark(db, id) {
    return db('bookmarks')
      .where({ id })
      .delete();
  },

  updateBookmark(db, id, newBookmarkFields) {
    return db('bookmarks')
      .where({ id })
      .update(newBookmarkFields);
  },

};

module.exports = BookmarkService;