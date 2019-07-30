<template>
    <div class="template">
		<eleTit bak="true"></eleTit>
        <div class="contactCustomerService">
            <div class="vxContactCus">
                <div class="headDiv">
                    <strong>
                        联系客服
                    </strong>
                </div>
                <div class="vxContactCusTop">
                    因返现订单量较大,您已添加的
                    喜乐客服如没有及时响
                    应,您可添加其他客服为您服
                    务,保证及时响应您的消息
                </div>

                <div class="vxContactCusBom">
                    <div class="liDiv">

                        <ul>
                            <li >A京东淘宝返利助手110 微信号: hemeixbi001</li>
                            <li >A京东淘宝返利助手212 微信号: &nbsp&nbspJiyinxbo01</li>
                            <li >A京东淘宝返利助手010 微信号: huipingxb001</li>
                            <li >A京东淘宝返利助手213 微信号: kunfengxb00</li>
                            <li >A京东淘宝返利助手211 微信号: Darlingtonaa</li>
                        </ul>
                    </div>
                    <div class="vxBom">公司客服众多，功能一致，所以仅列举以上5个供您添加
                    </div>

                </div>


            </div>

            <div class="phoneContactCus">
                <div class="headDiv">
                    <strong>
                        电话联系客服
                    </strong>
                </div>
                <div class="phoneDiv">
                    <ul><li>电话:<p>18010176645</p></li>
                    </ul>
                </div>


            </div>
        </div>
    </div>

</template>

<script>
import eleTit from "@/components/title/title";
export default {
    components: {eleTit},
    name: "contactCustomerService"
}
</script>

<style scoped>
    .template {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background-color: #f9f9f9;
    }
    .template .goBack{
        width: 20px;
        height: 38px;
        background:url("../../assets/img/personal/goback.png")no-repeat;
        background-size:100%;
        position: relative;
        top: 64px;
        left: 20px;
    }
    .template .contactCusDiv{
        font-family: STXihei;
        font-size: 36px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #000000;
       margin-left: 40%;
    }
    .template .vxContactCus{

    width: 660px;
    background-color: #ffffff;
    border-radius: 14px;
    border: 1px solid  #ef4454;/*no*/

    margin: 40px auto 0px;



    }
    .template .phoneContactCus{
    width: 660px;
    background-color: #ffffff;
    border-radius: 14px;
    border: 1PX solid  #ef4454;
    margin: 50px auto 0;

    }
    .template .vxContactCusTop{
    width: 529px;
    /*height: 111px;*/
    font-family: STXihei;
    font-size: 28px;
    color: #343434;
    margin: auto;
    line-height: 42px;
    font-weight:600;
    }
    .template .vxContactCusBom{
    margin: auto 70px 0;
    width: 583px;


    }
    .template .vxContactCusBom .vxBom{

    margin-top:20px ;

    font-stretch: normal;
    line-height: 31px;
    color: #ef4454;
    font-weight:600;
        margin-bottom: 40px;
    }
    .template .vxContactCusBom .liDiv{

    width: 560px;
    font-family: AdobeHeitiStd-Regular;
    font-size: 26px;

    color: #666666;
    line-height: 42px;
    margin:20px 20px 0 0;


    }

    .template .headDiv{
    width: 471px;
    height: 30px;
    color: #ef4454;
    margin:40px auto 0;
    background: url("../../assets/img/personal/lr_vxcontact.png")no-repeat;
    background-size: 100%;

    }
    .template  .phoneContactCus ul li {
        list-style-type : disc;
        font-family: AdobeHeitiStd-Regular;
        font-size: 26px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        margin-top:20px ;
        margin-left: 40px;
        float: left;

    }
    .template  .phoneContactCus  p{
        color: #ef4454;
        line-height: 31px;
        font-size: 30px;
        float: right;
      margin-right: 150px;
        margin-left: 20px;
        margin-top: 3px;
        text-decoration:underline
    }
    .template  .headDiv strong{
        font-family: STXihei;
        font-size: 30px;
        margin: auto;
        color: #ef4454;
        position: relative;
        left: 140px;
        top:-18px;
    }
    .template  .vxContactCusBom .liDiv ul li{
        list-style-type : disc;
        width: 560px;
        font-family: AdobeHeitiStd-Regular;
        font-size: 26px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        margin-top:20px ;
        margin-left: 35px;

    }
    .template .phoneDiv{
        margin-left: 60px;
        overflow: auto;
        padding-bottom: 40px;
    }
    .template   .line {
        width: 100%;
        height: 1PX;
        background-image: linear-gradient(
                #ebebeb,
                #ebebeb),
        linear-gradient(
                #eeeeee,
                #eeeeee);
        background-blend-mode: normal,
        normal;
        position: relative;
        top: 40px;
    }


</style>