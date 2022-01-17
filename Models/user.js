const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../Utils/database");
const Users = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING(100),
        require: true
    },
    Password: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    Address: {
        type: Sequelize.STRING(100),
    },
    Latitude: {
        type: Sequelize.STRING(100),
        require: true
    },
    Longitude: {
        type: Sequelize.STRING(100),
        require: true
    },
    Status: {
        type: Sequelize.STRING(100),
        defaultValue: "Active"
    }
});

Users.UpdateStatus = () => {
    return sequelize.query(`UPDATE Users SET Status = IF(Status='Active','Inactive', 'Active');`, {
        type: QueryTypes.UPDATE
    })
}

module.exports = Users;