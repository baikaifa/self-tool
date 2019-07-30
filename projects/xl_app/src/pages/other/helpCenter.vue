<template>
    <div class="hCenter">
		<eleTit></eleTit>
        <!-- <div class="backBtn">
            <i class="iconfont iconfanhui" @click="goBak"></i>
            帮助中心
        </div> -->
        <div class="main">
            <div class="question_type">
                <div :class="['type_item',page==1?'select':'']" @click="changePage(1)"><p>平台优势</p></div>
                <div :class="['type_item',page==2?'select':'']" @click="changePage(2)"><p>使用教程</p></div>
                <div :class="['type_item',page==3?'select':'']" @click="changePage(3)"><p>返现问题</p></div>
                <div :class="['type_item',page==4?'select':'']" @click="changePage(4)"><p>订单相关</p></div>
                <div :class="['type_item',page==5?'select':'']" @click="changePage(5)"><p>红包额度</p></div>
                <div :class="['type_item',page==6?'select':'']" @click="changePage(6)"><p>APP相关</p></div>
                <div :class="['type_item',page==7?'select':'']" @click="changePage(7)"><p>如何返利</p></div>
                <div :class="['type_item',page==8?'select':'']" @click="changePage(8)"><p>邀请好友</p></div>
                <div :class="['type_item',page==9?'select':'']" @click="changePage(9)"><p>其他问题</p></div>
            </div>
            <div class="que_answer">
                <div class="que_item" v-show="page==1">
                    <h3>一、有优惠福利吗？</h3>
                    <p>1.新用户前3笔，返现总额小于5元，下单立刻返现金红包，不必等确认收货。</p>
                    <p>2.使用喜乐平台返现次数越多，信誉越高，返现周期越短。</p>
                    <h3>二、喜乐小助手和其他返利平台一样吗？</h3>
                    <p>1.喜乐通过微信转账直接返现金红包，不做任何兑换券、兑换币等。</p>
                    <p>2.确认收货后1-20天即可返现，其他平台需要1个月以上的返现周期。</p>
                    <p>3.平台周期性举办各种消费满减、生日补贴等活动，优惠多多。</p>
                </div>
                <div class="que_item videoCont" v-show="page==2">
                    <p>淘宝返利教程</p>
<!--                    <video class="jiaoc" id="tb" src="http://img.xunbao88.com.cn/download/wechatmsg/goods/jiaochengshipin_tb_20190520.mp4"-->
<!--                           type="video/mp4"  apreload="auto"-->
<!--                           poster="../../assets/img/other/jiaocheng.jpg" playsinline></video>-->

                    <img src="../../assets/img/other/tb_course.gif"  class="jiaoc" />
                    <p>京东返利教程</p>
<!--                    <video class="jiaoc" id="jd" src="http://img.xunbao88.com.cn/download/wechatmsg/goods/jiaochengshipin_tb_20190520.mp4"-->
<!--                           type="video/mp4"  controls="controls" apreload="auto"-->
<!--                           poster="../../assets/img/other/jiaocheng.jpg" playsinline></video>-->
                    <img src="../../assets/img/other/jd_course.gif"  class="jiaoc" />
                    <p>拼多多返利教程</p>
<!--                    <video class="jiaoc" id="vpw" src="http://img.xunbao88.com.cn/download/wechatmsg/goods/jiaochengshipin_tb_20190520.mp4"-->
<!--                           type="video/mp4"  controls="controls" apreload="auto"-->
<!--                           poster="../../assets/img/other/jiaocheng.jpg" playsinline></video>-->
                    <img src="../../assets/img/other/pdd_course.gif"  class="jiaoc" />
                    <p>唯品会返利教程</p>
<!--                    <video class="jiaoc" id="jiaoc" src="http://img.xunbao88.com.cn/download/wechatmsg/goods/jiaochengshipin_tb_20190520.mp4"-->
<!--                           type="video/mp4"  controls="controls" apreload="auto"-->
<!--                           poster="../../assets/img/other/jiaocheng.jpg" playsinline></video>-->

                    <img src="../../assets/img/other/wph_course.gif"  class="jiaoc" />
                </div>
                <div class="que_item" v-show="page==3">
                    <h3>一、收到货了/确认收货/什么时候给我发红包?</h3>
                    <p>订单结算后系统自动给您发红包哟</p>
                    <h3>二、什么时候返现啊？</h3>
                    <p>您收到货后在淘宝/京东等平台上点确认收货按钮后24小时/8天/10天内自动给你发红包哟，详细规则给我发 提现 查看</p>
                    <h3>三、怎么返现啊？</h3>
                    <p>通过我的链接购买成功后，直接给你发红包或转账哟</p>
                    <h3>四、红包忘领了过期了怎么办？</h3>
                    <p>主动联系小助手，提交订单号。核实后超过24小时退回我的钱包，会手动补发哦</p>
                    <h3>五、发红包/转账还款了，怎么还扣我的钱呢？/我不想点链接还款？</h3>
                    <p>需要您通过我发的还款链接支付哟，直接转账和红包是记录不到的哟。您不想通过我的链接还款，下次购买直接抵扣即可</p>
                    <h3>六、收到货了（已确认收货）还没返现？</h3>
                    <p>您收到货后在淘宝上点确认收货按钮后24-48小时内自动给你发红包哟</p>
                    <h3>七、什么是优惠券？怎么用？</h3>
                    <p>1.通过喜乐运营活动获取的不同面额优惠券，可以在喜乐小助手转链下单后额外获得同面额微信红包。</p>
                    <p>2.不能使用优惠券抵扣欠款。</p>
                    <p>3.优惠券和额度红包不能同时使用，可以在返利详情中自定义使用优先级。</p>
                    <p>4.请注意在有效期内使用优惠券，过期自动作废。</p>
                </div>
                <div class="que_item" v-show="page==4">
                    <h3>一、为什么我的订单没有退款却扣钱了？</h3>
                    <p>预估佣金大于实际佣金会扣除这部分哦~您可以回复11查看账单明细</p>
                    <h3>二、哪个订单失效了？</h3>
                    <p>回复数字11查看账单明细</p>
                    <h3>三、为什么不返红包？为什么又有欠款？这单返现了么？</h3>
                    <p>回复 11 点击链接可查询相关订单返现情况</p>
                    <h3>四、不是说返5元吗？怎么是3元呢？</h3>
                    <p>实际返现是按照付款金额给发的哟，使用淘金币等红包也会影响返利金额哟</p>
                    <h3>五、为什么转链接时提示的预估返现和实际金额会有偏差？</h3>
                    <p>转链接时提示的是商品预估返现，订单结算时淘宝等平台才会和商家确认此笔订单准确的推广佣金，所以中间会有多或少的偏差，以最后实际结算为准</p>
                    <h3>六、为什么与商家协商补差价\补运费\退款\退货会没有返利？</h3>
                    <p>您购买的商品自主或与商家协商退款、退货、部分退款、换货、申诉都会导致订单失效，根据淘宝、京东等推广平台规定所有失效订单返利会被扣除，相应的喜乐返利红包也会扣回。您可以点击还款链接返还红包，
                    否则系统会在下次购物时扣回。您可以点击还款链接返还红包，否则系统会在下次购物时扣回。</p>
                </div>



                <div class="que_item" v-show="page==5">
                    <h3>一、红包额度是什么？/这个账户里的10元是什么钱？</h3>
                    <p>红包额度是充值到您的账户里的，您给我发账户即可查看</p>
                    <h3>二、红包额度如何提现？</h3>
                    <p>您购买超过3次后下次购买就可以领双份红包哟</p>
                    <h3>三、红包额度如何使用？</h3>
                    <p>买东西可以领双份红包，一个是商品返现红包一个是随机给您发的红包哟</p>
                    <h3>四、红包额度能一次性返吗？</h3>
                    <p>不可以哟，这个是系统随机发的红包哟</p>
                </div>

                <div class="que_item" v-show="page==6">
                    <h3>一、如何下载?</h3>
                    <p>您给我发数字17获得下载APP链接</p>
                    <h3>二、APP登陆了为什么没有钱？</h3>
                    <p>APP需要通过微信注册才能同步账户信息。手机号注册不和微信同步。给我回复18重置APP密码</p>
                    <h3>三、怎么提现？</h3>
                    <p>绑定自己的支付宝或者银行卡即可提现</p>
                </div>
                <div class="que_item" v-show="page==7">
                    <h3>如何使用返利？</h3>
                    <p>1.淘宝：</p>
                    <p>① 把商品链接发给我/分享给我</p>
                    <p>② 点我的链接一键复制</p>
                    <p>③ 打开淘宝打开弹出的商品</p>
                    <p>④ 有优惠券领取优惠券/没有则无需操作</p>
                    <p>⑤ 选择自己想买的商品提交订单付款即可</p>

                    <p>2.京东：</p>
                    <p>① 把商品链接发给我/分享给我</p>
                    <p>② 直接点我的链接进入</p>
                    <p>③ 领取优惠券/没有则无需操作</p>
                    <p>④ 选择想要的商品提交订单付款即可</p>
                    <p>⑤ 不能跳转到京东APP，否则没有返利红包</p>

                    <p>3.拼多多：</p>
                    <p>① 把商品链接发给我/分享给我</p>
                    <p>② APP购买：点击APP链接跳转到APP上</p>
                    <p>③ APP购买：选择商品直接下单付款即可</p>
                    <p>④ 微信购买：点击微信购买链接</p>
                    <p>⑤ 微信购买：选择购买商品直接下单即可</p>

                    <p>4.唯品会：</p>
                    <p>① 把商品链接发给我/分享给我</p>
                    <p>② APP购买：点击APP链接跳转到APP上</p>
                    <p>③ APP购买：选择商品直接下单付款即可</p>
                    <p>④ 微信购买：点击微信购买链接</p>
                    <p>⑤ 微信购买：选择购买商品直接下单即可</p>
                </div>
                <div class="que_item" v-show="page==8">
                    <h3>一、怎么邀请好友呢，怎么分享给好友啊？</h3>
                    <p>您把我的名片推荐给好友加上，好友通过后我给您提示哟
                    您给我回复“推广”这两个字即可获得推广二维码图片发送朋友圈</p>
                    <h3>二、好友也要买这个商品怎么买？我是直接转发给他吗？</h3>
                    <p>您把我的名片推荐给好友加上把商品发给我，通过我的链接购买就可以哟
                    好友每次通过我的链接买完，系统会额外给您10%分成奖励</p>
                    <h3>三、我买东西推荐我的人会有红包吗？他会看见我买的什么吗？</h3>
                    <p>推荐您的人系统是额外给他奖励的哟，您的返利金额是不变的，我们保护用户个人隐私推荐的人不会看见</p>
                    <h3>四、我的哪个好友买东西了给我发的红包啊？他买的什么东西啊？?</h3>
                    <p>抱歉亲，我们保护个人隐私是不能透露他人信息的哟</p>
                    <h3>五、我推荐好友我的上级会看到吗，收到红包吗？</h3>
                    <p>不会的哟，您推荐好友只有您可以看到哟</p>
                    <h3>六、推荐好友为什么没有奖励红包</h3>
                    <p>推荐好友奖励红包需要等待好友订单结算后才能给您发放奖励</p>
                </div>

                <div class="que_item" v-show="page==9">
                    <h3>一、为什么会有返利如何赚钱?</h3>
                    <p>我们是和京东，淘宝，拼多多等平台合作有商家的推广费，给您返利的哟</p>
                    <h3>二、我想买这个衣服是什么料子的啊，发什么快递啊</h3>
                    <p>商品质量等快递问题可以直接跟商家客服沟通哟</p>
                    <h3>三、你们发的还款链接会不会不安全啊，你们注册的密码是微信的吗</h3>
                    <p>我们是还款链接只为还款设计，不涉及其他用途所以您放心绝对安全的哟
                    我们注册的密码是为了还款设置的，不涉及其他用途所以您放心绝对安全的哟</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eleTit from "@/components/title/title";
export default{
    data(){
        return {
            page: 1,

        }
    },
    components: {
        eleTit
    },
    created () {
        
    },
    methods: {
        goBak(){
            this.$router.go(-1);
        },
        changePage(page){
            this.page = page;
        }
    }
}
</script>
<style>

    .hCenter .main{
        height: calc(100vh - 84px);
        padding-top: 84px;
        overflow: hidden;
        font-size:30px;
        display: flex;
    }
    .hCenter .question_type{
        background:#f7f7f7;
        width: 200px;
        text-align: center;
        border-right: 1px solid #EBEBEB;/*no*/
    }
    .hCenter .select{
        background: #fff
    }
    .hCenter .que_answer{
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }
    .hCenter .type_item{
        height: 88px;
        line-height: 0.9;
        border-bottom: 1px solid #ececec;/*no*/
        display: flex;
        align-items: center;
    }
    .hCenter .jiaoc{
        height: 768px;
        width: 80%;
        margin-left: 10%;
    }
    .hCenter .videoCont{
        height:900px;
        width:100%;
    }
    .hCenter .select>p{
        border-left: 3px solid #fe4142;/*no*/
    }
    .hCenter .que_item{
        font-size: 24px;
        line-height: 50px;
    }
    .hCenter .type_item p{
        width: 100%
    }
    .videoCont p{
        margin: 20px 0  20px;
        color: #ff314b;
        font-size: 32px;
        font-weight: bold;

    }
</style>