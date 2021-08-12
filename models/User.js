const { DataTypes } = require('sequelize');
const { con } = require('.');
const DbDefine = require('../utils/DbDefine');


const User = con.define(DbDefine.USER_TABLE, {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            customValidator(value) {
                if (value.length < 4) {
                    throw new Error('Name should be at least 4 character!');
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get() {
            return this.getDataValue('is_admin') === 0 || this.getDataValue('is_admin') === false ? false : true;
        },
        validate: {
            notEmpty: true,
        }
    }
}
)



module.exports = User;


//role: {
// type: DataTypes.ENUM('admin', 'user'),
//     allowNull: false,
//         validate: {
//     isIn: {
//         args: [['admin', 'user']],
//             msg: "Must be user or admin"
//     }
// }
//     }
