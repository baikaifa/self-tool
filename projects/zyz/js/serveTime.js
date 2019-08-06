let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let _month = month, _year = year;

$(function(){
    $('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页  
//		window.location.go(-1); //刷新上一页 
	})
    getMonthTime(month);
    getYearTime(year);
    getTotalTime();
})

//回到本月
function toMonth(){
    getMonthTime(month);
    _month = month;
}
//上月
function lastMonth(){
    if(_month == 1){return}
    _month--;
    getMonthTime(_month);
}
//下月
function nextMonth(){
    if(_month == month){return}
    _month++;
    getMonthTime(_month);
}

//回到本年
function toYear(){
    getYearTime(year);
    _year = year;
}
//上一年
function lastYear(){
    _year--;
    getYearTime(_year);
}
//下一年
function nextYear(){
    if(_year == year){return};
    _year++;
    getYearTime(_year);
}

function getMonthTime(num){
    $.ajax({  // 请求菜单
        cache: false,
        type: "POST",
        url: API_URL+"/active/monCount.do",
        data:{
            token: token,
            mon: num
        },
		dataType: 'json',
		// async:false,
        success: function(data) {
        	if(data.state == '200'){
                var data = data.data?data.data:"0";
                $("#monthTime").html(data);
                $("#month").html(setNum(num));
			}else{
                console.log(data.msg)
			}
        },
		error: function(request) {
			console.log('error');
        }
	}); 
}
function getYearTime(num){
    $.ajax({  // 请求菜单
        cache: false,
        type: "POST",
        url: API_URL+"/active/yearCount.do",
        data:{
            token: token,
            year: num
        },
		dataType: 'json',
		// async:false,
        success: function(data) {
        	if(data.state == '200'){
                var data = data.data?data.data:"0";
                $("#yearTime").html(data);
                $("#year").html(setNum(num));
			}else{
                console.log(data.msg)
			}
        },
		error: function(request) {
			console.log('error');
        }
	});
}
function getTotalTime(){
    $.ajax({  // 请求菜单
        cache: false,
        type: "POST",
        url: API_URL+"/active/allCount.do",
        data:{
            token: token
        },
		dataType: 'json',
		// async:false,
        success: function(data) {
        	if(data.state == '200'){
                var data = data.data;
                data = data.split(',');
                $(".total").html(data[0].slice(0, data[0].indexOf("月")+1)+'-至今');
                $("#totalTime").html(data[1]?data[1]:'0');
			}else{
                console.log(data.msg)
			}
        },
		error: function(request) {
			console.log('error');
        }
	});
}