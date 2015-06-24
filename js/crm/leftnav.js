//  左侧导航功能
var leftNav = {
    addModel:{}             //  添加模块
};

leftNav.addModel = function(){
    var $_J_add_model = $('.J-add-model');
        
    
    //  点击添加模块按钮
    $_J_add_model.click(function(){
        //  向页面里添加一个大模块
        addModel();
    });
    
    function addModel(){
        var $_model = $('.template-box .J-model').clone(true),
            $_J_model_h = parseInt($('.J-model-h input').val()) || 100;
        
        //  模块的高度
        $_model.css('height',$_J_model_h + 'px');
        
        //  插入模块
        $_model.appendTo($('.main'));
    };
};


