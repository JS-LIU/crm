var model = {
    removeModel:{},
    AddchildModel:{},
    resizeModel:{}
};
//	添加模块
model.AddchildModel = function($_parent){
	this.$_parent = $_parent;    
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
	this.sm_width =  parseFloat($_parent.css('width')) / 2,		//	新盒子的宽度
    this.sm_height = parseFloat($_parent.css('height')),		//	新盒子的高度	
    this.sm_top = parseFloat($_parent.css('top'))||0;			//	新盒子的TOP
}

HorizontalAppend.prototype = new model.AddchildModel();
HorizontalAppend.prototype.coustructor = HorizontalAppend;
HorizontalAppend.prototype.appendModel = function(){
	for(var i = 0 ;i < 2 ; i++){
		var $_smallModel = $('.template-box .J-model').clone(true);
	   
	    this.sm_left = (this.$_parentL + i * this.sm_width);	//	新盒子的LEFT	
	    $_smallModel.addClass('small-model po').css({
	        width:this.sm_width + 'px',
	        height:this.sm_height + 'px',
	        top:this.sm_top + 'px',
	        left:this.sm_left + 'px',
	        margin:'0px 0px 0px -1px'
    	}).data('modelStyle',{
        	width:this.sm_width,
        	height:this.sm_height,
        	top:this.sm_top,
        	left:this.sm_left
        }).insertAfter(this.$_parent);
   }
};

//  水平添加小模块
function VerticalAppend($_parent){
	model.AddchildModel.call(this,$_parent);
    this.$_parentT = parseFloat($_parent.css('top'))||0;
	this.sm_width =  parseFloat($_parent.css('width'));			//	新盒子的宽度
    this.sm_height = parseFloat($_parent.css('height')) / 2;	//	新盒子的高度	
    this.sm_left = parseFloat($_parent.css('left'))||0;			//	新盒子的TOP
}

VerticalAppend.prototype = new model.AddchildModel();
VerticalAppend.prototype.coustructor = HorizontalAppend;
VerticalAppend.prototype.appendModel = function(){
	for(var i = 0 ;i < 2 ; i++){
		var $_smallModel = $('.template-box .J-model').clone(true);
	    this.sm_top = (this.$_parentT + i * this.sm_height);	//	新盒子的LEFT	
	    $_smallModel.addClass('small-model po').css({
	        width:this.sm_width + 'px',
	        height:this.sm_height + 'px',
	        top:this.sm_top + 'px',
	        left:this.sm_left + 'px',
	        margin:'0px 0px 0px -1px'
    	}).data('modelStyle',{
        	width:this.sm_width,
        	height:this.sm_height,
        	top:this.sm_top,
        	left:this.sm_left
        }).insertAfter(this.$_parent);
   }
};


model.resizeModel = function(){
    var neighbourObj = model.addchildModel(),
        $_elongate = $('.J-elongate');
};
