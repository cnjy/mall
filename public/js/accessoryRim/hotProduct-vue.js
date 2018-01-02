$(function(){
    var All = Vue.component("All", {
        template: "#hotProductAll",
        created (){
            this.$http.get("/ksy/getHotall").then(function(res){
            this.hotDetail=res.body.hotproduct;
          })
        },
        data:function(){
            return {
                isMore:true,
                hotDetail:[]
            }
        },
        methods:{
            newId:function(index){    
                if(index == 0){
                    let i=0;
                    for(let item of $('.hotProduct-one')){
                        $(item).attr('newid', i);
                        i ++;
                    }
                }
               
            }
        }
   
    });

    var jianguo = Vue.component("jianguo", {
        template: "#hotProductAll",
        created (){
            this.$http.get("/ksy/getjianguo").then(function(res){
            this.hotDetail=res.body.hotproduct;
          })
        },
        data:function(){
            return {
                isMore:false,
                hotDetail:[]
            }
        },
        methods:{
            newId:function(index){    
                if(index == 0){
                    let i=3;
                    for(let item of $('.hotProduct-one')){
                        $(item).attr('newid', i);
                        i ++;
                    }
                }
               
            }
        }
   
    });
    
    var T2 = Vue.component("T2", {
        template: "#hotProductAll",
        created(){
            this.$http.get("/ksy/getT2").then(function(res){
                this.hotDetail=res.body.hotproduct;
            })
        },
        data:function(){
            return {
                isMore:false,
                hotDetail:[]
            }
        },
        methods:{
            newId:function(index){    
                if(index == 0){
                    let i=2;
                    for(let item of $('.hotProduct-one')){
                        $(item).attr('newid', i);
                        i ++;
                    }
                }
               
            }
        }
   
    });

    var M1 = Vue.component("M1", {
        template: "#hotProductAll",
        created(){
            this.$http.get("/ksy/getM1").then(function(res){
                this.hotDetail=res.body.hotproduct;
            })
        },
        data:function(){
            return {
                isMore:false,

                hotDetail:[]
            }
        },
        methods:{
            newId:function(index){    
                if(index == 0){
                    let i=1;
                    for(let item of $('.hotProduct-one')){
                        $(item).attr('newid', i);
                        i ++;
                    }
                }
               
            }
        }
   
    });

    var Pro = Vue.component("Pro", {
        template: "#hotProductAll",
        created(){
            this.$http.get("/ksy/getPro").then(function(res){
                this.hotDetail=res.body.hotproduct;
            })
        },
        data:function(){
            return {
                isMore:false,
                
                hotDetail:[]
            }
        },
        methods:{
            newId:function(index){    
                if(index == 0){
                    let i=4;
                    for(let item of $('.hotProduct-one')){
                        $(item).attr('newid', i);
                        i ++;
                    }
                }
               
            }
        }
    });

    var routes = [
    {
        path: '/',
        redirect: '/hotAll'
    },
    {
        //name代表组件的名称
        path: "/hotAll",
        component: All
       
    },{
        path: "/jianguo",
        component: jianguo
    },{
        path:"/T2",
        component:T2
    },{
        path:"/M1",
        component:M1
    },{
        path:"/Pro",
        component:Pro
    }];

    var router = new VueRouter({
        routes
    });


    new Vue({
        el: ".box",
        router: router
    })

});
