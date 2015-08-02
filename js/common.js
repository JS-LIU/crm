var mousedrag = jQuery.event.special.mousedrag = {
        
    setup:function(){
        var $_self = $(this),
            moveArr  = [];
        $_self.mousedown(function(e){
            e = e||window.event;
            var x = e.pageX,
                moveArr  = [],
                $_self = $(this);
            moveArr.push(x);
            $_self.mousemove(function(e){
                e = e||window.event;
                var x = e.pageX;
                moveArr.push(x);
                if(moveArr.length > 2){
                    moveArr.shift();
                }
                var dif = moveArr[0]-moveArr[1];
                $(this).trigger('mousedrag',dif);
            });
        }).mouseup(function(e){
            jQuery.event.remove(this,'mousemove');
            moveArr = [];
        });
    },
    tearoff:function(){
        var $_self = $(this);
        jQuery.event.remove($_self, 'mousedrag');
    }
};


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
});
