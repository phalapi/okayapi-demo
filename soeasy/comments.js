// 分页参考自：https://www.cnblogs.com/cqsjs/p/5772834.html?utm_source=itdadao&utm_medium=referral
Vue.component("page",{
      template:"#page",
        data:function(){

            let total = 0
            let _self = this
            let params = { 
                s: 'App.Main_Set.Count', 
                key: 'demo_comments'
            }

            $.ajax({
                url: '/okayapi.php',
                async: false,
                dataType: 'json',
                data: params
            }).done(function (rs) {
                if (rs.data && rs.data.err_code == 0) {
                    total = rs.data.total
                } else {
                    // console.log(rs.data.err_msg)
                }
            });


          return{
            current: 1,
            showItem: 10,
            allpage: Math.floor(total / 10) + 1
          }
        },
        computed:{
          pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
      },
      methods:{
        goto:function(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求

            appComments.loadComments(null, index)
        }
      }
    })

var appComments = new Vue({
    el: '#appComments',
    data: {
        comment_list: [],
        new_comment_username: '',
        new_comment_content: '',
        tips: ''
    },

    methods: {
        init: function() {

            this.loadComments(null)
        },
        loadComments: function (event, page) {
            let _self = this
            let params = { 
                s: 'App.Main_Set.GetList', 
                key: 'demo_comments', 
                page: page || 1, 
                perpage: 10,
                sort: '2'
            }

            $.ajax({
                url: '/okayapi.php',
                dataType: 'json',
                data: params
            }).done(function (rs) {
                if (rs.data && rs.data.err_code == 0) {
                    _self.comment_list = rs.data.items
                } else {
                    console.log(rs.data.err_msg)
                }
            });
        },

        addComment: function (event) {
            if (this.new_comment_username.length == 0) {
                this.tips = '亲，留言昵称不能为空~';
                return false;
            }
            if (this.new_comment_content.length == 0) {
                this.tips = '亲，留言内容不能为空~';
                return false;
            }

            let _self = this
                let setData = {
                    comment_username: _self.new_comment_username,
                    comment_content: _self.new_comment_content
                }
            let params = { 
                s: 'App.Main_Set.Add', 
                key: 'demo_comments', 
                data: JSON.stringify(setData)
            }

            $.ajax({
                url: '/okayapi.php',
                dataType: 'json',
                data: params,
            }).done(function (rs) {
                if (rs.data && rs.data.err_code == 0) {
                    _self.tips = '留言成功！';

                    // 重置内容
                    _self.new_comment_content = ''

                        _self.loadComments(null)
                } else {
                    console.log(rs.data.err_msg)       
                }
            });
        }
    }
})

appComments.init();

