export const db = {
    url: 'mysql://b06a25ef11eebc:b892f323@us-cdbr-east-06.cleardb.net/heroku_27bd5cee3560c30?reconnect=true'
};

export const jwtSecret = process.env.JWT_SECRET || 'secret';