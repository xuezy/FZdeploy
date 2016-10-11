$(function(){

var formDataInit;//resetData
var datagrid_upload = {grid:undefined,editRow:undefined};
var datagrid_before = {grid:undefined,editRow:undefined};
var datagrid_after = {grid:undefined,editRow:undefined};
var datagrid_pause = {grid:undefined,editRow:undefined};
var datagrid_start = {grid:undefined,editRow:undefined};

	//tabs
	$("#tabs").tabs({

	});

//配置上传文件table && datagrid
datagrid_upload.grid = $('#upload')
.datagrid({
	//selectOnCheck : true, //true 勾选会选择此行，false勾选不会选择此行，1.3之后有该选项。这是row edit的重点。
	//checkOnSelect : true, //true选择行勾选false选择行不勾选，1.3之后有该选项。
	rownumbers : true,
	width : 650,
	columns :[[
		{field : 'ck', title : '全选', checkbox : true},
		//{field : 'id', title : '序号', width : 30, align : 'center', resizable :true, hidden : true},
		{field : 'localPath', title : '源文件', width :150, align: 'center', resizable : true, editor : 'text', required : true},
		{field : 'remotePath', title : '目的文件', width:150, align : 'center', resizable : true, editor : 'text', required : true}
	]],
	toolbar: [
		{text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
			//添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
			if (datagrid_upload.editRow != undefined) {
			  datagrid_upload.grid.datagrid('endEdit', datagrid_upload.editRow);
			}
			//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
			if (datagrid_upload.editRow == undefined) {
				datagrid_upload.grid.datagrid('insertRow', {
					index: 0, // index start with 0
					row: {
					}
			  });
				//将新插入的那一行开户编辑状态
				datagrid_upload.grid.datagrid('beginEdit', 0);
				//给当前编辑的行赋值
				datagrid_upload.editRow = 0;
			}
		}},'-',
		{text: '删除', iconCls: 'icon-remove', handler: function () {
			  //删除时先获取选择行
        var rows = datagrid_upload.grid.datagrid("getSelections");
        //选择要删除的行
        if (rows.length > 0) {
          $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
              for (var i = 0; i < rows.length; i++) {
                var index = datagrid_upload.grid.datagrid('getRowIndex',rows[i]);
                datagrid_upload.grid.datagrid('deleteRow',index);
              }
            }
          });
          datagrid_upload.grid.datagrid('clearSelections'); 
        }else {
          $.messager.alert("提示", "请选择要删除的行", "error");
        }
			}
	  },'-',
	  { text: '保存行', iconCls: 'icon-save', handler: function () {
	    //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	    datagrid_upload.grid.datagrid("endEdit", datagrid_upload.editRow);
	  }}, '-',
	  {text : '取消编辑', iconCls : 'icon-redo', handler : function () {
				datagrid_upload.editRow = undefined;
				datagrid_upload.grid.datagrid("rejectChanges");
				datagrid_upload.grid.datagrid("unselectAll");
			}
	  }
	],
	onAfterEdit: function (rowIndex, rowData, changes) {
		//endEdit该方法触发此事件
		datagrid_upload.editRow = undefined;
	},
	onDblClickRow: function (rowIndex, rowData) {
	  //双击开启编辑行
	  if (datagrid_upload.editRow != undefined) {
	    datagrid_upload.grid.datagrid("endEdit", datagrid_upload.editRow);
	  }
		if (datagrid_upload.editRow == undefined) {
			datagrid_upload.grid.datagrid("beginEdit", rowIndex);
			datagrid_upload.editRow = rowIndex;
		}
	}
});


//(前)升级环境table && datagrid
datagrid_before.grid = $('#before')
.datagrid({
	//selectOnCheck : true, //true 勾选会选择此行，false勾选不会选择此行，1.3之后有该选项。这是row edit的重点。
	//checkOnSelect : true, //true选择行勾选false选择行不勾选，1.3之后有该选项。
	rownumbers : true,
	columns : [[
		{field : 'ck' , title : '全选' , checkbox : true},
		{field : 'marking' , title : '' , hidden : true},
		{field : 'checkProject' , title : '升级前环境检查项目', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'checkMethods' , title : '检查方法', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'criteria' , title : '判断标准', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'remarks' , title : '备注', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
	]],
	toolbar: [
		{text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
			//添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
			if (datagrid_before.editRow != undefined) {
			  datagrid_before.grid.datagrid('endEdit', datagrid_before.editRow);
			}
			//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
			if (datagrid_before.editRow == undefined) {
				datagrid_before.grid.datagrid('insertRow', {
					index: 0, // index start with 0
					row: {
					}
			  });
				//将新插入的那一行开户编辑状态
				datagrid_before.grid.datagrid('beginEdit', 0);
				//给当前编辑的行赋值
				datagrid_before.editRow = 0;
			}
		}},'-',
		{text: '删除', iconCls: 'icon-remove', handler: function () {
			  //删除时先获取选择行
        var rows = datagrid_before.grid.datagrid("getSelections");
        //选择要删除的行
        if (rows.length > 0) {
          $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
              for (var i = 0; i < rows.length; i++) {
                var index = datagrid_before.grid.datagrid('getRowIndex',rows[i]);
                datagrid_before.grid.datagrid('deleteRow',index);
              }
            }
          });
          datagrid_before.grid.datagrid('clearSelections'); 
        }else {
          $.messager.alert("提示", "请选择要删除的行", "error");
        }
			}
	  },'-',
	  { text: '保存行', iconCls: 'icon-save', handler: function () {
	    //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	    console.log(datagrid_before.editRow);
	    datagrid_before.grid.datagrid("endEdit", datagrid_before.editRow);
	  }}, '-',
	  {text : '取消编辑', iconCls : 'icon-redo', handler : function () {
				datagrid_before.editRow = undefined;
				datagrid_before.grid.datagrid("rejectChanges");
				datagrid_before.grid.datagrid("unselectAll");
			}
	  }
	],
	onAfterEdit: function (rowIndex, rowData, changes) {
		//endEdit该方法触发此事件
		datagrid_before.editRow = undefined;
	},
	onDblClickRow: function (rowIndex, rowData) {
	  //双击开启编辑行
	  if (datagrid_before.editRow != undefined) {
	    datagrid_before.grid.datagrid("endEdit", datagrid_before.editRow);
	  }
		if (datagrid_before.editRow == undefined) {
			datagrid_before.grid.datagrid("beginEdit", rowIndex);
			datagrid_before.editRow = rowIndex;
		}
	}
});


//(后)升级环境table && datagrid
datagrid_after.grid = $('#after')
.datagrid({
	//selectOnCheck : true, //true 勾选会选择此行，false勾选不会选择此行，1.3之后有该选项。这是row edit的重点。
	//checkOnSelect : true, //true选择行勾选false选择行不勾选，1.3之后有该选项。
	rownumbers : true,
	columns : [[
		{field : 'ck' , title : '全选' , checkbox : true},
		{field : 'marking' , title : '' , hidden : true},
		{field : 'checkProject' , title : '升级前环境检查项目', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'checkMethods' , title : '检查方法', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'criteria' , title : '判断标准', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'remarks' , title : '备注', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
	]],
	toolbar: [
		{text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
			//添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
			if (datagrid_after.editRow != undefined) {
			  datagrid_after.grid.datagrid('endEdit', datagrid_after.editRow);
			}
			//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
			if (datagrid_after.editRow == undefined) {
				datagrid_after.grid.datagrid('insertRow', {
					index: 0, // index start with 0
					row: {
					}
			  });
				//将新插入的那一行开户编辑状态
				datagrid_after.grid.datagrid('beginEdit', 0);
				//给当前编辑的行赋值
				datagrid_after.editRow = 0;
			}
		}},'-',
		{text: '删除', iconCls: 'icon-remove', handler: function () {
			  //删除时先获取选择行
        var rows = datagrid_after.grid.datagrid("getSelections");
        //选择要删除的行
        if (rows.length > 0) {
          $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
              for (var i = 0; i < rows.length; i++) {
                var index = datagrid_after.grid.datagrid('getRowIndex',rows[i]);
                datagrid_after.grid.datagrid('deleteRow',index);
              }
            }
          });
          datagrid_after.grid.datagrid('clearSelections'); 
        }else {
          $.messager.alert("提示", "请选择要删除的行", "error");
        }
			}
	  },'-',
	  { text: '保存行', iconCls: 'icon-save', handler: function () {
	    //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	    console.log(datagrid_after.editRow);
	    datagrid_after.grid.datagrid("endEdit", datagrid_after.editRow);
	  }}, '-',
	  {text : '取消编辑', iconCls : 'icon-redo', handler : function () {
				datagrid_after.editRow = undefined;
				datagrid_after.grid.datagrid("rejectChanges");
				datagrid_after.grid.datagrid("unselectAll");
			}
	  }
	],
	onAfterEdit: function (rowIndex, rowData, changes) {
		//endEdit该方法触发此事件
		datagrid_after.editRow = undefined;
	},
	onDblClickRow: function (rowIndex, rowData) {
	  //双击开启编辑行
	  if (datagrid_after.editRow != undefined) {
	    datagrid_after.grid.datagrid("endEdit", datagrid_after.editRow);
	  }
		if (datagrid_after.editRow == undefined) {
			datagrid_after.grid.datagrid("beginEdit", rowIndex);
			datagrid_after.editRow = rowIndex;
		}
	}
});


//(暂停)应用table && datagrid
datagrid_pause.grid = $('#pause')
.datagrid({
	//selectOnCheck : true, //true 勾选会选择此行，false勾选不会选择此行，1.3之后有该选项。这是row edit的重点。
	//checkOnSelect : true, //true选择行勾选false选择行不勾选，1.3之后有该选项。
	rownumbers : true,
	columns : [[
		{field : 'ck' , title : '全选' , checkbox : true},
		{field : 'marking' , title : '' , hidden : true},
		{field : 'checkProject' , title : '升级前环境检查项目', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'checkMethods' , title : '检查方法', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'criteria' , title : '判断标准', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'remarks' , title : '备注', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
	]],
	toolbar: [
		{text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
			//添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
			if (datagrid_pause.editRow != undefined) {
			  datagrid_pause.grid.datagrid('endEdit', datagrid_pause.editRow);
			}
			//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
			if (datagrid_pause.editRow == undefined) {
				datagrid_pause.grid.datagrid('insertRow', {
					index: 0, // index start with 0
					row: {
					}
			  });
				//将新插入的那一行开户编辑状态
				datagrid_pause.grid.datagrid('beginEdit', 0);
				//给当前编辑的行赋值
				datagrid_pause.editRow = 0;
			}
		}},'-',
		{text: '删除', iconCls: 'icon-remove', handler: function () {
			  //删除时先获取选择行
        var rows = datagrid_pause.grid.datagrid("getSelections");
        //选择要删除的行
        if (rows.length > 0) {
          $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
              for (var i = 0; i < rows.length; i++) {
                var index = datagrid_pause.grid.datagrid('getRowIndex',rows[i]);
                datagrid_pause.grid.datagrid('deleteRow',index);
              }
            }
          });
          datagrid_pause.grid.datagrid('clearSelections'); 
        }else {
          $.messager.alert("提示", "请选择要删除的行", "error");
        }
			}
	  },'-',
	  { text: '保存行', iconCls: 'icon-save', handler: function () {
	    //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	    console.log(datagrid_pause.editRow);
	    datagrid_pause.grid.datagrid("endEdit", datagrid_pause.editRow);
	  }}, '-',
	  {text : '取消编辑', iconCls : 'icon-redo', handler : function () {
				datagrid_pause.editRow = undefined;
				datagrid_pause.grid.datagrid("rejectChanges");
				datagrid_pause.grid.datagrid("unselectAll");
			}
	  }
	],
	onAfterEdit: function (rowIndex, rowData, changes) {
		//endEdit该方法触发此事件
		datagrid_pause.editRow = undefined;
	},
	onDblClickRow: function (rowIndex, rowData) {
	  //双击开启编辑行
	  if (datagrid_pause.editRow != undefined) {
	    datagrid_pause.grid.datagrid("endEdit", datagrid_pause.editRow);
	  }
		if (datagrid_pause.editRow == undefined) {
			datagrid_pause.grid.datagrid("beginEdit", rowIndex);
			datagrid_pause.editRow = rowIndex;
		}
	}
});


//(启动)应用table && datagrid
datagrid_start.grid = $('#start')
.datagrid({
	//selectOnCheck : true, //true 勾选会选择此行，false勾选不会选择此行，1.3之后有该选项。这是row edit的重点。
	//checkOnSelect : true, //true选择行勾选false选择行不勾选，1.3之后有该选项。
	rownumbers : true,
	columns : [[
		{field : 'ck' , title : '全选' , checkbox : true},
		{field : 'marking' , title : '' , hidden : true},
		{field : 'checkProject' , title : '升级前环境检查项目', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'checkMethods' , title : '检查方法', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'criteria' , title : '判断标准', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
		{field : 'remarks' , title : '备注', width : 150 , align : 'center' , resizable : true , editor : 'text' , required : true},
	]],
	toolbar: [
		{text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
			//添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
			if (datagrid_start.editRow != undefined) {
			  datagrid_start.grid.datagrid('endEdit', datagrid_start.editRow);
			}
			//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
			if (datagrid_start.editRow == undefined) {
				datagrid_start.grid.datagrid('insertRow', {
					index: 0, // index start with 0
					row: {
					}
			  });
				//将新插入的那一行开户编辑状态
				datagrid_start.grid.datagrid('beginEdit', 0);
				//给当前编辑的行赋值
				datagrid_start.editRow = 0;
			}
		}},'-',
		{text: '删除', iconCls: 'icon-remove', handler: function () {
			  //删除时先获取选择行
        var rows = datagrid_start.grid.datagrid("getSelections");
        //选择要删除的行
        if (rows.length > 0) {
          $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
              for (var i = 0; i < rows.length; i++) {
                var index = datagrid_start.grid.datagrid('getRowIndex',rows[i]);
                datagrid_start.grid.datagrid('deleteRow',index);
              }
            }
          });
          datagrid_start.grid.datagrid('clearSelections'); 
        }else {
          $.messager.alert("提示", "请选择要删除的行", "error");
        }
			}
	  },'-',
	  { text: '保存行', iconCls: 'icon-save', handler: function () {
	    //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	    console.log(datagrid_start.editRow);
	    datagrid_start.grid.datagrid("endEdit", datagrid_start.editRow);
	  }}, '-',
	  {text : '取消编辑', iconCls : 'icon-redo', handler : function () {
				datagrid_start.editRow = undefined;
				datagrid_start.grid.datagrid("rejectChanges");
				datagrid_start.grid.datagrid("unselectAll");
			}
	  }
	],
	onAfterEdit: function (rowIndex, rowData, changes) {
		//endEdit该方法触发此事件
		datagrid_start.editRow = undefined;
	},
	onDblClickRow: function (rowIndex, rowData) {
	  //双击开启编辑行
	  if (datagrid_start.editRow != undefined) {
	    datagrid_start.grid.datagrid("endEdit", datagrid_start.editRow);
	  }
		if (datagrid_start.editRow == undefined) {
			datagrid_start.grid.datagrid("beginEdit", rowIndex);
			datagrid_start.editRow = rowIndex;
		}
	}
});


//初始化获取表格数据
$.ajax({
	type: 'GET',
	url: '/adeploy/services/rest/deploy/findDeploy',
	data: {groupId: 4},
	dataType: 'json',
	success: function(data){
		formDataInit = $.extend(true, {}, data);
    $("input:text").val(myData.rows[0].planName);
		$('#planDesc').val(myData.rows[0].planDesc);
		datagrid_upload.grid.datagrid("loadData",data.rows);
		datagrid_before.grid.datagrid("loadData",data.before);
		datagrid_after.grid.datagrid("loadData",data.after);
		datagrid_pause.grid.datagrid("loadData",data.pause);
		datagrid_start.grid.datagrid("loadData",data.start);
	},
	// error: function(e){
	// 	alert("出错了："+e);
	// }
});

// var myData = {
// 	"total":5,
// 	"before":[
// 	  {
// 	  	"id":8,"groupId":6,"marking":"before",
// 	    "planName":"projectName0",
// 	    "planDesc":null,
// 	    "checkProject":"checkProject0",
// 	    "checkMethods":"checkMethods0",
// 	    "criteria":"criteria0",
// 	    "remarks":"remarks0",
// 	    "createDate":"Thu Sep 22 10:54:25 CST 2016"
// 	  }
// 	],
// 	"start":[
// 	  {
// 	  	"id":11,"groupId":6,"marking":"start",
// 	  	"planName":"projectName3",
// 	  	"planDesc":null,
// 	  	"checkProject":"checkProject3",
// 	  	"checkMethods":"checkMethods3",
// 	  	"criteria":"criteria3",
// 	  	"remarks":"remarks3",
// 	  	"createDate":"Thu Sep 22 10:54:25 CST 2016"
// 	  },
// 	  {"id":12,"groupId":6,"marking":"start","planName":"projectName4","planDesc":null,"checkProject":"checkProject4","checkMethods":"checkMethods4","criteria":"criteria4","remarks":"remarks4","createDate":"Thu Sep 22 10:54:25 CST 2016"}
// 	],
// 	"after":[
// 	  {
// 	  	"id":10,"groupId":6,"marking":"after",
// 	  	"planName":"projectName2",
// 	  	"planDesc":null,
// 	  	"checkProject":"checkProject2",
// 	  	"checkMethods":"checkMethods2",
// 	  	"criteria":"criteria2",
// 	  	"remarks":"remarks2",
// 	  	"createDate":"Thu Sep 22 10:54:25 CST 2016"
// 	  },
// 	  {"id":13,"groupId":6,"marking":"after","planName":"projectName5","planDesc":null,"checkProject":"checkProject5","checkMethods":"checkMethods5","criteria":"criteria5","remarks":"remarks5","createDate":"Thu Sep 22 10:54:25 CST 2016"}
// 	],
// 	"rows":[
// 	  {
// 	  	"id":21,"groupId":6,"planName":"projectName5","planDesc":"PlanDesc5",
// 	  	"pattern":1,
// 	  	"localPath":"localPath5",
// 	  	"remotePath":"remotePath5",
// 	  	"fileName":"fileName5",
// 	  	"ip":"192.168.0.91",
// 	  	"createDate":"Thu Sep 22 10:54:25 CST 2016"
// 	  },
// 	  {"id":20,"groupId":6,"planName":"projectName4","planDesc":"PlanDesc4","pattern":1,"localPath":"localPath4","remotePath":"remotePath4","fileName":"fileName4","ip":"192.168.0.91","createDate":"Thu Sep 22 10:54:25 CST 2016"},
// 	  {"id":17,"groupId":6,"planName":"projectName1","planDesc":"PlanDesc1","pattern":1,"localPath":"localPath1","remotePath":"remotePath1","fileName":"fileName1","ip":"192.168.0.91","createDate":"Thu Sep 22 10:54:25 CST 2016"},
//   	  {"id":18,"groupId":6,"planName":"projectName2","planDesc":"PlanDesc2","pattern":1,"localPath":"localPath2","remotePath":"remotePath2","fileName":"fileName2","ip":"192.168.0.91","createDate":"Thu Sep 22 10:54:25 CST 2016"},
//   	  {"id":16,"groupId":6,"planName":"projectName0","planDesc":"PlanDesc0","pattern":1,"localPath":"localPath0","remotePath":"remotePath0","fileName":"fileName0","ip":"192.168.0.91","createDate":"Thu Sep 22 10:54:25 CST 2016"}
// 	],
// 	"pause":[
// 	  {"id":9,"groupId":6,"marking":"pause","planName":"projectName1","planDesc":null,
// 	  "checkProject":"checkProject1",
// 	  "checkMethods":"checkMethods1",
// 	  "criteria":"criteria1",
// 	  "remarks":"remarks1",
// 	  "createDate":"Thu Sep 22 10:54:25 CST 2016"}
// 	]
// };

  //测试假数据
	// setTimeout(function() {
	// 	formDataInit = $.extend(true, {}, myData);
 //    $("input:text").val(myData.rows[0].planName);
	// 	$('#planDesc').val(myData.rows[0].planDesc);
	// 	datagrid_upload.grid.datagrid("loadData",myData.rows);
	// 	datagrid_before.grid.datagrid("loadData",myData.before);
	// 	datagrid_after.grid.datagrid("loadData",myData.after);
	// 	datagrid_pause.grid.datagrid("loadData",myData.pause);
	// 	datagrid_start.grid.datagrid("loadData",myData.start);
	// }, 3000);



	//button
	// $("#upgradeNow").linkbutton({
	// 	iconCls: 'icon-t'
	// });
	// $("#config").linkbutton({
	// 	iconCls: 'icon-t'
	// });

	// saveAll, use ajax to submit the form.
	$("#btnSaveAll").bind('click', function () {
		var planName = $("#planName").val();
		var planDesc = $('#planDesc').val();
		var pattern = $("input:radio[name='pattern']:checked").val();
		//alert("方案："+planName+","+planDesc+","+pattern);
    	var pathList = [];
		var scriptList = [];
		//set value for pathList
    	if (1 == pattern) {
	    var data1 = datagrid_upload.grid.datagrid("getRows");
			var data2 = [];
			for (var i = 0; i <= data1.length - 1; i++) {
				data2.push(data1[i]);
			};
			for (var j = 0; j <= data2.length - 1; j++) {
				var pathVo = {"planName":planName,"planDesc":planDesc,"pattern":pattern,"localPath":data2[j].localPath,"remotePath":data2[j].remotePath};
				pathList.push(pathVo);
			};
		} else{
			var pathList1 = {"planName" : planName , "planDesc" : planDesc , "pattern" : pattern , localPath : $("#localPath").textbox('getValue') , remotePath : $("#remotePath").textbox('getValue')}
			pathList.push(pathList1);
		};

		//set value for scriptList
		//beforeUpgrade
		var beforeUpgrade = datagrid_before.grid.datagrid("getRows");
		for (var i = 0; i <= beforeUpgrade.length - 1; i++) {
			scriptList.push({
				marking: 'before',
				checkProject: beforeUpgrade[i].checkProject,
				checkMethods: beforeUpgrade[i].checkMethods,
				criteria: beforeUpgrade[i].criteria,
				remarks: beforeUpgrade[i].remarks,
			});
		};
		//afterUpgrade
		var afterUpgrade = datagrid_after.grid.datagrid("getRows");
		for (var i = 0; i <= afterUpgrade.length - 1; i++) {
			scriptList.push({
				marking: 'after',
				checkProject: afterUpgrade[i].checkProject,
				checkMethods: afterUpgrade[i].checkMethods,
				criteria: afterUpgrade[i].criteria,
				remarks: afterUpgrade[i].remarks,
			});
		};
		//pauseApp
		var pauseApp = datagrid_pause.grid.datagrid("getRows");
		for (var i = 0; i <= pauseApp.length - 1; i++) {
			scriptList.push({
				marking: 'pause',
				checkProject: pauseApp[i].checkProject,
				checkMethods: pauseApp[i].checkMethods,
				criteria: pauseApp[i].criteria,
				remarks: pauseApp[i].remarks,
			});
		};
		//startApp
		var startApp = datagrid_start.grid.datagrid("getRows");
		for (var i = 0; i <= startApp.length - 1; i++) {
			scriptList.push({
				marking: 'start',
				checkProject: startApp[i].checkProject,
				checkMethods: startApp[i].checkMethods,
				criteria: startApp[i].criteria,
				remarks: startApp[i].remarks,
			});
		};
    	console.log(pathList,scriptList);
		//submit the form use ajax
		$.ajax({
			type: 'POST',
			url: '/adeploy/services/rest/deploy/updateDeploy',
			//set the Content-Type
			contentType: 'application/json',
			//以post方式将两个数组传至后台，传递的数据形式是json，如下：
			//data: {"pathList" : pathList , "scriptList" : scriptList}, // 传数据的时候需要使用JSON.stringify()将数据对象转成JSON格式。
			data: JSON.stringify({"pathList" : pathList , "scriptList" : scriptList}),
			success: function(data){
				alert("成功");
			},
			error: function(e){
				alert("出错了："+e);
			}
		});
	});

	//btnCancelAll
	$("#btnCancelAll").bind('click', function () {
		var tempData = $.extend(true, {}, formDataInit);
		datagrid_upload.grid.datagrid("loadData",tempData.rows);
		datagrid_before.grid.datagrid("loadData",tempData.before);
		datagrid_after.grid.datagrid("loadData",tempData.after);
		datagrid_pause.grid.datagrid("loadData",tempData.pause);
		datagrid_start.grid.datagrid("loadData",tempData.start);
	})
});
