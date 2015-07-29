var model = {
    removeModel:{},
    addchildModel:{},
    resizeModel:{}
};

model.addchildModel = function(){
    var $_addSmallModelTopBtn = $('.J-btn-addsmodel-tb'),
        $_addSmallModelLeftBtn = $('.J-btn-addsmodel-lr'),
        modelId = 0;
        
    
    //  垂直添加小模块
    function verticalAppend($_parent){
        var smallModelArr = [],
            $_parentH = parseFloat($_parent.css('height')),
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
        return $(smallModelArr);    
    }
    
    //  水平添加小模块
    function horizontalAppend($_parent){
            $_parentW = parseFloat($_parent.css('width')),
            $_parentH = parseFloat($_parent.css('height')),
            $_parentT = parseFloat($_parent.css('top'))||0,
            $_parentL = parseFloat($_parent.css('left'))||0,
            $_smallW =  $_parentW / 2;
            
        for(var i = 0 ;i < 2 ; i++){
            var $_smallModel = $('.template-box .J-model').clone(true);
            
            $_smallModel.addClass('small-model-h po');
            
            $_smallModel.css({
                width:$_smallW + 'px',
                height:$_parentH + 'px',
                margin:'0px 0px 0px -1px',
                top:$_parentT + 'px',
                left:($_parentL+i*$_smallW)+'px'
            });
            
            addmodelId($_smallModel,$_parent,i);
            $_smallModel.insertAfter($_parent);
        }
        $_parent.remove();
        
        $_parent.children('.J-btn-addsmodel-tb').hide();
        $_parent.children('.J-btn-addsmodel-lr').hide();
        
    }
    
    //  为每个小模块编号
    function addmodelId($_self,$_parent,i){
        modelId++;
        $_self.attr('modelId',modelId);
        if(i == 0){
	        $_self.attr('nei',modelId+1);
	        console.log($_self.attr('nei'));
        }else{
        	$_self.attr('nei',$_parent.attr('nei')||0);
        }
    };  

    var storageNeighbourArr = [],                   //  用来存储左右相邻的小模块的数组
        storageUpdownArr = [];                      //  用来存储上下相邻的小模块的数组
    
    
    $_addSmallModelTopBtn.click(function(){
        var $_self = $(this).parent(),
            smallModel = verticalAppend($_self);
        storageUpdownArr.push(smallModel);
    });
    
    

    $_addSmallModelLeftBtn.click(function(){
        var $_self = $(this).parent(),
            smallModel = horizontalAppend($_self);  //  创建小模板

        storageNeighbourArr.push(smallModel);
    });
    
    return {hArr:storageNeighbourArr,vArr:storageUpdownArr};    
};

model.resizeModel = function(){
    var neighbourObj = model.addchildModel(),
        $_elongate = $('.J-elongate'),
        hDoms = neighbourObj.hArr;
    
    // function hneibi(self){
        // var $_self = self;
        // for(var i = 0 ,len = hDoms.length; i < len; i++){
            // //  转换dom比较 否则context不同
            // if(hDoms[i][0][0] == $_self[0]){
                // return i;
            // }
        // }
    // };
//     
    // $_elongate.mousedown(function(){
        // var $_self = $(this).parent();
        // var z = hneibi($_self);
        // console.log(z);
//         
    // });
//     
    
    
    /*$_elongate.bind('mousedrag',function(e,dif){   
        
        //  判断当前dom的邻居是谁
        var $_self = $(this).parent();
        var hDoms = neighbourObj.hArr;
        var dif = dif;
        for(var i = 0 ,len = hDoms.length; i < len; i++){
            //  转换dom比较 否则context不同
            if(hDoms[i][0][0] == $_self[0]){
                //  移动
                $_self.css('width','+=' + dif + 'px');
                hDoms[i][0].css('width','-='+dif+'px');
                console.log(1);
                break;
            }
        }
    });*/
   
   
   
   
   
};



