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
        loadComments: function (event) {
            let _self = this
                let params = { 
                    s: 'App.Main_Set.GetList', 
                    key: 'demo_comments', 
                    page: 1, 
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

