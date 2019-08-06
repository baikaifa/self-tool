let activeid = getQueryString("id");
$(function(){
    $('.headerBackImg,.headerBack').on('click',function(){
		window.history.go(-1);  //返回上一页  
		// window.location.go(-1); //刷新上一页 
	})
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/getActiveInfo.do",
        data:{
            token : token,
            activeId: activeid
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                var data = data.data;
                $("#empName").html(data.empName);
                $("#name").html(data.name);
                $("#address").html(data.address);
                $("#data_start_hd").html(data.data_start_hd);
                $("#content").html(data.content);
                $("#projectTime").html(data.projectTime);
                $("#data_start_bm").html(data.data_start_bm);
                $("#data_end_bm").html(data.data_end_bm);
                $("#member").html(data.count+' / '+data.max_member);
            }else{
                console.log(data.msg);
            }
        },
        error: function(request) {
            console.log('error')
        }
    })
})

function commit(state){
    console.log(state);
    $.ajax({
        cache: false,
        type: "POST",
        url: API_URL+"/active/examineActive.do",
        data:{
            token : token,
            activeid: activeid,
            state: state
        },
        dataType: 'json',
        // async:false,
        success: function(data) {
            if(data.state == '200'){
                showToast("审核成功");
                setTimeout(function(){
                    window.history.go(-1);
                }, 2000)
            }else{
                console.log(data.msg);
                showToast("审核失败")
            }
        },
        error: function(request) {
            console.log('error');
            showToast("审核失败")
        }
    })
}