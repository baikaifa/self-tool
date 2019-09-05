npm i passport - jwt jwt--save - dev
在passport中写入
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model("users");
const keys = require('../config/keys');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    //jwt_payload 数据格式
    // {
    //     id:'5afd4559dsf4cv654sf156dfs19',
    //     name:'米斯特吴',
    //     iat:1526554627,
    //     exp:1526558227
    // }
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err))
    }));
}


在文件中使用
const passport = require('passport');

router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    //安装passport-jwt cnpm i passport-jwt passport
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
}) 