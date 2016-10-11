$(function () {
    //表格数据
    $('#ko').datagrid({
        url: 'ScriptMgr.json',
        // url: '/adeploy/services/rest/shell/list',
        checkbox: true,
        method: 'Get',
        nowrap: false,
        fitColumns: true,
        singleSelect: true,
        // pagination: true,
        columns: [
            [{
                field: 'id', title: '序号', width: "50", align: 'center'
            }, {
                field: 'checkProject', title: 'XXXXXX检查项目', width: "170", align: 'center'
            }, {
                field: 'checkMethod', title: '检查方法', width: "200", align: 'center'
            }, {
                field: 'checkOutPut', title: '检查输出结果', width: "150", align: 'center'
            }, {
                field: 'checkPut', title: '检查结果', width: "80", align: 'center'
            }, {
                field: 'isNormal', title: '是否正常', width: "60", align: 'center',styler:cellStyler
            }, {
                field: 'putonghua', title: '判断标准', width: "100", align: 'center'
            }
            ]],
        toolbar: [{
            text: '添加',
            iconCls: 'icon-add',
            handler: function () {
                $("#addDeploy").dialog({
                    closed: false,
                    modal: true,
                    buttons: [{
                        //ajax保存
                        text: '保存',
                        handler: function () {
                            //判断表单验证是否通过
                            if ($("#addDeployForm").form('validate')) {
                                //表单序列化(serialize) ==>{ }
                                var dat = $("#addDeployForm").serializeObject();
                                var a = JSON.stringify(dat);
                                $.ajax({
                                    url: "/adeploy/services/rest/shell/save",
                                    type: "post",
                                    data: a,
                                    dataType: "json",
                                    contentType: "application/json"
                                });
                                $("#addDeploy").dialog("close");
                            }
                            $("#ko").datagrid('reload');
                            $("#addDeployForm").form('reset');
                        }
                    }]
                })
            }
        }, '-', {
            text: '修改',
            iconCls: 'icon-edit',
            handler: function () {
                if ($("#ko").datagrid('getSelected') == null) {
                    $.messager.alert('修改', '请选择你要修改的数据', 'info');
                    return;
                } else {
                    //加载post数据
                    $('#upDeployForm').form('load', '/adeploy/services/rest/shell/findById/' + $("#ko").datagrid('getSelected').id);
                    $("#upDeploy").dialog({
                        closed: false,
                        model: true,
                        buttons: [{
                            text: '保存',
                            handler: function () {
                                //判断表单验证是否通过
                                if ($("#upDeployForm").form('validate')) {
                                    //表单序列化(serialize) ==>{ }
                                    var dat = $("#upDeployForm").serializeObject();
                                    var a = JSON.stringify(dat);
                                    $.ajax({
                                        url: "/adeploy/services/rest/shell/update",
                                        type: "post",
                                        data: a,
                                        dataType: "json",
                                        contentType: "application/json"

                                    });
                                    $("#upDeploy").dialog("close");
                                }
                                $("#ko").datagrid('reload');
                                $("#upDeployForm").form('reset');
                            }
                        }]
                    })
                }
            }
        }, '-', {
            text: '删除',
            iconCls: 'icon-remove',
            handler: function () {
                //判断选中当前行(getSelected)状态
                if ($("#ko").datagrid('getSelected') == null) {
                    $.messager.alert('删除', '请选择你要删除的数据!', 'error');
                    return;
                } else {
                    $.messager.confirm('删除', '你确定删除吗?', function (q) {
                        if (q) {
                            //加载post数据
                            $.post("/adeploy/services/rest/shell/profile/" + $("#ko").datagrid('getSelected').id);
                            $("#ko").datagrid('reload');
                        }
                    })
                }
            }
        }]

    });
});
function cellStyler(value,row,index){
    if (value !== '是'){
        return 'color:red;';
    }
}
//公共方法,字符串转为json
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
