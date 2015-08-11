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
	var $_elongate = $('.J-elongate'),
		$_heighten = $('.J-heighten	');

	$_elongate.mousedown(function(e){

   		e = e||window.event;
   		var x = e.pageX,
			x1,
   			$_self = $(this),
   			$_small_model = $_self.parent();
   		//	找到相邻的的等高盒子
		var $_neaestDom = findNeaest($_small_model),
			selfT = parseFloat($_small_model.attr('top')),
			selfL = parseFloat($_small_model.attr('left')),
			neiT = parseFloat($_neaestDom.attr('top')),
			neiL = parseFloat($_neaestDom.attr('left')),
			selfB =  parseFloat($_small_model.attr('bottom')),
			neiB =  parseFloat($_neaestDom.attr('bottom'));
		console.log($_neaestDom);
		findResizeDomUp($_neaestDom,$_small_model,selfT,neiT);
		findResizeDomDown($_neaestDom,$_small_model,selfB,neiB);

		var $_selfHereDom = $('.needResize[left='+ selfL +']');
		var $_neiHereDom = $('.needResize[left='+ neiL +']');
   		function move(e){
			e = e||window.event;
			x = x1 || x,
			x1 = e.pageX;
			var addW = x - x1;
			if(addW < 0){
				//	addW 为负值 所以要【-=】负负得正
				$_small_model.css('width','-='+addW);
				//	相邻的的等高盒子 一起变化
				$_selfHereDom.css('width','-='+addW);

				$_neiHereDom.css('width','+='+addW);
				$_neiHereDom.css('left','-='+addW);


			}
		}
		$_self.bind('mousemove',move).mouseup(function(){
			var self_newW = parseFloat($_small_model.css('width'));
			$_small_model.attr('width',self_newW);
			for(var i = 0,len = $('.needResize').length;i < len;i++){
				var other_newW = parseFloat($('.needResize').eq(i).css('width'));
				var other_left = parseFloat($('.needResize').eq(i).css('left'));
				$('.needResize').eq(i).attr({'width':other_newW,'left':other_left});
			}

			//$('.needResize').removeClass('needResize');

			$_self.unbind('mousemove',move);
		});
    });

	$_heighten.mousedown(function(e){
		e = e||window.event;
		var y = e.pageY,
			y1,
			$_self = $(this),
			$_small_model = $_self.parent();
		function move(e){
			e = e||window.event;
			y = y1 || y,
			y1 = e.pageY;
			var addH = y - y1;
			if(addH < 0){
				$_small_model.css('height','-='+addH);
			}
		}
		$_self.bind('mousemove',move).mouseup(function(){
			$('.needResize').removeClass('needResize');
			$_self.unbind('mousemove',move);
		});
	})

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
		if($_nearestDom.attr('top') == $_self.attr('bottom')){
			var btm = parseFloat($_nearestDom.attr('top'));
			$_nearestDom = $('.J-model[left=' + neiLeft + '][bottom = ' + btm +']');
		}
		$_nearestDom.addClass('needResize');
		return $_nearestDom;
	}

	//	找到所有需要被移动的节点
	function findResizeDomUp($_nearestDom,$_self,selfT,neiT){
		neiT = parseFloat($_nearestDom.attr('top'));
		var selfL = parseFloat($_self.attr('left'));
		//	判断 哪个盒子在上面
		if(selfT > neiT){				//	被扩展的盒子在下面
			var $_self_topDom = $('.J-model[left=' + selfL + '][bottom='+ selfT +']');
			$_self_topDom.addClass('needResize');
			selfT = parseFloat($_self_topDom.attr('top'));
			return findResizeDomUp($_nearestDom,$_self_topDom,selfT,neiT);
		}else if(selfT < neiT){
			var $_nearestDom_top = parseFloat($_nearestDom.attr('top'));
			var $_nearestDom_left =  parseFloat($_nearestDom.attr('left'));
			var $_nei_topDom = $('.J-model[left=' + $_nearestDom_left + '][bottom='+ $_nearestDom_top +']');
			$_nei_topDom.addClass('needResize');
			neiT = $_nei_topDom.attr('top');
			return findResizeDomUp($_nei_topDom,$_self,selfT,neiT);
		}
	}
	//	找到所有需要被移动的节点
	function findResizeDomDown($_nearestDom,$_self,selfB,neiB){
		neiB = parseFloat($_nearestDom.attr('bottom'));
		var selfL = parseFloat($_self.attr('left'));
		//	判断 哪个盒子在上面
		if(selfB < neiB){				//	被扩展的盒子在上面
			var $_self_bottomDom = $('.J-model[left=' + selfL + '][top ='+ selfB +']');
			$_self_bottomDom.addClass('needResize');
			selfB = parseFloat($_self_bottomDom.attr('bottom'));
			return findResizeDomDown($_nearestDom,$_self_bottomDom,selfB,neiB);
		}else if(selfB > neiB){
			var $_nearestDom_bottom = parseFloat($_nearestDom.attr('bottom'));
			var $_nearestDom_left =  parseFloat($_nearestDom.attr('left'));
			var $_nei_bottomDom = $('.J-model[left=' + $_nearestDom_left + '][top='+ $_nearestDom_bottom +']');
			$_nei_bottomDom.addClass('needResize');
			neiB = parseFloat($_nei_bottomDom.attr('bottom'));
			return findResizeDomDown($_nei_bottomDom,$_self,selfB,neiB);
		}
	}
};
























