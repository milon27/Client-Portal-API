'use strict';
const Sequelize = require('sequelize');
const DbDefine = require('../utils/DbDefine');

const db = {};

/**
 * @type {Sequelize.Sequelize}=con
 * 
 */
let con = new Sequelize(process.env.db_database, process.env.db_username, process.env.db_password, {
  host: process.env.db_host,
  dialect: "mysql",
  charset: 'utf8',
  collate: 'utf8_general_ci',
  query: {
    raw: false
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  define: {
    underscored: true,
    freezeTableName: true,
    createdAt: DbDefine.CREATED_AT,
    updatedAt: false
  },
  // dialectOptions: {
  //   timezone: '+06:00',
  // },

  // timezone: "Etc/GMT+7"//correct the db write
});

(async function () {
  try {
    //ck connection
    await con.authenticate()
    //attach models
    //db.User = require('./User')

    //associate
    // Object.keys(db).forEach(modelName => {
    //   if (db[modelName].associate) {
    //     db[modelName].associate(db);
    //   }
    // });
    console.log("connection success");
    //sync
    await con.sync({
      force: true
    })
  } catch (e) {
    console.log("error db con: ", e)
  }
}())


db.con = con

module.exports = db;
