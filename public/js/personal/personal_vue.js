$(function(){
    new Vue({
        el: '.shop-profile',
        data: {
            userMessage: [],
            shopAll: []
        },
        methods: {
            toSite(){
                let id = sessionStorage.getItem('userID');
                this.$http.get('/site?id=' + id).then((res)=>{
                    window.location.href = '/site';
                });
            }
        },
        mounted(){
            let id = sessionStorage.getItem('userID');
            this.$http.get('/getUserMessage?id=' + id).then((res)=>{
                this.userMessage = res.body;
            });
            this.$http.get('/shopAll?id=' + id).then((res)=>{
                this.shopAll = res.data;
            });
        }
    })
});