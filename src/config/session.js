/**
 * Session Configuration
 */

module.exports = {
    type: 'redis',
    secret: process.env.SESSION_SECRET,
    name: 'sunny.sid',
    maxAge: 3600000, // 1 hour
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    },
    store: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD,
        db: 0,
        ttl: 3600, // 1 hour
        prefix: 'sess:',
        disableTouch: false
    }
};
