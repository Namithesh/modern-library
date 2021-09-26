const { getAllArticles, getArticleDetails, saveArticle, deleteArticleById } = require('./models/articles');
const { getAllFeedback, getFeedbackDetails, saveFeedback } = require('./models/feedbacks');
const { getAllGallery, saveToGallery } = require('./models/gallery');
const { getAllBooks, getBooksBySearch, saveBook } = require('./models/books');
const { getAllBookTransaction, saveBookTransaction, deleteBookTransactionById } = require('./models/book_transactions');
const { getAllEvents, addEvent, deleteEventById } = require('./models/events');
const { getAllUsers } = require('./models/users');

module.exports.getAllUsers = getAllUsers;

module.exports.getAllBookTransaction = getAllBookTransaction;
module.exports.saveBookTransaction = saveBookTransaction;
module.exports.deleteBookTransactionById = deleteBookTransactionById;

module.exports.getAllArticles = getAllArticles;
module.exports.saveArticle = saveArticle;
module.exports.getArticleDetails = getArticleDetails;
module.exports.deleteArticleById = deleteArticleById;

module.exports.getAllGallery = getAllGallery;
module.exports.saveToGallery = saveToGallery;

module.exports.getAllBooks = getAllBooks;
module.exports.getBooksBySearch = getBooksBySearch;
module.exports.saveBook = saveBook;

module.exports.saveFeedback = saveFeedback;
module.exports.getAllFeedback = getAllFeedback;
module.exports.getFeedbackDetails = getFeedbackDetails;

module.exports.getAllEvents = getAllEvents;
module.exports.addEvent = addEvent;
module.exports.deleteEventById = deleteEventById;