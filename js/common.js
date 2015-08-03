$(function(){
    leftNav.addModel();
    //	操作
	var $_addSmallModelTopBtn = $('.J-btn-addsmodel-tb'),
	    $_addSmallModelLeftBtn = $('.J-btn-addsmodel-lr'),
	    modelId = 0;
	$_addSmallModelTopBtn.click(function(){
	    var $_self = $(this).parent();
	    var v = new VerticalAppend($_self);
	    v.appendModel();
	    v.removeParent();
	});
	
	$_addSmallModelLeftBtn.click(function(){
	    var $_self = $(this).parent();
	    var h = new HorizontalAppend($_self);
	    h.appendModel();
	    h.removeParent();
	});
	
	model.resizeModel();
	
	
});
