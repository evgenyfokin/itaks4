export const db = {
    url: process.env.CLEARDB_DATABASE_URL
};

export const jwtSecret = process.env.JWT_SECRET || 'secret';