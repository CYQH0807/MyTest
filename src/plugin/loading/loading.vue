<template>
	<div v-if="!isClose" v-show="isShow" class="xVue-loading-mask" :style="{'background-color':masterBackground}" :class="{fullscreen:fixed,mini:mini}">
		<div class="xVue-loading-spinner" :class="{text:text}" :style="{'background-color':spinnerBackground}">
			<svg viewBox="25 25 50 50" class="xVue-loading-circular">
				<circle cx="50" cy="50" r="20" fill="none" class="xVue-loading-path" :style="{'stroke':stroke}"></circle>
			</svg>
			<span class="xVue-loading-text" :style="{'color':stroke}" v-if="text">加载中</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'loading',
	data(){
		return {
			isClose:false,
			fixed:true,
			isShow:true
		}
	},
	methods:{
		show(){
			this.isShow=true;
		},
		hide(){
			this.isShow=false;
		},
		close(){
			this.isClose=true;
		}
	}
}
</script>

<style scope>
.xVue-loading-mask{
	position:absolute;
	left:0;
	top:0;
	right:0;
	bottom:0;
	z-index:2000;
	cursor:default;
}
.xVue-loading-mask.fullscreen{
	position:fixed;
}
.xVue-loading-spinner{
	position:absolute;
	text-align:center;
	left:50%;
	top:50%;
	margin:-25px 0 0 -25px;
	width:60px;
	height:60px;
	border-radius:10px;
}
.xVue-loading-circular{
	position:absolute;
	left:5px;
	top:5px;
	width:50px;
	height:50px;
	-webkit-animation: loading-rotate 2s linear infinite;
	animation: loading-rotate 2s linear infinite;
}
.xVue-loading-path{
	-webkit-animation: loading-dash 1.5s ease-in-out infinite;
	animation: loading-dash 1.5s ease-in-out infinite;
	stroke-dasharray: 90,150;
	stroke-dashoffset: 0;
	stroke-width: 2;
	stroke-linecap: round
}
.xVue-loading-text{ display:none;}
.xVue-loading-spinner.text{ width:80px;height:80px;margin:-40px 0 0 -40px;}
.xVue-loading-spinner.text .xVue-loading-circular{ left:15px;} 
.xVue-loading-spinner.text .xVue-loading-text{
	display:block;
	text-align:center;
	font-size:12px;
	position:absolute;
	bottom:5px;
	left:0;
	right:0;
	line-height:20px;
}
.xVue-loading-mask.mini .xVue-loading-spinner{
	width:30px;
	height:30px;
	margin:-15px 0 0 -15px;
	border-radius:5px;
}
.xVue-loading-mask.mini .xVue-loading-circular{
	width:20px;
	height:20px;
	left:5px;
}
.xVue-loading-mask.mini .xVue-loading-spinner.text{
	width:75px;
	height:30px;
	margin-top:-15px;
}
.xVue-loading-mask.mini .xVue-loading-spinner.text .xVue-loading-text{
	font-size:12px;
	position:absolute;
	top:0;
	bottom:0;
	left:30px;
	right:0;
	white-space:nowrap;
	text-align:left;
	line-height:30px;
}
@-webkit-keyframes loading-rotate {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg)
	}
}
@keyframes loading-rotate {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg)
	}
}
@-webkit-keyframes loading-dash {
	0% {
		stroke-dasharray: 1,200;
		stroke-dashoffset: 0
	}

	50% {
		stroke-dasharray: 90,150;
		stroke-dashoffset: -40px
	}

	100% {
		stroke-dasharray: 90,150;
		stroke-dashoffset: -120px
	}
}

@keyframes loading-dash {
	0% {
		stroke-dasharray: 1,200;
		stroke-dashoffset: 0
	}
	50% {
		stroke-dasharray: 90,150;
		stroke-dashoffset: -40px
	}
	100% {
		stroke-dasharray: 90,150;
		stroke-dashoffset: -120px
	}
}

</style>