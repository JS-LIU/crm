var model = {
	removeModel:{},
	addchildModel:{},
	resizeModel:{}
};

model.addchildModel = function(){
	var smallModelArr = [],
		$_addSmallModelTopBtn = $('.J-btn-addsmodel-tb'),
		$_addSmallModelLeftBtn = $('.J-btn-addsmodel-lr'),
		modelIdArr = [];
	
	//	垂直添加小模块
	function verticalAppend($_parent){
		var $_parentH = parseFloat($_parent.css('height')),
			$_smallH = $_parentH / 2,
			$_smallW = parseFloat($_parent.css('width'));
			
		for(var i = 0 ;i < 2 ; i++){
			var $_smallModel = $('.template-box .J-model').clone(true);
			$_smallModel.addClass('small-model-v w');
			
			$_smallModel.css({
				height:$_smallH + 'px',
				width:$_smallW + 'px',
				margin:'-1px 0px 0px 0px'
			});
			smallModelArr.push($_smallModel);
			addmodelId($_smallModel);
			$_smallModel.appendTo($_parent);
		}
		
		$_parent.children('.J-btn-addsmodel-tb').hide();
		$_parent.children('.J-btn-addsmodel-lr').hide();
		return smallModelArr;	
	}
	
	//	水平添加小模块
	function horizontalAppend($_parent){
		var smallModelArr = [],
			$_parentW = parseFloat($_parent.css('width')),
			$_parentH = parseFloat($_parent.css('height')),
			$_smallW = 	$_parentW / 2;
			
		$_parent.addClass('clearfix');
		
		for(var i = 0 ;i < 2 ; i++){
			var $_smallModel = $('.template-box .J-model').clone(true);
			
			$_smallModel.addClass('small-model-h h fl');
			
			$_smallModel.css({
				width:$_smallW + 'px',
				height:$_parentH + 'px',
				margin:'0px 0px 0px -1px'
			});
			smallModelArr.push($_smallModel);
			
			
			addmodelId($_smallModel);
			$_smallModel.appendTo($_parent);
		}
		
		$_parent.children('.J-btn-addsmodel-tb').hide();
		$_parent.children('.J-btn-addsmodel-lr').hide();
		return smallModelArr;	
	}
	
	//	为每个小模块编号
	function addmodelId($_self){
		var modellen = modelIdArr.length;
		modelIdArr.push(modellen);
		$_self.attr('modelId',modellen);
	};	
	
	//	添加最大邻居
	function addNeighbour(){
		
	};
	
	$_addSmallModelTopBtn.click(function(){
		var $_self = $(this).parent();
		verticalAppend($_self);
		
	});
	
	
	$_addSmallModelLeftBtn.click(function(){
		var $_self = $(this).parent();
		
		var smallModel = horizontalAppend($_self);
		smallModel.map(addNeighbour);
	});
	
};
model.resizeModel = function(){
	var  $_elongate	 = $('.J-elongate');
	
	$_elongate.click(function(){
		
	
	});


};



