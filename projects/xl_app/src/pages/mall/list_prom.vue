<template>
	<div class="reco">
		<eleTit :bak="true" :title="pTitle" ref="eleTit"></eleTit>
		<div class="loading" v-if="isShowLoad">
			<div class="loadingIn">
				<img src="../../assets/img/xileloading.gif" alt="">
				<p>加载中...</p>
			</div>
		</div>
		<div id="mask" v-if="tag.show.thi || tag.show.bra" @click.stop="closeMask"></div>
		<!-- TODO: 搜索部分 -->
		<div id="rec_head">
			<div class="rec_sea">
				<div class="rec_sea_bak" :style="{visibility: sea.run ? 'visible' : 'hidden'}" @click.stop="bakTag"></div>
				<form @onsubmit="getSea()">
					<div class="rec_sea_inp">
						<div class="rec_sea_find"></div>
						<input type='search' placeholder="" v-model="sea.txt" ref="searchBox" @click="showHisList"/>
						<div class="rec_sea_close" :style="{visibility: sea.txt ? 'visible' : 'hidden'}" @click.stop="clsSea"></div>
					</div>
					<div class="rec_sea_exec" @click.stop="getSea()">搜索</div>
					<input type="submit" style="display: none;" value="搜索">
				</form>
				<div class="clear"></div>
				<div v-if="sea.run && tag.recs.length > 0 && !isShowHistory" class="rec_sea_tkf">
					<div class="rec_sea_tkf_img"></div><!-- 灯泡图标 -->
					<div class="rec_sea_tkf_lab ft2_item">您要找的是不是</div>
					<div class="rec_sea_tkf_line">
						<div v-for="(val, ind) in tag.recs" :key="ind" class="rec_sea_tkf_item ft2_item" @click.stop="getRec(val)">{{val}}</div>
					</div>
					<div class="clear"></div>
				</div>
				<div v-else-if="sea.run" class="rec_sea_bottom clear"></div>
			</div>
			<!-- TODO: 搜索选择公司 -->
			<div v-if="sea.run && tag.bras.length > 0 && !isShowHistory" class="rec_bra" >
				<div class="rec_bra_short">
					<div class="rec_bra_item ft2_item" :class="{'rec_active': !tag.actBra}" @click.stop="calBra()">全部</div>
					<div v-if="tag.actBra" class="rec_bra_item ft2_item rec_active" @click.stop="calBra()">{{tag.actBra}}</div>
					<template v-for="n in 5">
						<div v-if="tag.bras[n - 1] && tag.bras[n - 1] !== tag.actBra" :key="n" class="rec_bra_item ft2_item" @click.stop="getBra(tag.bras[n - 1])">{{tag.bras[n - 1]}}</div>
					</template>
				</div>
				<div class="rec_bra_arr" @click.stop="showBra(true)">&nbsp;</div>
				<div class="clear"></div>
				<div v-if="tag.show.bra" class="rec_bra_float">
					<div class="rec_bra_flo_r">
						<div class="rec_bra_item ft2_item" @click.stop="calBra()"  :class="{'rec_active': !tag.actBra}">全部</div>
						<div v-for="(val, ind) in tag.bras" :key="ind" class="rec_bra_item ft2_item" :class="{rec_active: val === tag.actBra}" @click.stop="getBra(val)">{{val}}</div>
						<div class="clear"></div>
					</div>
					<div class="rec_bra_float_arr" @click.stop="showBra(false)"></div>
					<div class="rec_bra_float_sha clear"></div>
				</div>
			</div>
			<!-- TODO: 标签选择 -->
			<div v-if="!sea.run && !isShowHistory" class="rec_tag">
				<div class="rec_tag_top">
					<div class="rec_tag_top_item ft1_item" :class="{rec_active: !tag.selTopTag}" @click.stop="getAllTag()">全部</div>
					<!-- <div v-if="tag.selTopTag" class="rec_tag_item ft1_item rec_active">{{tag.selTopTag.name}}</div> -->
					<div v-for="(toi, ind) in tag.tags" :key="ind" class="rec_tag_item ft1_item" :class="{rec_active: tag.selTopTag === toi}" @click.stop="getTopTag(toi)">{{toi.name}}</div>
				</div>
				<div v-if="!tag.selTopTag" class="rec_tag_top_sha clear"></div>
				<div v-if="tag.selTopTag" class="rec_tag_thi">
					<div class="rec_tag_thi_short">
						<div class="rec_tag_item ft11_item" :class="{rec_active: !tag.selThiTag}" @click.stop="getTopTag(tag.selTopTag,true)">
							<img :src="'static/timg/' + tag.selTopTag.img">
							<br />
							全部
						</div>
						<div v-if="tag.selThiTag" class="rec_tag_item ft11_item rec_active"><img :src="'static/timg/' + tag.selThiTag.img"><br />{{tag.selThiTag.name}}</div>
						<template v-for="n in 4">
							<div v-if="tag.thiTags[n - 1] && tag.thiTags[n - 1] !== tag.selThiTag" :key="n" class="rec_tag_item ft11_item" @click.stop="getThiTag(tag.thiTags[n - 1])">
								<img :src="'static/timg/' + tag.thiTags[n - 1].img">
								<br />
								{{tag.thiTags[n - 1].name}}
							</div>
						</template>
					</div>
					<div class="rec_tag_thi_arr" @click.stop="showThi(true)"></div>
					<div v-if="tag.show.thi" class="rec_tag_thi_float">
						<div class="rec_tag_thi_flo_r">
							<div class="rec_tag_item ft11_item" :class="{rec_active: !tag.selThiTag}" @click.stop="getTopTag(tag.selTopTag,true)">
								<img :src="'static/timg/' + tag.selTopTag.img">
								<br />
								全部
							</div>
							<div v-for="(thi, ind) in tag.thiTags" :key="ind" class="rec_tag_item ft11_item" :class="{rec_active: thi === tag.selThiTag}" @click.stop="getThiTag(thi)">
								<img :src="'static/timg/' + thi.img">
								<br />
								{{thi.name}}
							</div>
						</div>
						<div class="rec_tag_thi_float_arr" @click.stop="showThi(false)"></div>
						<div class="rec_tag_thi_float_sha clear"></div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<!-- TODO: 排序部分 -->
			<div class="rec_sort" v-if="!isShowHistory">
				<div class="secondBtnContent">
					<div class="titleSecondBtn" :class="[sort.none !==0 ? 'rec_active selectBorder':'noselectBorder']" @click.stop="changeSort('none')">
						<font>综合</font>
					</div>
					<div class="titleSecondBtn"  :class="[sort.sales !==0 ? 'rec_active selectBorder':'noselectBorder']" @click.stop="changeSort('sales')">
						<font>销量</font>
						<div class="shop_title_sort" :class="{shop_sort_up: sort.sales === 1, shop_sort_down: sort.sales === 2}">
							<i class="iconfont iconpaixujiantoushang shop_title_sort_up"></i>
							<i class="iconfont iconpaixujiantouxia shop_title_sort_down" size="24px"></i>
						</div>
					</div>
					<div class="titleSecondBtn" :class="[sort.price !==0 ? 'rec_active selectBorder':'noselectBorder']" @click.stop="changeSort('price')">
						<font>价格</font>
						<div class="shop_title_sort" :class="{shop_sort_up: sort.price === 1, shop_sort_down: sort.price === 2}">
							<i class="iconfont iconpaixujiantoushang shop_title_sort_up"></i>
							<i class="iconfont iconpaixujiantouxia shop_title_sort_down" size="24px"></i>
						</div>
					</div>
					<div class="titleSecondBtn" :class="[sort.tk !==0 ? 'rec_active selectBorder':'noselectBorder']" @click.stop="changeSort('tk')">
						<font>佣金</font>
						<div class="shop_title_sort" :class="{shop_sort_up: sort.tk === 1, shop_sort_down: sort.tk === 2}">
							<i class="iconfont iconpaixujiantoushang shop_title_sort_up"></i>
							<i class="iconfont iconpaixujiantouxia shop_title_sort_down" size="24px"></i>
						</div>
					</div>
				</div>
				<div class="rec_sor_sha clear"></div>
			</div>
			<div class="clear"></div>
		</div>
		<!-- TODO: 数据列表 -->
		<!-- <div class="rec_ite_list" :style="{'top': marginTop}"> -->
		<div class="rec_ite_list" v-if="!isShowHistory" :style="{height:listHeight}" @touchstart="inTouchDown" @touchmove="onTouchMove" @touchend="inTouchUp" @mousedown="inTouchDown" @mousemove="onTouchMove" @mouseup="inTouchUp">
			<list :items="items" ref="itemList" @refresh="refList" @infinite="lodList"></list>
			<div class="clear"></div>
		</div>
		<!-- TODO: 历史记录 -->
		<div class="his_list" v-if="isShowHistory">
			<div v-for="(item,index) in hisList" :key="index" class="hisItem"  @click.stop="addSearchKey(item)">
				<span class="itemImg"><img src="../../assets/img/hisItem.png" /></span>
				<span>{{item}}</span>
			</div>
			<div class="hisItem clearHisBtn" @click.stop="clearHistory">清除历史记录</div>
		</div>
	</div>
</template>
<!-- TODO: -->
<script>
import {reqReco} from "../../utils/request";
import list from "@/components/mall/mlist";
import eleTit from "@/components/title/title";

export default {
	data: function() {
		return {
			sea: {
				val: '', // 搜索内容
				txt: '', // 用户的录入内容
				run: false, // 是否搜索进行时 2019-06-25
			},
			pr: { // 分页相关数据
				page: 1, // 当前页数
				size: 20, // 目标页数据量
			},
			sort: { // 排序部分
				none: 1, // 默认模式：0，未选中；1，被选中；
				sales: 0, // 销量：0，未选中；1，正序；2，倒序；
				price: 0, // 价格：0，未选中；1，正序；2，倒序；
				tk: 0, // 佣金：0，未选中；1，正序；2，倒序；
			},
			tag:{
				tags: [], // 一级标签列表
				selTopTag: undefined, // 被选中的一级标签的名字
				thiTags: [], // 三级标签列表
				selThiTag: undefined, // 被选中的三级标签的名字
				recs: [], // 想找列表
				bras: [], // 品牌列表
				actBra: '', // 被选中的品牌
				show: { // 显示块相关
					bra: false, // 公司列表
					thi: false, // 三级标签
				},
			},
			pTitle: '',
			listHeight: 0, // 数据列表高度
			headHeight: 0, // 头部高度
			marginTop:0,
			items: [], // 商品列表
			// noDaTxt: '没有更多商品', // 没有数据时显示的内容
			lastReq: { // 最后一次请求
				tag: '',
				val: ''
			},
			pf:'tb',
			isShowLoad:false,//loading是否加载,
			hisList:[],//历史记录
			isShowHistory:false,
			onTouch: { // 列表点击控制
				inDown: false,
				inTouchMove:false,
				lockTime:0,
				tPoint:{x:0,y:0}
			}
		}
	},
	/**
	 * 组件检查 FIXME: 相关内容
	 */
	components:{
		list, eleTit
	},
	// TODO: 加载开始时逻辑
	created() {
		// 得到请求参数
		const tpf = this.$route.query.pf;
		if (tpf === 'jd') {
			this.pTitle = '京东返利商城';
			this.pf = 'jd';
		} else {
			this.pTitle = '淘宝返利商城';
		}
		if (this.$route.query.wd) {
			this.sea.txt = this.$route.query.wd;
		}
	},
	// TODO: 加载完成后逻辑
	mounted() {
		this.searchEvent();
		if (this.sea.txt) {
			this.getTag();
			this.getSea();
		} else {
			this.getTag();
			this.getAllTag();
		}
		// if (this.pf === 'jd') {
		// 	this.noDaTxt = '没有更多商品';
		// } else {
		// 	this.noDaTxt = '没有更多商品';
		// }
		this.resizeHead();
	},
	// TODO: 一般方法集合
	methods: {
		 inTouchDown: function(e) {
          // console.log(" inTouchDown ... " , e);
          this.onTouch.inDown = true;
          if (e.targetTouches) {
            let tt = e.targetTouches[0];
            if (tt) {
              this.onTouch.tPoint.x = e.pageX;
              this.onTouch.tPoint.y = e.pageY;
            }
          }
        },
        onTouchMove: function(e) {
          if (this.onTouch.inDown) {
            // console.log(" onTouchMove ... " , e);
            if (e.targetTouches) {
              let tt = e.targetTouches[0];
              if (tt) {
                if (Math.abs(tt.pageX - this.onTouch.tPoint.x) > 5) {
                  return;
                }
                if (Math.abs(tt.pageY - this.onTouch.tPoint.y) > 5) {
                  return;
                }
                if (!this.onTouch.inTouchMove){
                  this.onTouch.inTouchMove = true;
                }
              }
            }
          }
        },
        inTouchUp: function(e) {
          // console.log("   inTouchUp ... " , e);
          if (this.onTouch.inTouchMove) {
            this.onTouch.lockTime = new Date().getTime() + 700;
            this.onTouch.inTouchMove = false;
          }
          this.onTouch.inDown = false;
          this.onTouch.tPoint.x = 0;
          this.onTouch.tPoint.y = 0;
        },
		clearHistory(){
			localStorage.removeItem("tea_goods_search");
			this.isShowHistory = false;
			this.hisList = [];
		},
		addSearchKey(item){
			this.sea.txt = item;
			// this.getSea();
			this.readySea();
		},
		showHisList(){//拿历史数据
			if(localStorage.getItem("tea_goods_search")){
				this.hisList = JSON.parse(localStorage.getItem("tea_goods_search")).data;
				if(this.hisList.length > 0){
					this.isShowHistory = true;
				}
			}else{
				this.hisList= [];
				this.isShowHistory = false;
			}
			this.sea.run = true;
		},

		closeMask(){
			if(this.tag.show.thi){
				this.showThi(false);
			}else if(this.tag.show.bra){
				this.showBra(false);
			}
		},
		searchEvent(){
			let that = this;
			this.$refs.searchBox.onkeypress = function(e){
				var keycode = e.keyCode;
				if(keycode == 13){
					// e.preventDefault();
					// that.getSea();
					that.readySea();
					document.activeElement.blur();
				}
			};
		},
		readySea(val) {
			if (!val) {
				val = this.sea.txt;
			}
			this.$router.push({name: "recom", query:{pf: this.pf, wd: val}});
		},
		/**
		 * 进行搜索
		 * @author xwj 2019-06-22
		 */
		getSea(page) {
			if (!this.sea.txt) {
				if (this.sea.val) {
					this.clsSea();
				}
				return;
			}
			this.isShowHistory = false;
			this.hisList = this.hisList.slice(0,9);
			if(this.hisList.includes(this.sea.txt)){
				let position = this.hisList.indexOf(this.sea.txt);
				this.hisList.splice(position,1);
				this.hisList.unshift(this.sea.txt);
			}else{
				this.hisList.unshift(this.sea.txt);
			}
			localStorage.setItem("tea_goods_search",JSON.stringify({data:this.hisList}));
			this.hideLoad();
			const param = {
				keyword: this.sea.txt,
				pageNo: (!page || page < 2) ? 1 : page,
				sort: this.getSortParam()
			};
			const that = this;
			reqReco[this.pf + 'Search'](param).then(res => {
				this.isShowLoad = false;
				that.sea.val = that.sea.txt;
				that.sea.run = true;
				that.lastReq.tag = 'sea';
				that.resSeaData(res, 'sea', param.pageNo);
			});
		},
		/**
		 * 选推荐项
		 * @author xwj 2019-06-22
		 */
		getRec(val, page) {
			const param = {
				recommend: val,
				pageNo: (!page || page < 2) ? 1 : page,
				sort: this.getSortParam()
			};
			const that = this;
			reqReco[this.pf + 'Search'](param).then(res => {
				this.sea.txt = val;
				that.lastReq.tag = 'sea';
				that.resSeaData(res, 'rec', param.pageNo);
			});
		},
		/**
		 * 选品牌
		 * @author xwj 2019-06-22
		 */
		getBra(val, page) {
			const param = {
				keyword: this.sea.val,
				brand: val,
				pageNo: (!page || page < 2) ? 1 : page,
				sort: this.getSortParam()
			};
			this.hisList = this.hisList.slice(0,9);
			if(this.hisList.includes(this.sea.txt)){
				let position = this.hisList.indexOf(this.sea.txt);
				this.hisList.splice(position,1);
				this.hisList.unshift(this.sea.txt);
			}else{
				this.hisList.unshift(this.sea.txt);
			}
			localStorage.setItem("tea_goods_search",JSON.stringify({data:this.hisList}));
			const that = this;
			this.hideLoad();
			reqReco[this.pf + 'Search'](param).then(res => {
				this.isShowLoad = false;
				that.tag.actBra = val;
				that.lastReq.tag = 'bra';
				that.lastReq.val = val;
				that.resSeaData(res, 'bra', param.pageNo);
				that.showBra(false);
			});
		},
		/**
		 * 取消选中的品牌
		 * @author xwj 2019-06-24
		 */
		calBra() {
			this.tag.actBra = '';
			this.getBra('');
		},
		/**
		 * 处理搜索返回的数据
		 * @author xwj 2019-06-22
		 */
		resSeaData(res, tag, page) {
			if (!res.code) {
				res = JSON.parse(res);
			}
			if (tag !== 'bra') {
				this.tag.bras.splice(0, this.tag.bras.length);
				this.tag.recs.splice(0, this.tag.recs.length);
				this.tag.bras = res.data.brand;
				this.tag.recs = res.data.rs_keywords;
			}
			if (!page || page < 2) {
				this.items = [];
				this.items = res.data.items;
				this.itemsTop();
				this.finishPullToRefresh();
			} else {
				const ti = res.data.items;
				for (let k in ti) {
					this.items.push(ti[k]);
				}
				this.pr.page = page + 1;
			}
			if (res.data.items.length < this.pr.size) {
				this.finishInfinite(true);
			} else {
				this.finishInfinite(false);
			}
		},
		/**
		 * 清除搜索内容
		 * @author xwj 2019-06-25
		 */
		clsSea() {
			this.sea.txt = '';
			this.sea.val = '';
			this.tag.actBra = '';
			// this.tag.bras.splice(0, this.tag.bras.length);
			// this.tag.recs.splice(0, this.tag.recs.length);
			// this.getAllTag();
		},
		/**
		 * 回到标签列表
		 * @author xwj 2019-06-25
		 */
		bakTag() {
			this.clsSea();
			this.sea.run = false;
			this.getAllTag();
			this.isShowHistory = false;
		},
		/**
		 * 得到标签列表
		 * @author xwj 2019-06-24
		 */
		getTag() {
			const that = this;
			reqReco.tagXml().then(res => {
				that.tag.tags = that.xmlStrToJson(res);
			});
		},
		/**
		 * 进行商品品牌的显示
		 * @author xwj 2019-06-24
		 */
		showBra(iShow) {
			if (this.tag.show.bra !== iShow) {
				this.tag.show.bra = iShow;
			}
		},
		/**
		 * 进行三级标签的显示
		 * @author xwj 2019-06-24
		 */
		showThi(iShow) {
			if (this.tag.show.thi !== iShow) {
				this.tag.show.thi = iShow;
			}
		},
		/**
		 * 显示所有标签的商品
		 * @author xwj 2019-06-24
		 */
		getAllTag(page) {
			const param = {
				source: this.pf === 'tb' ? 1 : 0,
				pageNo: (!page || page < 2) ? 1 : page,
				pageSize: this.pr.size,
				sort: this.getSortParam()
			};
			const that = this;
			// this.isShowLoad = true;
			this.hideLoad();
			{
				this.tag.selTopTag = undefined;
				this.tag.selThiTag = undefined;
				this.tag.thiTags = [];
			}
			reqReco.tagDatas(param).then(res => {
				this.isShowLoad = false;
				that.lastReq.tag = 'all';
				that.resTagData(res, param.pageNo);
			});
		},
		hideLoad(){
			this.isShowLoad = true;
			setTimeout(() => {
				this.isShowLoad = false;
			}, 3000);
		},
		/**
		 * 显示指定一级标签的商品
		 * @author xwj 2019-06-24
		 */
		getTopTag(tag, ref, page) {
			if (ref) {
				this.tag.selThiTag = undefined;
			}
			const param = {
				source: this.pf === 'tb' ? 1 : 0,
				fieldName: 'topGroup',
				fieldValue: tag.name,
				pageNo: (!page || page < 2) ? 1 : page,
				pageSize: this.pr.size,
				sort: this.getSortParam()
			};
			const that = this;
			this.hideLoad();
			{
				this.tag.selTopTag = tag;
				this.tag.selThiTag = undefined;
				this.tag.thiTags = tag.thi;
			}
			reqReco.tagDatas(param).then(res => {
				that.isShowLoad = false;
				if (res.code === 200) {
					that.tag.selTopTag = tag;
					that.lastReq.tag = 'top';
					that.lastReq.val = tag;
					that.tag.selThiTag = undefined;
					that.resTagData(res, param.pageNo);
				}
			});
		},
		/**
		 * 显示指定三级标签的商品
		 * @author xwj 2019-06-24
		 */
		getThiTag(tag, page) {
			this.tag.show.thi = false;
			this.sea.txt = tag.name;
			// this.getSea();
			this.readySea();
		},
		/**
		 * 处理标签返回的数据
		 * @author xwj 2019-06-22
		 */
		resTagData(res, page) {
			if (page < 2) {
				this.items = res.data;
				this.pr.page = 1;
				this.itemsTop();
				// this.$refs.itemList.finishPullToRefresh();
				this.finishPullToRefresh();
			} else {
				for (let k in res.data) {
					this.items.push(res.data[k]);
				}
				this.pr.page = page + 1;
			}
			// this.$refs.itemList.finishInfinite(false);
			this.finishInfinite(false);
		},
		/**
		 * TODO: 解析XML
		 * 将XML字串转为json结构数据
		 * 根据既定规则，硬解xml内容
		 * 暂时不进行通用模型处理
		 * @author xwj 2019-06-24
		 */
		xmlStrToJson(xmlVal) {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlVal,"text/xml");
			const bak = [];
			// 得到第一层
			const topArr = xmlDoc.getElementsByTagName('top');
			let top, thi;
			let thiArr;
			let topCont, thiCont;
			for (let i = 0, mi = topArr.length; i < mi; i++) {
				top = topArr[i];
				try{
					topCont = {
						name: top.getAttribute('group'),
						img: top.getAttribute('img'),
						ser: top.getAttribute('serial'),
						thi:[]
					};
				} catch (e) {
					console.error(e);
				}
				thiArr = top.getElementsByTagName('third');
				for (let j = 0, mj = thiArr.length; j < mj; j++) {
					thi = thiArr[j];
					try{
						thiCont = {
							name: thi.getAttribute('group'),
							img: thi.getAttribute('img'),
							ser: thi.getAttribute('serial'),
						}
						
					} catch (e) {
						console.error(e);
					}
					topCont.thi.push(thiCont);
				}
				bak.push(topCont);
			}
			return bak;
		},
		/**
		 * 变更排序内容
		 * @author xwj 2019-06-25
		 */
		changeSort(tag) {
			for (let k in this.sort) {
				if (k === tag) {
					switch (this.sort[k]) {
						case 0:
							this.sort[k] = 1;
							break;
						case 1:
							if (k === 'none') {
								this.sort[k] = 1;
							} else {
								this.sort[k] = 2;
							}
							break;
						case 2:
							this.sort[k] = 1;
							break;
					}
				} else {
					this.sort[k] = 0;
				}
			}
			// 从新请求数据
			this.refreshReq();
		},
		/**
		 * 得到排序用参数
		 * @author xwj 2019-06-25
		 */
		getSortParam() {
			if (this.sea.val) {
				// 是搜索相关
				if (this.sort.none) {
					return '';
				} else if (this.sort.sales) {
					return 'total_sales_' + (this.sort.sales === 1 ? 'asc' : 'des');
				} else if (this.sort.price) {
					return 'price_' + (this.sort.price === 1 ? 'asc' : 'des');
				} else if (this.sort.tk) {
					return 'tk_rate_' + (this.sort.tk === 1 ? 'asc' : 'des');
				}
				return '';
			} else {
				// 是分类相关
				if (this.sort.none) {
					return 0;
				} else if (this.sort.sales) {
					return this.sort.sales === 1 ? 1 : -1;
				} else if (this.sort.price) {
					return this.sort.price === 1 ? 2 : -2;
				} else if (this.sort.tk) {
					return this.sort.tk === 1 ? 3 : -3;
				}
				return 0;
			}
		},
		/**
		 * 从新发送请求
		 * @author xwj 2019-06-25
		 */
		refreshReq(page) {
			switch (this.lastReq.tag) {
				case 'sea': //
					this.getSea(page);
					return;
				case 'bra': //
					this.getBra(this.lastReq.val, page);
					return;
				case 'all': //
					this.getAllTag(page);
					return;
				case 'top': //
					this.getTopTag(this.lastReq.val, false, page);
					return;
				case 'thi': //
					this.getThiTag(this.lastReq.val, page);
					return;
			}
		},
		/**
		 * 头部大小变化，从新计算数据列表高度
		 * @author xwj 2019-06-26
		 */
		resizeHead(cou) {
			// console.log("in ... resizeHead .. ");
			if (cou && cou > 10) {
				alert('出现了一些未知问题...');
				return;
			}
			const et = this.$refs.eleTit;
			if (!et || !et.$el.clientHeight) {
				const that = this;
				setTimeout(()=>{
					that.resizeHead(!cou ? 1 : (cou + 1));
				}, 300);
				return;
			}
			const eh = document.getElementById('rec_head').clientHeight;
			if (this.headHeight === eh) {
				const that = this;
				setTimeout(()=>{
					that.resizeHead(!cou ? 1 : (cou + 1));
				}, 300);
				return;
			}
			const ah = et.$el.clientHeight;
			const ch = document.body.offsetHeight;
			this.headHeight = eh;
			this.listHeight = (ch - ah - eh) + 'px';
			this.marginTop = eh + 'px';
			// console.log("out ... resizeHead .. ");
		},
		// FIXME: 子页面List专用交互方法接口开始
		/**
		 * 刷新当前列表
		 * @author xwj 2019-06-24
		 */
		refList() {
			this.refreshReq();
		},
		/**
		 * 继续加载当前列表
		 * @author xwj 2019-06-24
		 */
		lodList() {
			this.refreshReq(this.pr.page + 1);
		},
		// FIXME: 子页面List专用接口开始
		finishPullToRefresh() {
			if (this.$refs.itemList && this.$refs.itemList.finishPullToRefresh) {
				this.$refs.itemList.finishPullToRefresh();
			} else {
				const that = this;
				setTimeout(() => {
					that.finishPullToRefresh();
				}, 300);
			}
		},
		finishInfinite(st) {
			if (this.$refs.itemList && this.$refs.itemList.finishInfinite) {
				this.$refs.itemList.finishInfinite(st);
			} else {
				const that = this;
				setTimeout(() => {
					that.finishInfinite(st);
				}, 300);
			}
		},
		/**
		 * 商品列表置顶
		 * @author xwj 2019-06-25
		 */
		itemsTop() {
			if (this.$refs.itemList && this.$refs.itemList.scrollTo) {
				this.$refs.itemList.scrollTo(0, 0, false);
			} else {
				const that = this;
				setTimeout(() => {
					that.itemsTop();
				}, 300);
			}
		},
		// FIXME: 子页面List专用接口结束
	},
	watch:{
		/**
		 * 用于判定头部大小变化
		 * 从新计算数据列表高度
		 * @author xwj 2019-06-26
		 */
		'sea.run'(val1, val2, val3, val4) {
			this.resizeHead();
		},
		/**
		 * 用于判定头部大小变化
		 * 从新计算数据列表高度
		 * @author xwj 2019-06-26
		 */
		selTopTag(val1, val2, val3, val4) {
			if (!val1 || !val2) {
				this.resizeHead();
			}
		}
	},
	// beforeRouteEnter(to,from,next){
	// 	console.log(213123123, sessionStorage.askPositon);
	// 	next(vm => {
	// 		if(from.path == '/share2' || from.path == "/shareList"){
	// 			var toHeight = sessionStorage.askPositon
	// 			setTimeout(function () {
	// 				vm.$refs.itemList.scrollTo(0, toHeight, false);
	// 			}, 500) 
	// 		}else{
	// 			sessionStorage.askPositon = ''
	// 		}
	// 	})
	// },
	// beforeRouteLeave(to,from,next){//记录离开时的位置
	// 	sessionStorage.askPositon = this.$refs.itemList && this.$refs.itemList.getPosition() && this.$refs.itemList.getPosition().top;
	// 	next()
	// }
}
</script>
<!-- TODO: -->
<style scoped="scoped" type="text/css">
.reco {
	position: relative;
	height: 100vh;
}
.reco .clear {
	clear: both;
	width: 100%;
}
.reco .ft1_item {
	display: inline-block;
	margin-top: 16px;
	margin-left: 10px;
	margin-left: 12px;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 3px;
	height: 46px;
	line-height: 46px;
	overflow: hidden;
	font-size: 28px;
	color:#999;
}
.reco .ft2_item {
	display: inline-block;
	margin-left: 10px;
	margin-top: 12px;
	margin-left: 4px;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 2px;
	height: 36px;
	line-height: 36px;
	overflow: hidden;
	font-size: 24px;
}
.reco .rec_active {
	color: #EF4454 !important;
}
.reco .rec_fail {
	color: #A5A5A5 !important;
}
.reco #rec_head {
	width: 100%;
	height: auto;
	background:#fff;
}
/** 头部搜索 */
.reco .rec_sea {
	width: 750px;
	padding-top: 20px;
	background-color: #FFFFFF;
}
.reco .rec_sea .rec_sea_bak {
	float: left;
	margin-top: 15px;
	margin-left: 20px;
	width: 20px;
	height: 34px;
	overflow: hidden;
	background-image: url(../../assets/img/bak.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.reco .rec_sea .rec_sea_inp {
	float: left;
	margin-left: 15px;
	width: 550px;
	height: 64px;
	overflow: hidden;
	background-color: #F3F3F3;
	border-radius: 32px;
	-webkit-border-radius: 32px;
}
.reco .rec_sea .rec_sea_inp .rec_sea_find{
	float: left;
	margin-left: 20px;
	margin-top: 16px;
	width: 32px;
	height: 32px;
	overflow: hidden;
	background-image: url(../../assets/img/search_bg.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.reco .rec_sea .rec_sea_inp > input{
	/* float: left;
	margin-left: 20px;
	margin-top: 16px; */
	width: 78%;
	height: 64px;
	line-height: 64px;
	font-size: 28px;
	padding-left:20px;

}
.reco .rec_sea .rec_sea_inp .rec_sea_close{
	float: right;
	margin-top: 16px;
	margin-right: 20px;
	width: 34px;
	height: 33px;
	overflow: hidden;
	background-image: url(../../assets/img/cls.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.rec_sea .rec_sea_exec{
	float: left;
	height:64px;
	/* line-height:64px; */
	padding:0px 20px 0 30px;
	color:#6a6a6a;
	font-size:28px;
	display:flex;
	align-items: center;
}
.reco .rec_sea .rec_sea_inp .rec_sea_exec{
	float: right;
	margin-top: 18px;
	width: 100px;
	height: 28px;
	line-height: 28px;
	font-size: 28px;
	text-align: center;
	border-left: 2px solid #C9C9C9;
}
.reco input::-webkit-input-placeholder{
	color: #999999
}
/** TODO: 头部搜索想找 */
.reco .rec_sea .rec_sea_tkf {
	/* margin-top: 10px; */
	width: 750px;
	height: 75px;
	padding-top: 8px;
	overflow: hidden;
}
.reco .rec_sea .rec_sea_tkf_img {
	float: left;
	margin-top: 14px;
	margin-left: 24px;
	width: 32px;
	height: 32px;
	overflow: hidden;
	background-image: url(../../assets/img/tfind.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
}
.reco .rec_sea .rec_sea_tkf_lab {
	float: left;
	margin-top: 12px;
	overflow: hidden;
	font-size: 28px;
}
.reco .rec_sea .rec_sea_tkf_line {
	float: left;
	width: calc(100vw - 277px);
	height: 60px;
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
	white-space: nowrap;
}
.reco .rec_sea .rec_sea_tkf_line .rec_sea_tkf_item {
	display: inline-block;
	background-color: #F3F3F3;
	border-radius: 36px;
	-webkit-border-radius: 36px;
	font-size: 28px;
	margin-right: 12px;
}
.reco .rec_sea .rec_sea_bottom{
	width: 100%;
	height: 20px;
	overflow: hidden;
}
/** TODO: 头部搜索品牌 */
.reco .rec_bra {
	width: 100%;
	height: 60px;
	position: relative;
	border-top: 2px solid #F3F3F3;
	background-color: #FFFFFF;
}
.reco .rec_bra .rec_bra_short {
	float: left;
	margin-left: 20px;
	margin-right: 5px;
	width: 620px;
	height: 60px;
	overflow: hidden;
}
.reco .rec_bra .rec_bra_arr {
	float: right;
	/* margin-top: 16px;
	margin-right: 20px;  */
	width:100px; 
	height: 60px;
	overflow: hidden;
	background-image: url(../../assets/img/more.png);
	background-size: 50%;
	-moz-background-size: 50%;
	background-repeat: no-repeat;
	background-position:center;
	opacity: 0.6;
}
.reco .rec_bra .rec_bra_float {
	position: absolute;
	top: 0px;
	z-index: 10000;
	background-color: #FFFFFF;
	box-shadow: 0 5px 10px #ececec;/*no*/
}
.reco .rec_bra .rec_bra_float .rec_bra_item {
	float: left !important;
}
.reco .rec_bra .rec_bra_float .rec_bra_flo_r {
	width: 750px;
	min-height: 80px;
}
.reco .rec_bra .rec_bra_float_arr {
	width: 100%;
	height: 60px;
	overflow: hidden;
	text-align: center;
	background-image: url(../../assets/img/ret.png);
	background-size: 60px 60px;
	-moz-background-size: 90px 60px;
	background-position: 50% 50%;
	background-repeat: no-repeat;
}
.reco .rec_bra .rec_bra_float_sha {
	height: 8px;
	box-shadow: 0px 15px 10px -15px #ccc; 
}
/** 一级标签 */
.reco .rec_tag {
	width: 100%;
}
/** TODO: 一级标签 */
.reco .rec_tag .rec_tag_top{
	height: 80px;
	background-color: #FFFFFF;
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
	white-space: nowrap;
}
.reco .rec_tag .rec_tag_top_sha {
	height: 8px;
	background:#f3f3f3;
	/* box-shadow: 0px 5px 5px -5px #ccc;  */
}
/** TODO: 三级标签 */
.reco .rec_tag .rec_tag_thi{
	margin-top: 2px;
	height: 160px;
	background-color: #FFFFFF;
	position: relative;
}
.reco .rec_tag .rec_tag_thi .rec_tag_thi_short {
	float: left;
	margin-left: 10px;
	width: 680px;
	height: 160px;
	overflow: hidden;
}
.reco .rec_tag .rec_tag_thi .rec_tag_thi_arr {
	float: right;
	margin-top: 20px;
	margin-right: 10px;
	width: 45px;
	height: 120px;
	overflow: hidden;
	border: 1px solid #000000;/*no*/
	border-radius: 10px;
	-webkit-border-radius: 10px;
	background-image: url(../../assets/img/more.png);
	background-size: 40px 60px;
	-moz-background-size: 40px 60px;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	opacity: 0.5;
}
/** 三级标签浮动 */
.reco .rec_tag .rec_tag_thi .rec_tag_thi_float {
	position: absolute;
	top: 0px;
	z-index: 10000;
	width: 750px;
	max-height: 690px;
	overflow: hidden;
	background-color: #FFFFFF;
	box-shadow: 0 5px 10px #ececec;/*no*/
}
.reco .rec_tag .rec_tag_thi .rec_tag_thi_float .rec_tag_thi_flo_r {
	width: 750px;
	height: 500px;
	margin-bottom: 60px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.reco .rec_tag .rec_tag_thi .rec_tag_item {
	float: left;
	margin-top: 10px;
	margin-left: 25px;
	width: 120px;
	height: 140px;
	overflow: hidden;
	text-align: center;
}
.reco .rec_tag .rec_tag_thi .rec_tag_thi_short .rec_tag_item {
	margin-left: 16px;
}
.reco .rec_tag .rec_tag_thi .rec_tag_item > img {
	margin-left: 10px;
	width: 100px;
	height: 100px;
	overflow: hidden;
}
.reco .rec_tag .rec_tag_thi_float_arr {
	position: absolute;
	bottom: 0px;
	width: 100%;
	height: 60px;
	text-align: center;
	background-color: #FFFFFF;
	background-image: url(../../assets/img/ret.png);
	background-size: 60px 60px;
	-moz-background-size: 90px 60px;
	background-position: 50% 50%;
	background-repeat: no-repeat;
}
.reco .rec_tag .rec_tag_thi_float_sha {
	height: 8px;
	box-shadow: 0px 15px 10px -15px #ccc;
}
/** TODO: 头部标签排序 */
.reco .rec_sort .secondBtnContent {
	margin-top: 3px;
	background: #fff;
	width: 100vw;
	height: 70px;
	overflow: hidden;
	display: flex;
	justify-content: space-around;
}
.reco .rec_sort .secondBtnContent .titleSecondBtn {
	/* float: left; */
	/* background-color: #fff; */
	margin-top: 7px;
	/* margin-left: 20px; */
	width: 150px;
	border-radius: 56px;
	height: 56px;
	border-radius: 48px;
	-webkit-border-radius: 48px;
	overflow: hidden;
	display: flex;
	align-items:center;
	justify-content: center;
}
.reco .rec_sort .secondBtnContent .titleSecondBtn font {
	/* float: left; */
	/* margin: 20px 0px 20px 45px; */
	font-size: 24px;
	color: #999999;
	/* height: 24px;
	line-height: 24px; */
}
.reco .rec_sort .secondBtnContent .rec_active font {
	color: #373737 !important;
	font-weight: bold;
}
.reco .rec_sort .secondBtnContent .iconfont {
	font-size: 24px;
}
.reco .rec_sort .secondBtnContent .shop_title_sort {
	/* float: left;
	margin-top: 16px;
	margin-left: 5px; */
	width: 26px;
	height: 26px;
	overflow: hidden;
	position: relative;
	color: #999999;
}
.reco .rec_sort .secondBtnContent .shop_title_sort_up {
	font-size: 26px;
	width: 26px;
	height: 22px;
	line-height: 24px;
	position: absolute;
	top: 0px;
	left: 0px;
	padding: 0px;
	overflow: hidden;
}
.reco .rec_sort .secondBtnContent .shop_sort_up .shop_title_sort_up {
	color: #000000;
}
.reco .rec_sort .secondBtnContent .shop_title_sort_up::before {
	width: 26px;
	height: 22px;
	line-height: 24px;
}
.reco .rec_sort .secondBtnContent .shop_title_sort_down {
	font-size: 26px;
	width: 26px;
	height: 22px;
	line-height: 22px;
	position: absolute;
	bottom: 0px;
	left: 0px;
	padding: 0px;
	overflow: hidden;
}
.reco .rec_sort .secondBtnContent .shop_sort_down .shop_title_sort_down {
	color: #000000;
}
.reco .rec_sort .secondBtnContent .shop_title_sort_down::before {
	width: 26px;
	height: 22px;
	line-height: 22px;
}
.reco .rec_sort .rec_sor_sha {
	height: 8px;
	background:#f3f3f3;
	/* box-shadow: 0px 5px 5px -5px #ccc;  */
}
/** TODO: 商品列表 */
.reco .rec_ite_list {
	width: 100vw;
	height: fill-available;
	height: -webkit-fill-available;
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #fff;
}
/** TODO: 滚动条相关 */
::-webkit-scrollbar {
      width: 1px;
}
::-webkit-scrollbar-track {
      background-color: transparent;
}
::-webkit-scrollbar-thumb {
      background-color: transparent;
}
::-webkit-scrollbar-button {
      background-color: transparent;
}
::-webkit-scrollbar-corner {
      background-color: transparent;
}
.selectBorder{
	background:#f9f9f9;
}
.reco #mask{
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background:rgba(0,0,0,.6);
	z-index:99;
}
/*loading部分*/
.reco .loading{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
  }
 .reco .loadingIn{
    width: 280px;
    height: 300px;
    border-radius: 10px;/*no*/
    background: rgba(0,0,0,0.5);
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-top: -150px;
    margin-left: -140px;
  }
 .reco .loadingIn img{
    width: 160px;
    height: 160px;
    margin-top: 50px;
  }
.reco .loadingIn p{
    padding-top: 20px;
    font-size: 28px;
}
/* 历史记录 */
.reco .his_list{
	margin-top:2.7rem;
}
.reco .hisItem{
	  width:100%;
	  height:85px;
	  border:1px solid #f0f0f0;/*no*/
	  font-size:30px;
	  color:#727272;
	  background:#fff;
	  line-height:85px;
  }
.reco .clearHisBtn{
	  text-align: center;
  }
.reco .itemImg{
	padding:0 25px;
}
.reco .itemImg img{
	width:0.4rem;
}
.pull-to-refresh-layer .spinner-holder {
	display: none !important;
	visibility: hidden !important;
}
.loading-layer .spinner-holder {
	display: none !important;
	visibility: hidden !important;
}
._v-container>._v-content>.loading-layer>.spinner-holder.activ {
	opacity: 0 !important;
}
</style>
