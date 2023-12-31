import { Sequelize, DataTypes } from 'sequelize';

const dbUrl = 'mysql://b06a25ef11eebc:b892f323@us-cdbr-east-06.cleardb.net/heroku_27bd5cee3560c30?reconnect=true'
const parsedUrl = new URL(dbUrl);

const username = parsedUrl.username;
const password = parsedUrl.password;
const host = parsedUrl.hostname;
const database = parsedUrl.pathname.slice(1); // Удаляем начальный '/'

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql'
});

export const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(50), unique: true },
    password: { type: DataTypes.STRING(255) },
    register_date: { type: DataTypes.DATE },
    last_login_date: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM('active', 'blocked', 'deleted') }
}, { timestamps: false });

User.sync();

export default User;