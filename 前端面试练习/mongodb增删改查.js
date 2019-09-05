//查找操作
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile);
        }).catch(err => res.status(404).json(err));
})

User.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            return res.status(400).json({email:"邮箱已被注册！"})
        }else{
            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            })
        }
    })
//删除操作
router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndDelete({ _id: req.params.id }).then(profile => {
        profile.save().then(profile => res.json(profile))
    })
        .catch(err => res.status(404).json('删除失败'));
})
//修改操作
router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};
    if (req.body.desc) { profileFields.desc = req.body.desc; }
    if (req.body.imgUrl) { profileFields.imgUrl = req.body.imgUrl; }
    if (req.body.title) { profileFields.title = req.body.title; }
    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true }
    ).then(profile => res.json(profile))
});