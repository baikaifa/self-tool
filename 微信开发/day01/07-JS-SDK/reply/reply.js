module.exports = (message) => {
    let options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        MsgType: 'text'
    };
    let content = '您在说什么，我听不懂';
    if (message.MsgType === 'text') {
        if (message.Content === '1') {
            content = '大吉大利，今晚吃鸡';
        } else if (message.Content === '2') {
            content = '落地成盒';
        } else if (message.Content.match('爱')) {
            content = '我爱你';
        }
    } else if (message.MsgType === 'image') {
        options.MsgType = 'image';
        // console.log('options');
        // console.log(options);
        // console.log('message');
        // console.log(message);
        options.mediaId = message.MediaId;
        //console.log(message.PicUrl);
    } else if (message.MsgType === 'voice') {
        options.MsgType = 'voice';
        options.mediaId = message.MediaId;
        // console.log(message.Recognition);
    } else if (message.MsgType === 'location') {
        content = `维度:${message.Location_X} 经度:${message.Location_Y} 
        缩放大小:${message.Scale} 位置信息${message.Label}`;
    } else if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            content = '欢迎您的关注硅谷电影公众号\n'
            + '回复 首页 能看到硅谷电影预告片页面 \n'
            + '回复 热门 能看到最新最热门的电影 \n'
            + '回复 文本 能查看指定的电影信息 \n'
            + '回复 语音 能查看指定的电影信息 \n'
            ;
            if (message.EventKey) {
                content = '用户扫描带参数的二维码关注事件';
            }
        } else if (message.Event === 'unsubscribe') {
            //用户取消订阅事件
            console.log('无情取关');
        } else if (message.Event === 'SCAN') {
            content = '用户已经关注过，再扫描带参数的二维码关注事件';
        } else if (message.Event === 'LOCATION') {
            content = `维度:${message.Location_X} 经度:${message.Location_Y} 
          精度:${message.Precision}  `;
        } else if (message.Event === 'CLICK') {
            content = '您可以按照以下提示来进行操作~ \n'
            + '回复 首页 能看到硅谷电影预告片页面 \n'
            + '回复 热门 能看到最新最热门的电影 \n'
            + '回复 文本 能查看指定的电影信息 \n'
            + '回复 语音 能查看指定的电影信息 \n';
        }
    }
    options.content = content;
    // console.log(options);
    return options
}