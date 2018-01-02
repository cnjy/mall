$(function () {
    new Vue({
        el:".join-list-body",
        data:function(){
            return{
                join:[]
            }
        },
        methods:{
            loads:function(){
                var i=0;
                for(let item of $(".join-list-body-one")){
                    $(item).attr("num",i)
                    i++;
                }
            },
            dianji:function(e){
                var id=$(e.currentTarget).attr("num");
                $(".join-hide").eq(id).slideToggle();
                $(".join-php").eq(id).find("i").toggle();
            },
            shenqing:function(){
                $(".join-box-up").toggle();
                $("body").css("overflow-y","hidden");
            }
        }
    })
});