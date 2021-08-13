const { DataTypes } = require('sequelize');
const { con } = require('.');
const DbDefine = require('../utils/DbDefine');
const File = require('./File');


const Page = con.define(DbDefine.PAGE_TABLE, {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },//user id
    title: DataTypes.STRING,
    data_one: DataTypes.STRING,
    data_two: DataTypes.STRING,
    data_three: DataTypes.STRING,
})
//1 page multiple File
Page.hasMany(File, { foreignKey: 'pid' })

//one to one (one User will have many page)
//1 page 1 user
//Page.belongsTo(User)

module.exports = Page;