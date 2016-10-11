$(function () {
    //表格数据
    $('#dg').datagrid({
        url: '/adeploy/services/rest/deploy/findPlanName',
        checkbox: true,
        method: 'Get',
        nowrap: false,
        fitColumns: true,
        singleSelect: true,
        columns: [
            [{
                field: 'checkMethod', title: '升级序号', width: "50", align: 'center'
            }, {
                field: 'checkOutPut', title: '方案管理', width: "170", align: 'center'
            }, {
                field: 'checkProject', title: '安装目录', width: "200", align: 'center'
            }, {
                field: 'id', title: '升级前环境', width: "150", align: 'center'
            }, {
                field: 'checkPut', title: '暂停应用', width: "80", align: 'center'
            }, {
                field: 'isNormal', title: '启动应用', width: "60", align: 'center'
            }, {
                field: 'putonghua', title: '升级后环境', width: "100", align: 'center'
            }
            ]],
        toolbar: [{
            text: '升级',
            iconCls: 'icon-arrow',
            handler: function () {
                if ($("#dg").datagrid('getSelected') == null) {
                    $.messager.alert('升级', '请选择你要升级的数据', 'info');
                    return;
                } else {
                    //加载post数据
                    $('#upgradeForm').form('load', '/adeploy/services/rest/deploy/execDeploy' + $("#ko").datagrid('getSelected').id);
                }
                $("#dg").datagrid('reload');
            }
        },'-']
    });
})
