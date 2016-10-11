$(function () {
    //表格数据
    $('#operateTable').datagrid({
        // fit : true,
        url: '/adeploy/services/rest/deploy/findPlanName',
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
                field: 'planName', title: '升级方案', width: "170", align: 'center'
            }, {
                field: 'planDesc', title: '方案说明', width: "200", align: 'center'
            }, {
                field: 'checkOutPut', title: '最后修改时间', width: "150", align: 'center'
            }, {
                field: 'checkPut', title: '修改者', width: "60", align: 'center'
            }, {
                field: 'createDate', title: '创建时间', width: "150", align: 'center'
            }, {
                field: 'putonghua', title: '创建者', width: "60", align: 'center'
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
                                $.post("....", $("#addDeployForm").serialize());
                                //添加成功后关闭dialog
                                $("addDeploy").dialog({
                                    closed: true
                                });
                            }
                            $("#operateTable").datagrid('reload');
                            $("#addDeployForm").form('clear');
                        }
                    },
                        {
                            text: '重置',
                            handler: function () {
                                $("#addDeployForm").form('clear');
                                return;
                            }
                        }]
                })
            }
        }, '-', {
            text: '修改',
            iconCls: 'icon-edit',
            handler: function () {
                if ($("#operateTable").datagrid('getSelected') == null) {
                    $.messager.alert('修改', '请选择你要修改的数据', 'info');
                    return;
                } else {
                    //加载post数据
                    $('#upDeployForm').form('load', '...' + $("#operateTable").datagrid('getSelected').id);
                    $("#upDeploy").dialog({
                        closed: false,
                        model: true,
                        buttons: [{
                            text: '保存',
                            handler: function () {
                                //判断表单验证是否通过
                                if ($("#upDeployForm").form('validate')) {
                                    //表单序列化(serialize) ==>{ }
                                    $.post("....", $("#upDeployForm").serialize());
                                    //添加成功后关闭dialog
                                    $("upDeploy").dialog({
                                        closed: true
                                    });
                                }
                                $("#operateTable").datagrid('reload');
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
                if ($("#operateTable").datagrid('getSelected') == null) {
                    $.messager.alert('删除', '请选择你要删除的数据!', 'error');
                    return;
                } else {
                           console.log($("#ko").datagrid('getSelected').id);
                    $.messager.confirm('删除', '你确定删除吗?', function (q) {
                        if (q) {
                            //加载post数据
                            $.post("/adeploy/services/rest/deploy/remove/" + $("#operateTable").datagrid('getSelected').id);
                            $("#operateTable").datagrid('reload');
                        }
                    })
                }
            }
        }
        ]

    });

})
