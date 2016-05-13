/**
date:2016-5-7
author:limanclear@163.com/limanclear@didichuxingcom
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
		_this.obj.find('select[name="priority"]').val(_this.data.search && _this.data.search.priority ? _this.data.search.priority:0);
		
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

//模板

//[{"id":"1","name":"模板A","data":{"name":"模板A","notice_method":"1","info":"内容","click_notice":"1",}}];

var Template = function(option){
	this.data = option.data;
	this.obj  = option.obj;
	this.temp_tabdata = [];
};

Template.prototype =  {

	init:function(){
		var _this = this;
		
		//实时获取模板标题数据
		_this.getAjax(function(tabdata){
			
			_this.render(tabdata);
			_this.obj.find("a.templatename:first").click();
			_this.bindEvent();
		});
		
	},

	//模板头部标题 tabdata = [{"id":"",name:"","data"={}}];
	render:function(tabdata){
		this.data = tabdata;
		var _this = this, temparr = [];
		for(var i = 0 ; i < tabdata.length; i++ ){
			temparr.push('<a class="templatename" id="'+tabdata[i].id+'" data=\''+JSON.stringify(tabdata[i].data)+'\' >'+tabdata[i].name+'</a>');
		}
		_this.obj.find(".template_list").html(temparr.join(""));

	},

	getAjax:function(success){

		// 测试数据
		var tabdata = [{"id":"1","name":"模板A","data":{"name":"模板A","notice_method":"1","info":"内容","click_notice":"1",}},
				];
		success(tabdata);
	
		//交互数据保存模板
		
		// $.ajax({
		// 	url:"",
		// 	data:data,
		// 	success:function(result){
  //     			if(result.status == 200){
  //     				success(result.data);
  //     			} else {
  //     				console.log('获取模板头部标题出错 tab title :'+result.msg);
  //     			}
  //   		}
  //   	});
		

	},

	getData:function(){
		var _this = this;
		var data = {};
		data['id'] = _this.obj.find('input[name="template_id"]').val();
		data['name'] = _this.obj.find('input[name="template_name"]').val();
		data['notice_method'] = _this.obj.find('input[name="notice_method"]:checked').val();
		data['info'] = _this.obj.find('textarea[name="template_info"]').val();
		data['click_notice'] = _this.obj.find('input[name="click_notice"]:checked').val();
		data['addr'] = _this.obj.find('input[name="template_addr"]').val();
		data['remind'] = [];

		$(_this.obj).find('input[class="remind"]:checked').each(function(){  
			data['remind'].push($(this).val());//向数组中添加元素  
		}); 

		return data;
	},

	setData:function(data){
	
		var _this = this;
		_this.obj.find('input[name="template_id"]').val(data['id'] ? data['id'] :-1); 
		_this.obj.find('input[name="template_name"]').val(data.name ? data.name : '');
		_this.obj.find('input[name="notice_method"][value="'+(data.notice_method ? data.notice_method : 1)+'"]').prop("checked",true);
		_this.obj.find('textarea[name="template_info"]').prop(data.info ? data.info : '');
		_this.obj.find('input[name="click_notice"][value="'+(data.click_notice ? data.click_notice : 1)+'"]').prop("checked",true);
		_this.obj.find('input[name="template_addr"]').val(data.addr ? data.addr : '');

		if(data.remind){
			for(var i = 0; i < data.remind.length; i++){
				_this.obj.find('input[class="remind"][value="'+data.remind[i]+'"]').prop("checked",true);
			}
		}

	},

	checkData:function(data){
		var errormsg = [];
		var _this = this;
	
		if(data.name == "" || data.info == "" ||  data.addr == "" || data.remind.length == 0){
			return false;
		}
		return data;

	},

	saveData:function(){
		console.log(this.data);
		var _this = this;
		var data = _this.getData();
		var optiondata = [];

		if(!_this.checkData(data)){
			_this.obj.find('.errormsg').text("请完善信息后保存！");
		}

		//判断是新增 还是修改的数据
		if(data.id > 0){
			//修改的 清洗数据
			for(var p in _this.data){
				if(_this.data == data.id){
					optiondata.push(data);
				} else{
					optiondata.push(_this.data[p]);
				}
			}

		} else {
			//新增的
			optiondata = this.data;
			data['id'] = (new Date()).valueOf();
			optiondata.push(data);
		}

		//交互数据保存模板
		
		// $.ajax({
		// 	url:"",
		// 	data:optiondata,
		// 	success:function(result){
  //     			if(result.status == 200){
       				
  						_this.data = optiondata; 
						_this.render_template_select(optiondata);
						_this.obj.modal('hide');

  //     			} else {
  //     				alert(result.msg);
  //     			}
  //   		}
  //   	});
		

	},

	clear:function(){
		var _this = this;
		_this.obj.find('input[name="template_id"]').val(-1);
		_this.obj.find('input[name="template_name"]').val('');
		_this.obj.find('input[name="notice_method"][id="notice_method1"]').prop('checked',true);
		_this.obj.find('textarea[name="template_info"]').val('');
		_this.obj.find('input[name="click_notice"][id="click_notice1"]').prop('checked',true);
		_this.obj.find('input[name="template_addr"]').val('');
		_this.obj.find('input[class="remind"]').prop('checked',false);

	},

	bindEvent:function(){
		var _this = this;
		var obj = $(_this.obj);

		// tabnav 模板a 点击事件
		$("body").on('click','.template_list a.templatename',function(event){
			var self = this;
			var data = JSON.parse($(self).attr('data'));
			data['id'] = $(self).attr('id');
			_this.setData(data);
		});

		//添加模板事件
		$("body").on('click','a.addTemplatename',function(event){
			var self = this;
			var length = obj.find('a.templatename').length;
			if(length > 4){
				alert("您添加的模板不能超过4个");
				return false;
			}

			_this.clear();

		});

		//模板保存按钮
		$("body").on('click','.template_save',function(event){

			_this.saveData();
			
		});

		//关闭按钮

	},

	//渲染添加的模板
	render_template_select:function(optiondata){
		var temparr = [];
		for(var i = 0; i< optiondata.length; i++){
			temparr.push('<option value="'+optiondata[i].id+'">'+optiondata[i].name+'</option>');
		}
		$('.template select[name="template"]').html(temparr.join(""));
	}


};







