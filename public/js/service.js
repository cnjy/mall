$(function(){
    let service=Vue.component("service",{
        template:"#service"
    });
    let buy=Vue.component("buy",{
        template:"#buy"
    });
    let hots=Vue.component("hots",{
        template:"#hots"
    });
    let yuyue=Vue.component("yuyue",{
        template:"#yuyue"
    });
    let shouhou=Vue.component("shouhou",{
        template:"#shouhou"
    });

    let routes=[
        {
            path:"/",
            redirect:"/service"
        },
        {
            path:"/service",
            component:service
        }, {
            path:"/buy",
            component:buy
        }, {
            path:"/hots",
            component:hots
        }, {
            path:"/yuyue",
            component:yuyue
        }, {
            path:"/shouhou",
            component:shouhou
        }
    ];

    let router=new VueRouter({
        routes,
        linkActiveClass: "actives"
    });

    new Vue({
        el:"#service-link",
        router
    });
});