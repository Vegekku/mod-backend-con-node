'use strict';

/**
 * Load init data to database
 */

const readline = require('readline');
const Ad = require('../models/Ad');
const User = require('../models/User');
const db = require('../lib/connectMongoose');
const i18n = require('../lib/i18nConfigure')();
const adsData = require('../data/ads.json');
const usersData = require('../data/users.json');

i18n.setLocale('es');

/**
 * Ask user for any question
 * @param {String} question
 */
function askUser(question) {
  return new Promise((resolve, reject) => {
    const stream = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    stream.question(question, answer => {
      stream.close();
      process.stdin.destroy();
      resolve(answer);
    });
  });
}

/**
 *
 * @param {Model} Model
 * @param {json} data
 * @param {string} modelName
 */
async function initModel(Model, data, modelName) {
  const deleted = await Model.deleteMany();
  console.log(`${i18n.__n('Deleted', deleted.n)} ${modelName}.`);

  const inserted = await Model.insertMany(data);
  console.log(`${i18n.__n('Inserted', inserted.length)} ${modelName}.`);
}

db.once('open', async () => {
  try {
    // ask user before delete database
    const answer = await askUser(
      i18n.__('Database will be erased. Are you ok? (Yes/No)')
    );

    if (answer.toLowerCase() === 'yes') {
      await initModel(Ad, adsData, 'ads');

      // encrypt passwords
      for (let i = 0; i < usersData.length; i++) {
        usersData[i].password = await User.hashPassword(usersData[i].password)
      }
      await initModel(User, usersData, 'users');

      db.close();
    } else {
      console.log(i18n.__('Aborting database init.'));
      process.exit(0);
    }
  } catch (error) {
    console.error(i18n.__('There was an error,'), error);
    process.exit(1);
  }
});
