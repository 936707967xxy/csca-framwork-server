import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

export const constantRouterMap = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: "Home",
        redirect: '/main',
        hidden: false,
        dropdown: false,
        meta: { title: '主页', iconCls: "fa fa-tachometer" },
        children: [{
            path: "/main",
            component: resolve => require(['../components/Main'], resolve),
            name: "Home",
            hidden: false,
            meta: { title: '主页', iconCls: 'fa fa-tachometer' }
        }]
    },
    {
        path: "/",
        component: Home,
        name: "AfterLoanHome",
        hidden: false,
        dropdown: true,
        meta: { title: '贷后管理2.0', iconCls: "fa fa-object-group" },
        children: [{
                path: "nomalCustomer",
                component: resolve => require(['../components/views/customer/nomalCustomer'], resolve),
                name: "nomalCustomer",
                hidden: false,
                meta: { title: '客户列表', iconCls: "fa fa-address-book" }
            }, {
                path: "collectionRecord",
                component: resolve => require(['../components/views/collection/collectionRecord'], resolve),
                name: "collectionRecord",
                hidden: false,
                meta: { title: '催收任务', iconCls: "fa fa-list-alt" }
            }, {
                path: "deductRecord",
                component: resolve => require(['../components/views/deduct/deductRecord'], resolve),
                name: "deductRecord",
                hidden: false,
                meta: { title: '划扣记录', iconCls: "fa fa-list" }
            },
            {
                path: "settleCustomer",
                component: resolve => require(['../components/views/settle/settleCustomer'], resolve),
                name: "settleCustomer",
                hidden: false,
                meta: { title: '客户结清', iconCls: "fa fa-list-ul" }
            },
            {
                path: "customerTask",
                component: resolve => require(['../components/views/task/customerTask'], resolve),
                name: "customerTask",
                hidden: false,
                meta: { title: '任务分配', iconCls: "fa fa-list-ul" }
            },
            {
                path: "savePublicRecord",
                component: resolve => require(['../components/views/savePublic/savePublicRecord'], resolve),
                name: "savePublicRecord",
                hidden: false,
                meta: { title: '存公记录', iconCls: "fa fa-list-ul" }
            },
            {
                path: "messageUpdateApprove",
                component: resolve => require(['../components/views/messageUpdate/messageUpdateApprove'], resolve),
                name: "messageUpdateApprove",
                hidden: false,
                meta: { title: '信息变更一级审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "messageUpdateApprove2",
                component: resolve => require(['../components/views/messageUpdate/messageUpdateApprove2'], resolve),
                name: "messageUpdateApprove2",
                hidden: false,
                meta: { title: '信息变更二级审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "messageUpdateHistory",
                component: resolve => require(['../components/views/messageUpdate/messageUpdateHistory'], resolve),
                name: "messageUpdateHistory",
                hidden: false,
                meta: { title: '信息变更历史记录', iconCls: "fa fa-th-list" },
            },
            {
                path: "overdueApprove",
                component: resolve => require(['../components/views/overdue/overdueApprove'], resolve),
                name: "overdueApprove",
                hidden: false,
                meta: { title: '减免一级审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "overdueApprove2",
                component: resolve => require(['../components/views/overdue/overdueApprove2'], resolve),
                name: "overdueApprove2",
                hidden: false,
                meta: { title: '减免二级审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "overdueApproveHistory",
                component: resolve => require(['../components/views/overdue/overdueApproveHistory'], resolve),
                name: "overdueApproveHistory",
                hidden: false,
                meta: { title: '减免申请历史记录', iconCls: "fa fa-th-list" },
            },
            {
                path: "outboundApprove",
                component: resolve => require(['../components/views/outbound/outboundApprove'], resolve),
                name: "outboundApprove",
                hidden: false,
                meta: { title: '外访审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "outboundApproveHistory",
                component: resolve => require(['../components/views/outbound/outboundApproveHistory'], resolve),
                name: "outboundApproveHistory",
                hidden: false,
                meta: { title: '外访申请记录', iconCls: "fa fa-th-list" },
            },
            {
                path: "visitTaskList",
                component: resolve => require(['../components/views/visit/visitTaskList'], resolve),
                name: "visitTaskList",
                hidden: false,
                meta: { title: '外访分配', iconCls: "fa fa-th-list" },
            },
            {
                path: "visitTaskService",
                component: resolve => require(['../components/views/visit/visitTaskService'], resolve),
                name: "visitTaskService",
                hidden: false,
                meta: { title: '总外访任务', iconCls: "fa fa-th-list" },
            },
            {
                path: "visitTaskService1",
                component: resolve => require(['../components/views/visit/visitTaskService1'], resolve),
                name: "visitTaskService1",
                hidden: false,
                meta: { title: '外访任务', iconCls: "fa fa-th-list" },
            },
            {
                path: "leaveApprove",
                component: resolve => require(['../components/views/leave/leaveApprove'], resolve),
                name: "leaveApprove",
                hidden: false,
                meta: { title: '留案一级审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "leaveApprove2",
                component: resolve => require(['../components/views/leave/leaveApprove2'], resolve),
                name: "leaveApprove2",
                hidden: false,
                meta: { title: '留案二级审批', iconCls: "fa fa-th-list" },
            },
            {
                path: "leaveApplyHistory",
                component: resolve => require(['../components/views/leave/leaveApplyHistory'], resolve),
                name: "leaveApplyHistory",
                hidden: false,
                meta: { title: '留案历史记录', iconCls: "fa fa-th-list" },
            },
        ]
    },
];

export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

export const asyncRouterMap = [{
        path: "/",
        component: Home,
        name: "HomeStatistics",
        hidden: false,
        dropdown: true,
        meta: { title: '个贷统计', iconCls: "fa fa-cog" },
        children: [{
                path: "/bigarea",
                component: resolve => require(['../components/performance/BigAreaView'], resolve),
                name: "BigAreaPF",
                hidden: false,
                dropdown: false,
                meta: { title: '事业部业绩', iconCls: "fa fa-table" }
            },
            {
                path: "/area",
                component: resolve => require(['../components/performance/AreaView'], resolve),
                name: "AreaPF",
                hidden: false,
                dropdown: false,
                meta: { title: '大区业绩', iconCls: "fa fa-table" }
            },
            {
                path: "/cityPerformance",
                component: resolve => require(['../components/performance/CityView'], resolve),
                name: "CityStatistics",
                hidden: false,
                dropdown: false,
                meta: { title: '分部业绩', iconCls: "fa fa-table" }
            },
            {
                path: "/storePerformance",
                component: resolve => require(['../components/performance/StoreView'], resolve),
                name: "StoreStatistics",
                hidden: false,
                dropdown: false,
                meta: { title: '门店业绩', iconCls: "fa fa-table" }
            }, {
                path: "/teamPerformance",
                component: resolve => require(['../components/performance/TeamView'], resolve),
                name: "TeamStatistics",
                hidden: false,
                dropdown: false,
                meta: { title: '团队业绩', iconCls: "fa fa-table" }
            }, {
                path: "/personPerformance",
                component: resolve => require(['../components/performance/PersonalView'], resolve),
                name: "TeamStatistics",
                hidden: false,
                dropdown: false,
                meta: { title: '个人业绩', iconCls: "fa fa-table" }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'HomeApp',
        hidden: false,
        dropdown: true,
        meta: { title: '申请管理', iconCls: 'fa fa-database' },
        children: [{
                path: "/apply",
                component: resolve => require(['../components/apply/ApplyListView'], resolve),
                name: "ApplyListView",
                hidden: false,
                meta: { title: '进件申请', iconCls: 'fa fa-table' }
            },
            {
                path: "/createapply",
                component: resolve => require(['../components/apply/CreateApply'], resolve),
                name: "CreateApply",
                hidden: true,
                meta: { title: '添加申请' }
            },
            {
                path: "/updateapply/:applyId",
                component: resolve => require(['../components/apply/UpdateApply'], resolve),
                name: "UpdateApply",
                hidden: true,
                meta: { title: '修改申请' }
            },
            {
                path: "/applydetails/:applyId",
                component: resolve => require(['../components/apply/Details'], resolve),
                name: "SubmitApply",
                hidden: true,
                meta: { title: '申请详情' }
            },
            {
                path: "/applyaudit/:applyId",
                component: resolve => require(['../components/apply/Audit'], resolve),
                name: "SubmitApply",
                hidden: true,
                meta: { title: '提交申请' }
            },
            {
                path: "/qccheck",
                name: "QcCheck",
                component: resolve => require(['../components/qccheck/QcCheck'], resolve),
                hidden: false,
                dropdown: false,
                meta: { title: '质检复核', iconCls: 'fa fa-calendar-check-o' }
            },
            {
                path: "/qcaudit/:applyId",
                component: resolve => require(['../components/qccheck/Audit'], resolve),
                name: "QcAudit",
                hidden: true,
                dropdown: false,
                meta: { title: '质检审核' }
            },
            {
                path: "/qcdetails/:applyId",
                component: resolve => require(['../components/qccheck/Details'], resolve),
                name: "QcDetails",
                hidden: true,
                dropdown: false,
                meta: { title: '质检详情' }
            },
            {
                path: "/making",
                component: resolve => require(['../components/making/Making'], resolve),
                name: "MakingList",
                hidden: false,
                meta: { title: '合同管理', iconCls: 'fa fa-american-sign-language-interpreting' }
            },
            {
                path: "/createcon/:applyId",
                component: resolve => require(['../components/making/Create'], resolve),
                name: "CreateCon",
                hidden: true,
                dropdown: false,
                meta: { title: '协议拟制' }
            },
            {
                path: "/submitcon/:applyId",
                component: resolve => require(['../components/making/SubmitContract'], resolve),
                name: "SubmitCon",
                hidden: true,
                dropdown: false,
                meta: { title: '提交审核' }
            },
            {
                path: "/detail/:applyId",
                component: resolve => require(['../components/making/Detail'], resolve),
                name: "ConDetail",
                hidden: true,
                dropdown: false,
                meta: { title: '合同详情' }
            },
            {
                path: "/review",
                component: resolve => require(['../components/review/Review'], resolve),
                name: "ReviewApplyList",
                hidden: false,
                meta: { title: '复议申请', iconCls: 'fa fa-american-sign-language-interpreting' }
            },
            {
                path: "/detailView/:applyId",
                component: resolve => require(['../components/review/Detail'], resolve),
                name: "ReviewDetails",
                hidden: true,
                dropdown: false,
                meta: { title: '复议详情' }
            },
            {
                path: "/supplement",
                name: "SupplementList",
                component: resolve => require(['../components/supplement/SupplementView'], resolve),
                hidden: false,
                dropdown: false,
                meta: { title: '补充资料', iconCls: "fa fa-table" }
            },
            {
                path: "/supplementupdate/:applyId",
                component: resolve => require(['../components/supplement/SupplementUpdate'], resolve),
                name: "Supplement",
                hidden: true,
                meta: { title: '修改资料' }
            },
            {
                path: "/submitsupplement/:applyId",
                component: resolve => require(['../components/supplement/Audit'], resolve),
                name: "SupplementSubmit",
                hidden: true,
                meta: { title: '提交资料' }
            },
            {
                path: "/detailsupplement/:applyId",
                component: resolve => require(['../components/supplement/Details'], resolve),
                name: "SupplementSubmit",
                hidden: true,
                meta: { title: '资料详情' }
            }
        ]
    }, {
        path: '/',
        component: Home,
        name: 'HomeInten',
        hidden: false,
        dropdown: true,
        redirect: "/main",
        meta: { title: '咨询管理', iconCls: "fa fa-comments-o" },
        children: [{
                path: "/intention",
                component: resolve => require(['../components/intention/Intention'], resolve),
                name: "Intention",
                hidden: false,
                meta: { title: '咨询管理', iconCls: "fa fa-comment-o" },
            },
            {
                path: "/applyCheck",
                component: resolve => require(['../components/applyCheck/ApplyCheck'], resolve),
                name: "ApplyCheck",
                hidden: false,
                meta: { title: '进件管理', iconCls: "fa fa-comment-o" },
            }
        ]
    },
    {
        path: "/",
        component: Home,
        name: "HomeSys",
        hidden: false,
        dropdown: true,
        meta: { title: '系统管理', iconCls: "fa fa-cog" },
        children: [{
                path: "/emp",
                component: resolve => require(['../components/emp/EmpNew'], resolve),
                name: "Emp",
                hidden: false,
                dropdown: false,
                meta: { title: '员工管理', iconCls: "fa fa-user-circle-o" }
            },
            {
                path: "/role",
                component: resolve => require(['../components/role/Role'], resolve),
                name: "Role",
                hidden: false,
                dropdown: false,
                meta: { title: '角色管理', iconCls: "fa fa-user-circle" }
            },
            {
                path: "/resources",
                component: resolve => require(['../components/resources/Resources'], resolve),
                name: "Resources",
                hidden: false,
                dropdown: false,
                meta: { title: '资源管理', iconCls: "fa fa-map" }
            }
        ]
    },

    {
        path: "/",
        component: Home,
        name: "HomeSys",
        hidden: false,
        dropdown: true,
        meta: { title: '黑名单管理', iconCls: "fa fa-cog" },
        children: [{
                path: "/blackinfo",
                component: resolve => require(['../components/blackinfo/BlackInfo'], resolve),
                name: "Emp",
                hidden: false,
                dropdown: false,
                meta: { title: '黑名单', iconCls: "fa fa-user-circle-o" }
            },

        ]
    },
];