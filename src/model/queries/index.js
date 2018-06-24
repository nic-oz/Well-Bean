const getAllChallenges = require('./get_all_challenges');
const getChallenge = require('./get_challenge');
const getMessages = require('./get_messages');
const getActiveChallenge = require('./get_active_challenge');
const getUser = require('./get_user');
const getUserChallenges = require('./get_user_challenges');
const getCategories = require('./get_categories');

const postChallenge = require('./post_challenge');
const postMessage = require('./post_message');
const postUserChallenge = require('./post_user_challenge');
const postNewUser = require('./post_new_user');

const updateUserChallenge = require('./update_user_challenge');

module.exports = {
  getAllChallenges,
  getActiveChallenge,
  getChallenge,
  getMessages,
  getCategories,
  getUser,
  getUserChallenges,
  postChallenge,
  postMessage,
  postUserChallenge,
  postNewUser,
  updateUserChallenge,
};
