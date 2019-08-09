<template>
    <div class='noMessage'>
        <img :src='src' class='noMessageImage'/>
        <div class='message'>{{title?title:"暂无消息"}}</div>
    </div>
</template>

<script>
export default {
    props: [
        'title',
        'src'
    ]
}
</script>
<style type="text/css">
    .noMessage {
    /* background-color: white; */
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
     position: absolute;
    top: 30%;
     
    /* right: 0;  */
    /* bottom: 0; */
    /* left: 0; */
    /* margin: auto */
    }

    .noMessageImage {
    width: 342px;
    height: 254px;
    }

    .message {
    margin-top: 50px;
    font-size: 28px;
    color: #999;
    }

</style>