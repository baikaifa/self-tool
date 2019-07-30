<template>
  <div class="container">
    <!-- 手机页面 -->
    <div class="content">
      <img id="phone" src="../../assets/img/mall/pingmu.png" alt />
      <img class="gif" src="../../assets/img/mall/weipinhuigif.gif" />
		      <input type="button" class="btn" value="立即体验" />
    </div>
    <!-- 手机页面 -->

  </div>
</template>
<script>
export default {};
</script>

<style type="css/text" scoped="scoped">
/* @media */
.wrap {
  width: 100%;
  height: 1800px;
}
.container {
  background-image: url(../../assets/img/mall/gouwufanlibeijing.png);
  width: 100%;
  height: 100vh;
  background-size: 750px;
  background-position: right top;
  background-repeat: no-repeat;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 384px;
  height: 784px;
  position: relative;
}
#phone {
  width: 384px;
  height: 784px;
  position: absolute;
}
.gif {
  width: 345px;
  height: 610px;
  position: absolute;
  top: 78px;
  left: 50%;
  z-index: inherit + 1;
  transform: translate(-50%);
}
.btn {
  width: 300px;
  height: 80px;
  position: absolute;
  display: block;
  border-radius: 50px;
  background-color: #ff314b;
  margin-left: 50%;
  transform: translate(-50%,0);
  margin-top: 210%;
  color: #fefffb;
  font-size: 16px;
}
</style>


