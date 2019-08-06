<template>
    <div class="editTag">
        <backBtn :pageName="pageName" :type="type">
            <span class="editBtn" slot="rightBtn" @click='editTag'>修改</span>
        </backBtn>
        <div class="editMyTag">
            <div class="editTitle"><span style="color: #cecece">•&nbsp;</span><span class="weightBlack">性别</span></div>
            <div class="tagList">
                <div class="outTag" v-for='item in tagListTop' :key='item.tagId'>
                    <div @click='changeTag(item, $event)' class="tags gender" :class='item.chosen==1?"chosenTag":""'>{{item.tagName}}</div>
                </div>
            </div>
            <div class="splitLine"></div>
            <div class="editTitle"><span style="color: #cecece">•&nbsp;</span><span class="weightBlack">类目</span></div>
            <div class="tagList">
                <div class="outTag" v-for='item in tagListBottom' :key='item.tagId'>
                    <div @click='changeTag(item)' class="tags" :class='item.chosen==1?"chosenTag":""'>{{item.tagName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import backBtn from "@/components/backBtn";
import {getTags, updateTags} from "@/api/index";
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
        this.type = this.$route.params.type;
        this.getData();
    },
    methods: {
        getData(){
            var that = this;
            getTags().then(res=>{
                var tagList = typeof(res.data) === 'string'?JSON.parse(res.data):res.data;
                if(tagList.length){
                    for(var i = 0; i < tagList.length; i ++){
                        if(tagList[i].tagType == 1 && tagList[i].tagName!="性别"){         // tagType == 1, 性别
                            that.tagListTop.push(tagList[i]);
                            if(tagList[i].chosen){
                                that.genderId = tagList[i].tagId;
                            }
                        }else if(tagList[i].tagType == 2 && tagList[i].tagName != "类目"){   // tagType == 2, 类目
                            that.tagListBottom.push(tagList[i]);
                            if(tagList[i].chosen){
                                that.changeList.push(tagList[i].tagId);
                            } 
                        }
                    }
                }
                
            })
        },
        // 标签点击
        changeTag(item, event){
            if(item.tagType==1){
                var genderList = document.getElementsByClassName('gender');
                for(var i = 0;i < genderList.length; i++){
                    genderList[i].classList.remove('chosenTag')
                }
                event.target.classList.add('chosenTag')
                this.genderId = item.tagId;
            }else{
                if(item.chosen == 0){
                    if(this.changeList.length == 4){ // 已选择四个标签
                        this.$toast('最多选择四个标签');
                        return
                    }
                    this.changeList.push(item.tagId)
                }else{
                    var index = this.changeList.indexOf(item.tagId);
                    this.changeList.splice(index, index+1)
                }
                item.chosen = item.chosen == 1? 0: 1;
                console.log('标签列表: ', this.changeList)
            }
        },
        // 修改标签
        editTag(){
            var that = this;
            if(!that.genderId){  // 未选性别
                that.$toast('请选择性别');
                return
            }else{
                var changeStr = that.changeList.join(',')+','+that.genderId;
                console.log('edit tag: ', changeStr);
                var params = {
                    tagIds: changeStr
                }
                updateTags(params).then(data => {
                    that.$toast({
                        message:"设置成功",
                        duration: 1500
                    });
                    setTimeout(function(){
                        that.$router.push('setting')
                    }, 1500)
                })
  
            }
        },
    },
}
</script>
<style>
    .editMyTag{
        padding: 0.4rem 0.28rem;
        text-align: left;
    }
    .editMyTag .splitLine{
        width: 92%;
        margin: 0 auto;
        margin-top: 0.1rem;
        margin-bottom: 0.52rem;
        border-bottom: 1px solid #cccccc;
    }
    .editTag .editBtn{
        position: absolute;
        right: 0.2rem;
        font-size: 0.28rem;
        color: #666666
    }
    .editMyTag .tagList{
        display: flex;
        flex-wrap: wrap
    }
    .editMyTag .outTag{
        width: 25%;
        padding: 0.2rem 0.3rem;
    }
    .editMyTag .tags{
        height: 0.48rem;
        border-radius: 0.24rem;
        border: 1px solid #cccccc;
        color: #666666;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.48rem;
    }
    .editMyTag .chosenTag{
        background: #ff942c;
        color: #fff;
        border: 1px solid #e67a11
    }
</style>
