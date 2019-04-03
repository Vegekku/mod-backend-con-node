'use strict';

/**
 * Load init data to database
 */

const readline = require('readline');
const Ad = require('mongoose').model('Ad');
const db = require('../lib/connectMongoose');
const adsData = require('../data/ads.json');

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
  console.log(`Deleted ${deleted.n} ${modelName}.`);

  const inserted = await Model.insertMany(data);
  console.log(`Inserted ${inserted.length} ${modelName}.`);
}

db.once('open', async () => {
  try {
    // ask user before delete database
    const answer = await askUser(
      'Database will be erased. Are you ok? (Yes/No)'
    );

    if (answer.toLowerCase() === 'yes') {
      await initModel(Ad, adsData, 'ads');
      db.close();
    } else {
      console.log('Aborting database init.');
      process.exit(0);
    }
  } catch (error) {
    console.error('There was an error,', error);
    process.exit(1);
  }
});
