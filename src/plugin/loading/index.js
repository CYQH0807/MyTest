/*
 * date:20180425
 * auth:谢力
 * loading等待框
 *
 * @container						string					(可选)包裹容器						默认 body
 * @masterBackground				string					(可选)覆盖层背景颜色					  默认 rgba(255,255,255,.6)
 * @spinnerBackground				string					(可选)loading层背景颜色			   默认 rgba(0,0,0,0)
 * @spinnerStroke					string					(可选)loading线颜色					 默认 #409EFF
 * @text							boolean					(可选)是否显示文字					  默认 false
 * @mini							boolean					(可选)是否mini展示					默认 false
 * 
 */
import loading from './loading'

let Loading=function(){
	this.defaults={
		container:'body',
		masterBackground:'rgba(255,255,255,.6)',
		spinnerBackground:'rgba(0,0,0,0)',
		spinnerStroke:'#409EFF',
		text:false,
		mini:false
	};
	return this;
};

Loading.components={};

Loading.prototype.creat=function(options={}){
	this.loading=new Loading.components.loading();
	this.ops=Object.assign({},this.defaults,options);
	if(options.container&&options.container!=this.defaults.container){
		this.loading.fixed=false;
	};
	if(!this.ops.mini){
		this.ops.text=false;
	};
	this.loading.stroke=this.ops.spinnerStroke;
	this.loading.masterBackground=this.ops.masterBackground;
	this.loading.spinnerBackground=this.ops.spinnerBackground;
	this.loading.mini=this.ops.mini;
	this.loading.text=this.ops.text;
	this.loading.$mount();
	document.querySelector(this.ops.container).appendChild(this.loading.$el);
	return this;
};

Loading.prototype.close=function(){
	if(this.loading&&this.loading.$el){
		//this.loading.$el.parentNode.removeChild(this.loading.$el);
		this.loading.close();
	};
}

export default {
	install(vue,options={}){
		Loading.vue=vue;
		Loading.components.loading=vue.extend(loading);
		vue.loading=vue.prototype.$loading=this;
	},
	creat(options){
		Loading.vue.__loadings=Loading.vue.__loadings||[];
		let loading=new Loading();
		Loading.vue.__loadings.push(loading);
		return loading.creat(options);
	},
	close(waiting){
		if(waiting){
			waiting.close();
		}else{
			if(Loading.vue.__loadings&&Loading.vue.__loadings.length){
				for(var i=0;i<Loading.vue.__loadings.length;i++){
					Loading.vue.__loadings[i].close();
				};
			};
		};
		return new Promise(resolve=>{
			//console.log(1)	
			//resolve(222)
		});
	}
}
