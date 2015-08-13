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
		bottom:(this.sm_height + this.sm_top),
		right:(this.sm_left + this.sm_width)
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
			$_small_model = $_self.parent(),

			$_neaestDom = findNeaest($_small_model),			//	找到相邻的的等高盒子
			selfT = parseFloat($_small_model.attr('top')),
			selfL = parseFloat($_small_model.attr('left')),
			neiT = parseFloat($_neaestDom.attr('top')),
			neiL = parseFloat($_neaestDom.attr('left')),
			selfB =  parseFloat($_small_model.attr('bottom')),
			neiB =  parseFloat($_neaestDom.attr('bottom'));
		findResizeDomUp($_neaestDom,$_small_model,selfT,neiT);
		findResizeDomDown($_neaestDom,$_small_model,selfB,neiB);

		var $_selfHereDom = $('.needResize[left='+ selfL +']');	//	左边所有需要变化的dom
		var $_neiHereDom = $('.needResize[left='+ neiL +']');	//	右边所有需要变化的dom
		function move(e){
			e = e||window.event;
			x = x1 || x,
				x1 = e.pageX;
			var addW = x - x1;
			if(addW < 0){
				//	addW 为负值 所以要【-=】负负得正
				$_small_model.css('width','-=' + addW);
				//	相邻的的等高盒子 一起变化
				$_selfHereDom.css('width','-=' + addW);

				$_neiHereDom.css('width','+=' + addW);
				$_neiHereDom.css('left','-=' + addW);
			}
		}
		$_self.bind('mousemove',move).mouseup(function(){
			var self_newW = parseFloat($_small_model.css('width'));
			$_small_model.attr('width',self_newW);
			for(var i = 0,len = $('.needResize').length;i < len;i++){
				var other_newW = parseFloat($('.needResize').eq(i).css('width'));
				var other_left = parseFloat($('.needResize').eq(i).css('left'));
				var other_right = other_newW + other_left;
				$('.needResize').eq(i).attr({'width':other_newW,'left':other_left,'right':other_right});
			}
			$('.needResize').removeClass('needResize');
			$_self.unbind('mousemove',move);
		});
	});

	$_heighten.mousedown(function(e){
		e = e||window.event;
		var y = e.pageY,
			y1,
			$_self = $(this),
			$_small_model = $_self.parent(),
			$_neaestDom = findResizeOther($_small_model),			//	找到相邻的的等高盒子
			selfR = parseFloat($_small_model.attr('right')),
			selfL = parseFloat($_small_model.attr('left')),
			neiR = parseFloat($_neaestDom.attr('right')),
			neiL = parseFloat($_neaestDom.attr('left')),
			selfT =  parseFloat($_small_model.attr('top')),
			neiT =  parseFloat($_neaestDom.attr('top'));

		findResizeDomLeft($_neaestDom,$_small_model,selfL,neiL);
		findResizeDomRight($_neaestDom,$_small_model,selfR,neiR);

		var $_selfHereDom = $('.needResize[top='+ selfT +']');	//	上边所有需要变化的dom
		var $_neiHereDom = $('.needResize[top='+ neiT +']');	//	右边所有需要变化的dom
		console.log($_neiHereDom);
		function move(e){
			e = e||window.event;
			y = y1 || y,
				y1 = e.pageY;
			var addH = y - y1;
			if(addH < 0){
				$_small_model.css('height','-=' + addH);
				//	相邻的的等高盒子 一起变化
				$_selfHereDom.css('height','-=' + addH);

				$_neiHereDom.css('height','+=' + addH);
				$_neiHereDom.css('top','-=' + addH);
			}
		}
		$_self.bind('mousemove',move).mouseup(function(){

			for(var i = 0,len = $('.needResize').length;i < len;i++){
				var other_newH = parseFloat($('.needResize').eq(i).css('top'));
				var other_Top = parseFloat($('.needResize').eq(i).css('height'));
				var other_Bottom = other_newH + other_Top;
				$('.needResize').eq(i).attr({'top':other_Top,'height':other_newH,'bottom':other_Bottom});
			}
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
			$_nearestDom = $('.J-model[left="' + neiLeft + '"][bottom = "' + btm +'"]');
		}
		$_nearestDom.addClass('needResize');
		return $_nearestDom;
	}

	function findResizeOther($_self){
		var otherTop = parseFloat($_self.attr('bottom'))		//	邻居的top属性的值
		var $_otherDom = $('.J-model[top=' + otherTop + ']');		//	相邻的所有
		var selfL = parseFloat($_self.attr('left'));
		var leftArr = [];

		//	先找到左边差小的
		for(var i = 0 ; i <　$_otherDom.length;i++){
			var $_otherDomL = parseFloat($_otherDom.eq(i).attr('left'));
			var abs_dif = Math.abs($_otherDomL - selfL);
			leftArr.push(abs_dif);
		}
		var difMin = Math.min.apply(Object,leftArr);
		var index = leftArr.indexOf(difMin);
		var $_nearestDom = $_otherDom.eq(index);												//	离被移动的节点最近的节点
		if( $_nearestDom.attr('left') == $_self.attr('right')){
			var right = parseFloat($_nearestDom.attr('left'));
			$_nearestDom = $('.J-model[top="' + otherTop + '"][right = "' + right +'"]');
		}
		$_nearestDom.addClass('needResize');
		return $_nearestDom;
	}
	//	找到所有需要被移动的节点(向上)
	function findResizeDomUp($_nearestDom,$_self,selfT,neiT){
		var selfL = parseFloat($_self.attr('left'));
		//	判断 哪个盒子在上面
		if(selfT > neiT){				//	被扩展的盒子在下面
			var $_self_topDom = $('.J-model[left="' + selfL + '"][bottom="'+ selfT +'"]');
			$_self_topDom.addClass('needResize');
			selfT = parseFloat($_self_topDom.attr('top'));
			return findResizeDomUp($_nearestDom,$_self_topDom,selfT,neiT);
		}else if(selfT < neiT){
			var $_nearestDom_top = parseFloat($_nearestDom.attr('top'));
			var $_nearestDom_left =  parseFloat($_nearestDom.attr('left'));
			var $_nei_topDom = $('.J-model[left="' + $_nearestDom_left + '"][bottom="'+ $_nearestDom_top +'"]');
			$_nei_topDom.addClass('needResize');
			neiT = $_nei_topDom.attr('top');
			return findResizeDomUp($_nei_topDom,$_self,selfT,neiT);
		}
	}
	//	找到所有需要被移动的节点(向下)
	function findResizeDomDown($_nearestDom,$_self,selfB,neiB){
		var selfL = parseFloat($_self.attr('left'));
		//	判断 哪个盒子在上面
		if(selfB < neiB){				//	被扩展的盒子在上面
			var $_self_bottomDom = $('.J-model[left="' + selfL + '"][top ="'+ selfB +'"]');
			$_self_bottomDom.addClass('needResize');
			selfB = parseFloat($_self_bottomDom.attr('bottom'));
			return findResizeDomDown($_nearestDom,$_self_bottomDom,selfB,neiB);
		}else if(selfB > neiB){
			var $_nearestDom_bottom = parseFloat($_nearestDom.attr('bottom'));
			var $_nearestDom_left =  parseFloat($_nearestDom.attr('left'));
			var $_nei_bottomDom = $('.J-model[left="' + $_nearestDom_left + '"][top="'+ $_nearestDom_bottom +'"]');
			$_nei_bottomDom.addClass('needResize');
			neiB = parseFloat($_nei_bottomDom.attr('bottom'));
			return findResizeDomDown($_nei_bottomDom,$_self,selfB,neiB);
		}
	}
	//	找到所需要移动的节点(向左)
	function findResizeDomLeft($_nearestDom,$_self,selfL,neiL){
		var selfT = parseFloat($_self.attr('top'));
		//	判断 哪个盒子在上面
		if(selfL > neiL){				//	被扩展的盒子在右面
			var $_self_leftDom = $('.J-model[top="' + selfT + '"][right="'+ selfL +'"]');
			$_self_leftDom.addClass('needResize');
			selfL = parseFloat($_self_leftDom.attr('left'));
			return findResizeDomLeft($_nearestDom,$_self_leftDom,selfL,neiL);
		}else if(selfL < neiL){
			var $_nearestDom_top = parseFloat($_nearestDom.attr('top'));
			var $_nearestDom_left =  parseFloat($_nearestDom.attr('left'));
			var $_nei_leftDom = $('.J-model[top="' + $_nearestDom_top + '"][right="'+ $_nearestDom_left +'"]');
			$_nei_leftDom.addClass('needResize');
			neiL = $_nei_leftDom.attr('left');
			return findResizeDomLeft($_nei_leftDom,$_self,selfL,neiL);
		}
	}
	//	找到所有需要被移动的节点(向右)
	function findResizeDomRight($_nearestDom,$_self,selfR,neiR){
		var selfT = parseFloat($_self.attr('top'));
		//	判断 哪个盒子在上面
		if(selfR < neiR){				//	被扩展的盒子在左面
			var $_self_rightDom = $('.J-model[top="' + selfT + '"][left ="'+ selfR +'"]');
			$_self_rightDom.addClass('needResize');
			console.log($_self_rightDom);
			selfR = parseFloat($_self_rightDom.attr('right'));
			return findResizeDomRight($_nearestDom,$_self_rightDom,selfR,neiR);
		}else if(selfR > neiR){
			var $_nearestDom_right = parseFloat($_nearestDom.attr('right'));
			var $_nearestDom_top =  parseFloat($_nearestDom.attr('top'));
			var $_nei_rightDom = $('.J-model[top="' + $_nearestDom_top + '"][left="'+ $_nearestDom_right +'"]');
			$_nei_rightDom.addClass('needResize');
			neiR = parseFloat($_nei_rightDom.attr('bottom'));
			return findResizeDomRight($_nei_rightDom,$_self,selfR,neiR);
		}
	}
};