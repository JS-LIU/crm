var model = {
    removeModel:{},
    AddchildModel:{},
    resizeModel:{}
};
//	添加模块
model.AddchildModel = function($_parent){
	this.$_parent = $_parent;    
};
model.AddchildModel.prototype.addModel = function(){
	var $_smallModel = $('.template-box .J-model').clone(true);
	$_smallModel.addClass('small-model po').css({
        width:this.sm_width + 'px',
        height:this.sm_height + 'px',
        top:this.sm_top + 'px',
        left:this.sm_left + 'px',
        margin:'0px 0px 0px -1px'
	}).attr({
    	width:this.sm_width,
    	height:this.sm_height,
    	top:this.sm_top,
    	left:this.sm_left,
		bottom:(this.sm_height + this.sm_top)
    }).insertAfter(this.$_parent);
};
model.AddchildModel.prototype.removeParent = function(){
	this.$_parent.remove();
	this.$_parent.children('.J-btn-addsmodel-tb').hide();
	this.$_parent.children('.J-btn-addsmodel-lr').hide();
};


//  水平添加小模块
function HorizontalAppend($_parent){
	model.AddchildModel.call(this,$_parent);
    this.$_parentL = parseFloat($_parent.css('left'))||0;
	this.sm_width =  parseFloat($_parent.css('width')) / 2;			//	新盒子的宽度
    this.sm_height = parseFloat($_parent.css('height'));			//	新盒子的高度
    this.sm_top = parseFloat($_parent.css('top'))||0;				//	新盒子的TOP
}

HorizontalAppend.prototype = new model.AddchildModel();
HorizontalAppend.prototype.coustructor = HorizontalAppend;
HorizontalAppend.prototype.appendModel = function(){
	for(var i = 0 ;i < 2 ; i++){
	    this.sm_left = (this.$_parentL + i * this.sm_width);		//	新盒子的LEFT
	    this.addModel();

   }
};

//  水平添加小模块
function VerticalAppend($_parent){
	model.AddchildModel.call(this,$_parent);
    this.$_parentT = parseFloat($_parent.css('top'))||0;
	this.sm_width =  parseFloat($_parent.css('width'));				//	新盒子的宽度
    this.sm_height = parseFloat($_parent.css('height')) / 2;		//	新盒子的高度
    this.sm_left = parseFloat($_parent.css('left'))||0;				//	新盒子的TOP
}

VerticalAppend.prototype = new model.AddchildModel();
VerticalAppend.prototype.coustructor = HorizontalAppend;
VerticalAppend.prototype.appendModel = function(){
	for(var i = 0 ;i < 2 ; i++){
	    this.sm_top = (this.$_parentT + i * this.sm_height);		//	新盒子的TOP
	    this.addModel();
   }
};


model.resizeModel = function(){
	var $_elongate = $('.J-elongate');

	$_elongate.mousedown(function(e){

   		e = e||window.event;
   		var x = e.pageX,
   			x1,
   			$_self = $(this),
   			$_small_model = $_self.parent();

   		//	找到相邻的的等高盒子
		findNeaest($_small_model);


   		function move(e){
			e = e||window.event;
				x = x1 || x,
				x1 = e.pageX;
			var addW = x - x1;
			if(addW < 0){
				//	addW 为负值 所以要【-=】负负得正
				$_small_model.css('width','-='+addW);
				//	相邻的的等高盒子 一起变化

			}
		}
		$_self.bind('mousemove',move).mouseup(function(){
			$_self.unbind('mousemove',move);
		});
    });

	//	找到最近的相邻节点
    function findNeaest($_self){
		var neiLeft = parseFloat($_self.attr('left')) + parseFloat($_self.attr('width'));	//	邻居的left属性的值
		var $_neiDom = $('.J-model[left=' + neiLeft + ']');									//	相邻的所有
		var selfT = parseFloat($_self.attr('top'));
		var topArr = [];

		//	先找到高度差小的
		for(var i = 0 ; i <　$_neiDom.length;i++){
			var $_neiDomT = parseFloat($_neiDom.eq(i).attr('top'));
			var abs_dif = Math.abs($_neiDomT - selfT);
			topArr.push(abs_dif);
		}
		var difMin = Math.min.apply(Object,topArr);
		var index = topArr.indexOf(difMin);
		var $_nearestDom = $_neiDom.eq(index);												//	离被移动的节点最近的节点
		$_nearestDom.addClass('needResize');
	}

	//	找到所有需要被移动的节点
	function findResizeDom($_nearestDom,$_self,selfT){
		selfT = parseFloat($_self.attr('top'))||selfT;
		var nearestDomH = parseFloat($_nearestDom.attr('height'));
		var selfH = parseFloat($_self.attr('height'));
		var selfL = parseFloat($_self.attr('left'));
		var neiT = parseFloat($_nearestDom.attr('top'));
		//	判断 哪个盒子在上面
		if(selfT > neiT){				//	被扩展的盒子在下面
			var $_self_topDom = $('.J-model[left=' + selfL + '][bottom='+ selfT +']');
			$_self_topDom.addClass('needResize');
			var $_self_topDomH = parseFloat($_self_topDom.attr('height'));

			selfT += $_self_topDomH;
			return findResizeDom($_nearestDom,$_self_topDom,$_self_topDomH);
		}else{

		}
	}
};
























