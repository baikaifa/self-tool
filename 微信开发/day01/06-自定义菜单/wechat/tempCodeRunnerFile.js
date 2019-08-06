
const w = new Wechat();
new Promise((resolve, reject) => {
  w.readAccessToken()
    .then(res => {
      if (w.isValidAccessToken(res)) {
        resolve(res);
      } else {
        w.getAccessToken()
          .then(res => {
            w.saveAccessToken(res)
              .then(() => {
                resolve(res);
              })
          })
      }
    })
    .catch(err => {
      w.getAccessToken()
        .then(res => {
          w.saveAccessToken(res)
            .then(() => {
              resolve(res);
            })
        })
    })
})
  .then(res => {
    console.log(res);
  })
