	$(document).ready(function() {
		// 导航栏数据
		var treeData = [{
			text : "方案管理",
			iconCls : "icon-z",
			// state:'closed',
			attributes : {
				url : "views/Page/Automation.html"
			},
			{sssssssssss},
			children : [
			// {
			// 	text : "自动化升级—主域设置",
			// 	iconCls : "icon-w",
			// 	attributes : {
			// 		url : "views/Page/domainsettings.html"
			// 	}
			// },
			// {
			// 	text : "自动化升级—自动化升级设置",
			// 	iconCls : "icon-w",
			// 	attributes : {
			// 		url : "views/Page/Automationsettings.html"
			// 	}
			// }, {
			// 	text : "自动化升级—新增升级方案",
			// 	iconCls : 'icon-w',
			// 	attributes : {
			// 		url : "views/Page/Addplan.html"
			// 	}
			// },
			{
				text : "修改升级方案",
				iconCls : 'icon-w',
				attributes : {
					url : "views/UpdatePlan/updatePlan.html"
				}
			},
			{
				text : "删除升级方案",
				iconCls : 'icon-w',
				attributes : {
					url : "views/DeletePage/Deleteplan.html"
				}
			},
			// {
			// 	text : "自动化升级—立即升级",
			// 	iconCls : 'icon-z',
			// 	state:'closed',
			// 	attributes : {
			// 		url : "views/Page/UpgradeNow.html"
			// 	},
			// 	children: [
			// 		{
			// 			text : "自动化升级—升级前环境、升级后环境、暂停应用、启动应用",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : "views/Page/condition.html"
			// 			}
			// 		},{
			// 			text : "自动化升级—安装目录调整",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : "views/Page/install.html"
			// 			}
			// 		},{
			// 			text : "分发调整",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : "views/Page/Distribution.html"
			// 			}
			// 		}]
			// },
			// {
			// 	text : "自动化升级—节点",
			// 	iconCls : 'icon-z',
			// 	state:'closed',
			// 	attributes : {
			// 		url : ""
			// 	},
			// 	children: [
			// 		{
			// 			text : "自动化升级—树节点右键",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : ""
			// 			}
			// 		},{
			// 			text : "自动化升级—新增IP地址节点",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : "views/Page/NewIpAddress.html"
			// 			}
			// 		},{
			// 			text : "自动化升级—新增主域节点",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : "views/Page/NewPrimaryDomain.html"
			// 			}
			// 		},{
			// 			text : "自动化升级—修改主域节点",
			// 			iconCls : 'icon-w',
			// 			attributes : {
			// 				url : "views/Page/pencilPrimaryDomain.html"
			// 			}
			// 		}]
			// },
			// {
			// 	text : "自动化升级—安装目录查看",
			// 	iconCls : 'icon-w',
			// 	attributes : {
			// 		url : "views/Page/installCheck.html"
			// 	}
			// },
			{
				text : "脚本管理",
				iconCls : 'icon-w',
				attributes : {
					url : "views/ScriptMgr/ScriptMgr.html"
				}
			},
			{
				text : "上传",
				iconCls : 'icon-w',
				attributes : {
					url : "views/Upload/upload.html"
				}
			},
			// {
			// 	text : "分发查看",
			// 	iconCls : 'icon-w',
			// 	attributes : {
			// 		url : "views/Page/check.html"
			// 	}
			// },
			{
				text : "自动升级..",
				iconCls : 'icon-w',
				attributes : {
					url : "views/AutoUpgrade/Autoupgrade.html"
				}
			}]
		}];

        //节点数据加载
		$("#tree").tree({
			data : treeData,
			lines : true,
			onClick : function(node) {
				if (node.attributes) {
					openTab(node.text, node.attributes.url, node.iconCls);
				}
			}
		});

		// 新增Tab
		function openTab(text, url, iconCls) {
			if ($("#tabs").tabs('exists', text)) {
				$("#tabs").tabs('select', text);
			} else {
				var content = "<iframe frameborder='0' scrolling='auto' style='width:100%;height:100%' src="
						+ url + "></iframe>";
				$("#tabs").tabs('add', {
					title : text,
					closable : true,
					content : content,
					iconCls : iconCls,
				});
			}
		}
	});
