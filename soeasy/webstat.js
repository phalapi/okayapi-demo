
var webVisitStat = new Vue({
    el: '#webVisitStat',
    data: {
        day_visit_times: 0,
        month_visit_times: 0,
        all_visit_times: 0
    },

    methods: {
        init: function() {
            let _self = this

            // 日访问次数
            this.update('day', 'demo_day_visit_times', 1, function (afterValue) {
                _self.day_visit_times = afterValue
            })

            // 月访问次数
            this.update('month', 'demo_month_visit_times', 1, function (afterValue) {
                _self.month_visit_times = afterValue
            })

            // 总访问次数
            this.update('forever', 'demo_all_visit_times', 1, function (afterValue) {
                _self.all_visit_times = afterValue
            })
        },

        update: function(type, name, value, afterCallback) {
            let _self = this
            let params = { 
                s: 'App.Main_Counter.Update', 
                type: type, 
                name: name
            }

            $.ajax({
                url: '/okayapi.php',
                dataType: 'json',
                data: params
            }).done(function (rs) {
                if (rs.data && rs.data.err_code == 0) {
                    afterCallback(rs.data.after_value)
                } else if (rs.data.err_code == 1) {
                    // 未存在，则初始化
                    let params = { 
                        s: 'App.Main_Counter.Setup', 
                        type: type, 
                        name: name,
                        value: 1
                    }

                    $.ajax({
                        url: '/okayapi.php',
                        dataType: 'json',
                        data: params
                    }).done(function (rs) {
                        //console.log(rs)
                    });

                    afterCallback(1)
                } else {
                    //console.log(rs.data.err_msg)
                }
            });
        },
    }
})

webVisitStat.init()

