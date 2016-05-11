/**
date:2016-5-7
author:limanclear@163.com
json数据格式

{"id":1,"name":"过去7天访问的用户","type":0,"info":"test1etest", 
"search":{"sql":"select * from table1 where 1=1", "nub":5,"result":{"tablelist":[{"uid":"19334","cellphone":"23232","key0":"23","ctime":"1990.03.02 12:00:00"},{"uid":"1933423","cellphone":"232131111132","key0":"tests","ctime":"1989.03.02 02:23:00"}] }}, 
"source":{"tablelist":[
 {"name":"user_event_music","desc":"用户行为表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid","info":"用户id","type":"init"}] },
 {"name":"user_event_info","desc":"用户信息表","list":[{"key":"ctime","info":"时间","type":"datetime"},{"key":"uid2323","info":"用户id23232","type":"initwe"}] }
 ]}
 },

 * 返回类型和相应参数（json格式）
 * new componentGroup({
 *  obj:xxx, 对象class
 *  data:{}, 数据源

 * });
 *  
 * */
var componentGroup = function (option){
	this.data = option.data;
	this.obj  = option.obj
	this.keyid = option.data && option.data.id ? option.data.id : -1; //默认 -1
	this.init();

};

componentGroup.prototype = {
	//初始化
	init: function(){
		var _this = this;
		_this.add();
		_this.bindEvent();

	},

	getData: function(){
		var _this = this;
		var data = {};
		//用户组
		data.name = _this.obj.find('input[name="groupname"]').val();
		data.info = _this.obj.find('input[name="groupinfo"]').val();
		data.type = _this.obj.find('input[name="task"]:checked').val();

		data.search = {};
		data.search.sql = _this.obj.find('textarea[name="serachTag"]').val();
		data.search.nub = _this.obj.find('input[name="nub"]').val();
		data.search.priority = _this.obj.find('select[name="priority"]').val();

		// 查询列表priority
		//数据源
		return data;
	},

	setData: function(data){
		var _this = this;
		if(!_this.keyid) { return false; }

		if(data) {	_this.data = data;}

		//用户组
		_this.obj.find('input[name="groupname"]').val(_this.data.name);
		_this.obj.find('input[name="groupinfo"]').val(_this.data.info);
		_this.obj.find('input[name="task"][value="'+_this.data.type+'"]').prop('checked',true);

		//查询条件
		_this.obj.find('textarea[name="serachTag"]').val(_this.data.search && _this.data.search.sql ? _this.data.search.sql :"" );
		_this.obj.find('input[name="nub"]').val(_this.data.search && _this.data.search.nub ? _this.data.search.nub :5);
		_this.obj.find('select[name="priority"]').val(_this.data.search && _this.data.search.nub ? _this.data.search.priority:0);
		
		if(_this.data.search && _this.data.search.result && _this.data.search.result.tablelist.length>0 ) {
			_this.renderSearchResult(_this.data.search.result);
		}

		//数据源
		if(_this.data.source && _this.data.source.tablelist){
			_this.renderSourceResult(_this.data.source);
		}
		


	},

	//校验
	checkData:function(){
		var _this = this;
		var data = _this.getData();
		if(data.name == "" || data.info == '' ){
			return false;
		}

	},
	//清空
	clear: function(){
		var _this = this;
		_this.obj.find('input[name="groupname"]').val("");
		_this.obj.find('input[name="groupinfo"]').val("");
		_this.obj.find('input[name="task"][value="0"]').prop('checked',true);

		_this.obj.find('textarea[name="serachTag"]').val('');
		_this.obj.find('input[name="nub"]').val(5);
		_this.obj.find('select[name="priority"]').val(0);

		_this.obj.find('.searchbox .search_result').html('');
		_this.obj.find('.sourcebox .content').html('');
	},
	// 渲染查询列表
	renderSearchResult: function(resultdata){
		if(!resultdata){ return false; }

		var _this = this;
		//查询结果
		if(resultdata.tablelist.length>0 ) {

			var temparr = [];
			var result = resultdata.tablelist;
			var tempthead = [];
			for(var i = 0; i < result.length; i++){
				var obj = result[i], temparrtd = [];
				tempthead = [];
				for(var p in obj ){	
					tempthead.push('<th>'+obj[p]+'</th>');
					temparrtd.push('<td>'+obj[p]+'</td>');
				}
				temparr.push('<tr>'+temparrtd.join("")+'</tr>');
			}
			
			_this.obj.find('.searchbox .search_result').html('<table class="table table-bordered"><tr>'+tempthead.join("")+'</tr><tr>'+temparr.join("")+'</tr></table>');
		}
	},

	//渲染数据源列表
	renderSourceResult: function(resourcedata){
		if(!resourcedata){ return false; }

		var _this = this;
		if(resourcedata.tablelist.length >0){
			var resource = resourcedata.tablelist ;
			var tablelist = [], thead_arr = ['<tr><th>字段</th>','<th>描述</th>','<th>类型</th></tr>'];
			

			for(var i = 0; i < resource.length; i++ ){
				var tbody_arr = [],
					caption_arr = '<caption>' +resource[i].desc+':'+resource[i].name+'</caption>', 
					tempdata = resource[i].list;
					
				for(var p in tempdata){
					tbody_arr.push('<tr><td>'+tempdata[p].key+'</td><td>'+tempdata[p].info+'</td><td>'+tempdata[p].type+'</td></tr>');
				}

				tablelist.push('<table class="table table-bordered mytable">'+caption_arr+thead_arr.join("")+tbody_arr.join("")+'</table>')
			}

			console.log(tablelist);

			_this.obj.find('.sourcebox .content').html(tablelist.join(''));
		}

	},

	//添加
	add: function() {
		var _this = this;
		_this.clear();
	
	},
	//查询交互
	search: function(){
		var _this = this;
		var data = _this.getData();
		if(data.search && data.search.sql == "" ){
			alert('请输入查询条件');
			return false;
		}

		//交互数据
		/*
		$.ajax({
			url:"",
			data:data,
			success:function(result){
      			if(result.status == 200){
      				_this.renderSearchResult(result.data);
      			} else {
      				alert(result.msg);
      			}
    		}
    	});
		*/
	},
	//保存
	save: function(){
		var _this = this;
		var data = _this.getData();
		var ckdata = _this.checkData();
		if(!ckdata){
			alert("您的填写的信息不全，请重新填写");
			return false;
		}
		//交互数据
		/*
		$.ajax({
			url:"",
			data:data,
			success:function(result){
      			if(result.status == 200){
      				windw.location.reload();
      			} else {
      				alert(result.msg);
      			}
    		}
    	});
		*/

	},

	//删除
	delete: function(){
		//
	},

	bindEvent: function(){
		var _this = this; 
		$('body').on('click','.btnbox .searchBtn',function(){
			_this.search();
		});

		$('body').on('click','.savebox .savebtn',function(){
			_this.save();
		});

		$('body').on('click','.savebox .delbtn',function(){
			_this.delete();
		});

	}

};
