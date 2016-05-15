$(document).ready(function(){

	//ajax 交互假数据
		
		/*$.ajax( 
			type: "POST",
            url: "test.json",
            data: {"type":type},
            dataType: "json",
            success: function(data){
				if(data && data.status == 200){
					// 数据
				} 
        });*/
	
		var str1 = [], str2 = [];
		// 假数据格式
		var data = [
				{"id":1,"name":"过去7天访问的用户","type":0,"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"123619334","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}

				   },
				{"id":2,"name":"活跃的用户","type":0,"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"19321334","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}
				},

				{"id":3,"name":"流失的用户","type":0,"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"193355634","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}
					},

				{"id":4,"name":"非活跃的用户","type":0,"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"1429334","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}
				 },

				{"id":5,"name":"232过去7天访问的用户","type":1,"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"1329334","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}
				 },

				{"id":6,"name":"2323活跃的用户","type":1,
				"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"19311234","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}
				 },
				{"id":7,"name":"2323流失的用户","type":1,"info":"test1etest", 
				"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"19334","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
				 "source":{"tablelist":[
				 	{"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
				 	{"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }

				 	]}
		}];

		for(var p = 0; p < data.length; p++ ){
			if(data[p].type == 0){
				str1.push('<li data=\''+JSON.stringify(data[p])+'\'><i class="glyphicon glyphicon-ok"></i>'+data[p].name+'<i class="glyphicon glyphicon-menu-right"></i></li>');
		
			} else {
				str2.push('<li data=\''+JSON.stringify(data[p])+'\'><i class="glyphicon glyphicon-ok"></i>'+data[p].name+'<i class="glyphicon glyphicon-menu-right"></i></li>');
		
			}
		}
		$('.taskcon ul.taskcon_tab1').html(str1.join(""));
		$('.taskcon ul.taskcon_tab2').html(str2.join(""));
		

	//左侧的高度
	$(window).scroll(function(){
		$(".subnav").css('height',$(document).height()+'px');
	});

	window.componentGroup = new componentGroup({"obj":$('.box'),"data":{}});

	//折叠的效果
	$("body").on('click','.collbox .title',function(event){
		var $this = $(this);
		var $collbox = $this.closest('.collbox');
		var $itag = $this.find('i.glyphicon').toggleClass('glyphicon-chevron-down');
		$collbox.find('.content').toggle();
		$
	});
	
	//单次 例行 点击事件
	$("body").on('click','.task a',function(event){
		var $this = $(this);
		var tab = $this.attr('data-tab');
		$this.siblings('a').removeClass('mybtn-default');
		$this.addClass('mybtn-default');
		var $taskcon = $('.taskcon');
		$taskcon.find('ul').hide().siblings('ul.taskcon_'+tab).show();
	});


	//绑定事件
	$("body").on('click','.taskcon li',function(event){
		var $this = $(this);
		var data = $this.attr('data');
		$this.siblings('li').removeClass('current');;
		$this.addClass('current');
		window.componentGroup.setData(JSON.parse(data));
	});

	$('[data-toggle="tooltip"]').tooltip({html : true});
	//用户分组的点击事件
	$('body').on('click','.addUserGroup',function(){
		window.componentGroup.add();
		$('.taskcon li').removeClass('current');

	});

	window.template = new Template({"obj":$('#mytempplate'),data:[]});
	//点击添加模板弹窗事
	$("body").on('click','.addTemplate',function(event){
		window.template.init()
	});

	//modal 居中

	$('.modal').on('show.bs.modal', centerModals);
	$(window).on('resize', centerModals);


	//推送状态
	$("body").on('change','select[name="push_state_select"]',function(){

			var val = $(this).val();console.log(val);
			if(val == 2){
				$(this).closest('.push_state').find('span.push_state_nubtag').show();
			} else {
				$(this).closest('.push_state').find('span.push_state_nubtag').hide();
			}
	});

});

/* center modal */
function centerModals(){
    $('.modal').each(function(i){
        var $clone = $(this).clone().css('display', 'block').appendTo('body');    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}


