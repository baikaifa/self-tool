<template>
    <div class="chooseTags">
        <backBtn :pageName="pageName" :type="type"></backBtn>
        <div class="editMyTag">
            <div class="tagList">
                <div class="genderTag" @click='chooseGender(3)'>
                    <img src="../../assets/img/female.png" class="genderImg" alt="">
                    <img src="../../assets/img/checked.png" class="checkImg" alt="" v-show='genderId==3'>
                    <div>小仙女</div>
                </div>
                <div class="genderTag" @click='chooseGender(4)'>
                    <img src="../../assets/img/male.png" class="genderImg" alt="">
                    <img src="../../assets/img/checked.png" class="checkImg" alt="" v-show='genderId==4'>
                    <div>小鲜肉</div>
                </div>
            </div>
            <div class="splitLine"></div>
            <div class="tipsText">最多选四项</div>
            <div class="tagList">
                <div class='outTag' v-for='item in tagListBottom' :key='item.tagId'>
                    <div @click='changeTag(item)' class="tags" :class='item.chosen==1?"chosenTag":""'>{{item.tagName}}</div>
                </div>
            </div>
        </div>
        <button class="editBtn" @click='editTag' :class='genderId?"hasChosen":""'>我选好了</button>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {getTags, updateTags} from "@/api/index";
import {Toast} from 'mint-ui';
import {getLocalData} from "@/utils/store";
export default {
    data(){
        return {
            pageName: '我的标签',
            type: '',
            tagListTop: [],
            tagListBottom: [],
            changeList: [],
            genderId: '',
        }
    },
    components:{
        backBtn
    },
    created () {
        // var sid = getLocalData("hbxj_sid");
        var sid = 'adminadmin123';
        var params = {sid: sid}
        var that = this;
        this.type = this.$route.params.type;
        // 获取标签
        getTags(params).then(res=>{
            if(res.code == 200){
                var tagList = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                if(tagList.length){
                    console.log(tagList)
                    for(var i = 0; i < tagList.length; i ++){
                        if(tagList[i].tagType == 1){         // tagType == 1, 性别
                            that.tagListTop.push(tagList[i])
                        }else if(tagList[i].tagType == 2 && tagList[i].tagName != "类目"){   // tagType == 2, 类目
                            that.tagListBottom.push(tagList[i])
                            if(tagList[i].chosen==1){
                                that.changeList.push(tagList[i].tagId)
                            }
                        }
                    }
                }
            }else{
                console.log(res.msg)
            }
        })
    },
    methods: {
        // 选择性别
        chooseGender(num){
            this.genderId = num
        },
        // 选择标签
        changeTag(item, event){
            if(item.chosen == 0){
                if(this.changeList.length == 4){ // 已选择四个标签
                    Toast('最多选择四个标签');
                    return
                }
                this.changeList.push(item.tagId)
            }else{
                var index = this.changeList.indexOf(item.tagId);
                this.changeList.splice(index, index+1)
            }
            item.chosen = item.chosen == 1? 0: 1;
            console.log('标签列表: ', this.changeList)
        },
        // 修改标签
        editTag(){
            var that = this;
            if(!that.genderId){  // 未选性别
                Toast('请选择性别');
                return
            }else{
                var changeStr = that.changeList.join(',')+','+that.genderId;
                console.log('edit tag: ', changeStr)
                
                // var sid = getLocalData("hbxj_sid");
                var sid = 'adminadmin123';
                var params = {
                    sid: sid,
                    tagIds: changeStr
                }
                updateTags(params).then(data => {
                    if(data.code == 200){
                        Toast('修改成功');
                        setTimeout(function(){
                            that.$router.push('setting')
                        }, 1000)
                    }else{
                        console.log(data.msg)
                    }
                })

                
            }
        },
    },
}
</script>
<style>
    .chooseTags .skipBtn{
        position: absolute;
        right: 0.2rem;
        font-size: 0.24rem;
        color: #3289ff
    }
    .chooseTags .editMyTag{
        padding: 0.4rem 0.28rem;
        text-align: left;
    }
    .chooseTags .splitLine{
        width: 92%;
        margin: 0 auto;
        margin-top: 0.34rem;
        margin-bottom: 0.34rem;
        border-bottom: 1px solid #cccccc;
    }
    .chooseTags .editBtn{
        background: #f3f3f3;
        color: #999999;
        border: none;
        width: 3.6rem;
        height: 0.8rem;
        font-size: 0.28rem;
        margin: 1.24rem auto;
        border-radius: 0.4rem;
        outline: none; 
    }
    .chooseTags .hasChosen{
        background: #3289ff;
        color: #fff;
    }
    .chooseTags .genderTag{
        color: #999999;
        font-size: 0.28rem;
        width: 50%;
        text-align: center;
        position: relative;
    }
    .chooseTags .genderImg{
        width: 1.33rem;
        height: 1.33rem;
    }
    .chooseTags .checkImg{
        width: 0.32rem;
        height: 0.32rem;
        position: absolute;
        right: 1rem;
        bottom: 0.6rem;
    }
    .chooseTags .tipsText{
        margin-bottom: 0.3rem;
        text-align: center;
        font-size: 0.29rem;
        color: #ff942c
    }
    .chooseTags .tagList{
        display: flex;
        flex-wrap: wrap
    }
    .chooseTags .outTag{
        width: 25%;
        padding: 0.2rem 0.3rem;
    }
    .chooseTags .editMyTag .tags{
        height: 0.48rem;
        border-radius: 0.24rem;
        border: 1px solid #cccccc;
        color: #666666;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.48rem;
    }
    .chooseTags .editMyTag .chosenTag{
        background: #ff942c;
        color: #fff;
        border: 1px solid #e67a11
    }
</style>
