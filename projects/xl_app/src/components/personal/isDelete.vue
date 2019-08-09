<!--删除提示-->
<!--
    实例页面：pages/myAttention.vue
    1、父级引入  <isDelete v-if="this.deleteTrigger" title="确认不再关注" @cancelDelete = 'confirmDelete'></isDelete>
            v-if="this.deleteTrigger"       弹层部分判断  true触发
            title="确认不再关注"            弹出的文字内容
            @cancelDelete = 'confirmDelete' 子级监听的关键字cancelDelete    confirmDelete父级中判断是否执行的方法
    2、父级中使用的方法  confirmDelete
        confirmDelete(val){
            if(val){
                //确认操作
            }else{
                //取消操作
                this.$data.deleteTrigger = false;   //关闭弹层字段
            }
        }

-->
<template>
    <div class='isDelete'>
        <section>
            <p>{{title?title:"是否确认"}}</p>
            <ul>
                <li class="fl" @click="isDeleteCancel">取消</li>
                <li @click="isDeleteConfirm">确认</li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        props: [
            'title'
        ],
        methods:{
            isDeleteCancel(){
               this.$emit('cancelDelete',false)
            },
            isDeleteConfirm(){
                this.$emit('cancelDelete',true)
            }
        }

    }
</script>
<style scoped type="text/css">
    .isDelete{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height: 100vh;
        background: rgba(0,0,0,0.3);
        z-index:1000;
    }
    .isDelete section{
      width:60%;
      height: 210px;
      background: #fff;
      border-radius: 12px;
      position:absolute;
      top:50%;
      left:50%;
      margin-left:-30%;
      margin-top:-120px;
    }
    .isDelete section p{
      box-sizing: border-box;
      height: 134px;
      line-height: 134px;
      font-weight: bold;
      font-size: 30px;
      text-align: center;
      border-bottom:1px solid #cdcdcd;
    }
    .isDelete section ul{
      display: flex;
    }
    .isDelete section ul li{
      items: 1;
      box-sizing: border-box;
      width:50%;
      height: 76px;
      line-height: 76px;
      text-align: center;
      font-size: 28px;
    }
    .isDelete section ul li:first-of-type{
      border-right: 1px solid #cdcdcd;
    }
    .isDelete section ul li:last-of-type{
      color:red;
    }

</style>
