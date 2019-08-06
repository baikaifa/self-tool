<template>
    <div class="sortTab">
                <div data-sort="0" @click="sortTabFun" class="tabItem cur">综合</div>
                <div data-sort="1" @click="sortTabFun" class="tabItem">销量</div>
                <div data-sort="2" @click="sortPriceTabFun" class="tabItem tabPriceItem">
                    <div class="priceTxt">价格</div>
                    <div class="arr">
                        <div :class="['arrUp',priceSort==0?'priceUpCur':'']"></div>
                        <div :class="['arrDown',priceSort==1?'priceDownCur':'']"></div>
                    </div>
                </div>
                <div data-sort="3" @click="sortTabFun" class="tabItem">最省钱</div>
    </div>
</template>
<script>

import $ from 'jquery';

export default {
    data:function(){
        return {
            priceSort:2 //2 没有用price排序 0 lowToHigh 1 highToLow
        }
    },
    methods:{
        sortTabFun:function(e){
            var sort=e.currentTarget.dataset.sort;
            $(".tabItem").removeClass("cur");
            $(e.currentTarget).addClass("cur");

            this.priceSort=2;

            this.$emit("sortFun",sort,0);

            
        },
        sortPriceTabFun:function(e){
            var sort=e.currentTarget.dataset.sort;
            $(".tabItem").removeClass("cur");
            $(e.currentTarget).addClass("cur");

            if(this.priceSort!=0){
                this.priceSort=0;
            }else{
                this.priceSort=1;
            }

            this.$emit("sortFun",sort,this.priceSort);

        }
    }
}
</script>
<style>

    .sortTab{height: 1rem;display: flex;justify-content: space-around;color: #999999;align-items: center;font-size: 0.26rem;}
    .sortTab .tabItem{height: 0.6rem;line-height: 0.6rem;width: 1.6rem;text-align: center;border:1px solid #eaeaea;border-radius: 15px;}
    .sortTab .tabItem.cur{color: #3289ff;border:1px solid #3289ff;}
    .sortTab .tabPriceItem{display: flex;justify-content: center;}
    
    .sortTab .arr {
      width: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.05rem;
    }
 
    .sortTab .arrUp {
      width: 0;
      height: 0;
      border: 0.08rem solid transparent;
      border-bottom-color: #ccc;
      cursor: pointer;
    }
 
    .sortTab .arrDown {
      width: 0;
      height: 0;
      border: 0.08rem solid transparent;
      border-top-color: #ccc;
      margin-top: 0.05rem;
      cursor: pointer;
    }

    .sortTab .arrUp.priceUpCur{border-bottom-color: #3289ff;}
    .sortTab .arrDown.priceDownCur{border-top-color: #3289ff;}

</style>


