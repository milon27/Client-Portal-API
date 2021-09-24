const { DataTypes } = require('sequelize');
const { con } = require('.');
const DbDefine = require('../utils/DbDefine');

const File = con.define(DbDefine.FILE_TABLE, {
    pid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },//page id
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING
})

module.exports = File;