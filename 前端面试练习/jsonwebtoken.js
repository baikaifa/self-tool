const jwt = require('jsonwebtoken');
  //密码匹配
  bcrypt.compare(password, user.password)
  .then(isMatch => {
    if (isMatch) {
      //安装token cnpm i jsonwebtoken
      const rule = 
      { id: user.id, 
        name: user.name,
        avatar:user.avatar,
        identity:user.identity
       };
      jwt.sign(rule, keys.secretOrKey, { expiresIn: 72000000 }, (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({
            success: true,  
            token: "Bearer " + token
          })
        }
      })
      // jwt.sign("规则","加密名字","过期时间","箭头函数")
      // res.json({ msg: "success" });
    } else {
      res.json('密码错误');
      // return res.status(400).json( "密码错误!" );
    }
  })