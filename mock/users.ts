import { Request, Response } from 'express'

const adminInfo = {
	forbidden: 1,
	id: 1,
	mobile: '18205622643',
	passwd: '',
	real_name: 'admin',
	role_id: 1,
	username: 'admin',
}

const auth_list = [
	{
		id: 106,
		auth_parent_id: 0,
		sort: 1,
		icon: 'icon-yundanjifei',
		auth_name: '图片管理',
		url: '',
		son: [
			{
				id: 107,
				auth_parent_id: 106,
				sort: 1,
				icon: '',
				auth_name: '图片管理',
				url: 'img',
				key: 'group107'
			}
		],
		key: 'group106'
	},
	{
		id: 108,
		auth_parent_id: 0,
		sort: 11,
		icon: 'icon-yonghuguanli1',
		auth_name: '订阅号管理',
		url: '',
		son: [
			{
				id: 109,
				auth_parent_id: 108,
				sort: 1,
				icon: '',
				auth_name: '订阅号管理',
				url: 'dyh',
				key: 'group109'
			}
		],
		key: 'group108'
	},
	{
		id: 83,
		auth_parent_id: 0,
		sort: 111,
		icon: 'icon-svgwrite',
		auth_name: '会员管理',
		url: '',
		son: [
			{
				id: 89,
				auth_parent_id: 83,
				sort: 1,
				icon: '',
				auth_name: '会员审核列表',
				url: 'member-list',
				key: 'group89'
			},
			{
				id: 88,
				auth_parent_id: 83,
				sort: 1,
				icon: '',
				auth_name: '会员列表',
				url: 'member',
				key: 'group88'
			},
			{
				id: 99,
				auth_parent_id: 83,
				sort: 3,
				icon: '',
				auth_name: '会员产品关联',
				url: 'manage',
				key: 'group99'
			}
		],
		key: 'group83'
	},
	{
		id: 84,
		auth_parent_id: 0,
		sort: 112,
		icon: 'icon-shouye',
		auth_name: '内容管理',
		url: '',
		son: [
			{
				id: 85,
				auth_parent_id: 84,
				sort: 1,
				icon: '',
				auth_name: '转发产品列表',
				url: 'article',
				key: 'group85'
			}
		],
		key: 'group84'
	},
	{
		id: 86,
		auth_parent_id: 0,
		sort: 113,
		icon: 'icon-Configurationmanage',
		auth_name: '配置管理',
		url: '',
		son: [
			{
				id: 87,
				auth_parent_id: 86,
				sort: 1,
				icon: '',
				auth_name: '配置详细信息',
				url: 'index-settings',
				key: 'group87'
			}
		],
		key: 'group86'
	},
	{
		id: 95,
		auth_parent_id: 0,
		sort: 114,
		icon: 'icon-yundanjifei',
		auth_name: '团队管理',
		url: '',
		son: [
			{
				id: 96,
				auth_parent_id: 95,
				sort: 1,
				icon: '',
				auth_name: '团队成员',
				url: 'team-member',
				key: 'group96'
			},
			{
				id: 97,
				auth_parent_id: 95,
				sort: 2,
				icon: '',
				auth_name: '团队点击列表',
				url: 'team-click',
				key: 'group97'
			},
			{
				id: 98,
				auth_parent_id: 95,
				sort: 3,
				icon: '',
				auth_name: '团队结算',
				url: 'team-settlement',
				key: 'group98'
			}
		],
		key: 'group95'
	},
	{
		id: 7,
		auth_parent_id: 0,
		sort: 115,
		icon: 'icon-guanliyuanguanli',
		auth_name: '后台管理',
		url: 'root_manage',
		son: [
			{
				id: 8,
				auth_parent_id: 7,
				sort: 1,
				icon: '',
				auth_name: '用户管理',
				url: 'account',
				key: 'group8'
			},
			{
				id: 9,
				auth_parent_id: 7,
				sort: 2,
				icon: '',
				auth_name: '角色管理',
				url: 'role',
				key: 'group9'
			},
			{
				id: 10,
				auth_parent_id: 7,
				sort: 3,
				icon: '',
				auth_name: '权限管理',
				url: 'auth',
				key: 'group10'
			}
		],
		key: 'group7'
	}
]

export const login = (req: Request, res: Response) => {
	const { username } = req.body
	if (adminInfo.username === username) {
		return res.json({
			code: 200,
			data: {
				authToken: '4fef5fe81c28ac77b602f5fb614b2f43',
				expire: 14400
			}
		})
	}
	return res.status(400).json({
		code: 400,
		messaege: '错误账号'
	})
}

export const getLoginInfo = (req: Request, res: Response) => res.json({
	code: 200,
	data: adminInfo
})

export const getAuthList = (req: Request, res: Response) => res.json({
	code: 200,
	data: {
		list: auth_list
	}
})
