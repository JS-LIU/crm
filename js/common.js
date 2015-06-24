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
    //model.addchildModel();
    model.resizeModel();
});
