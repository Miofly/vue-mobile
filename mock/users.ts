import { Request, Response } from 'express'

const adminInfo = {
	forbidden: 1,
	id: 1,
	mobile: '18205622643',
	passwd: '',
	real_name: 'admin',
	role_id: 1,
	username: 'admin',
	name: 'admin',
	avatar: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
	introduction: '1'
}

const auth_list = [
	{
		id: 1,
		name: '首页11',
		pid: 0,
		route: '',
		icon: 'iconhome',
		key: '1.00',
		created_at: '2019-05-30 13:05:04',
		updated_at: '2020-12-21 14:23:44',
		sub_permission: [
			{
				id: 1,
				name: '首页',
				pid: 1,
				route: 'home',
				icon: '',
				key: '0.00',
				created_at: '2019-05-30 13:06:18',
				updated_at: '2020-12-21 11:37:47'
			}
		]
	},
	{
		id: 2,
		name: '小程序',
		pid: 0,
		route: 'xcx',
		icon: 'iconxiaochengxu',
		key: '1.00',
		created_at: '2019-05-30 13:05:04',
		updated_at: '2020-12-21 14:23:44',
		sub_permission: [
			{
				id: 1,
				name: '大转盘',
				pid: 2,
				route: 'turntable',
				icon: '',
				key: '0.00',
				created_at: '2019-05-30 13:06:18',
				updated_at: '2020-12-21 11:37:47'
			}
		]
	},
	{
		id: 3,
		name: '权限设置',
		pid: 0,
		route: 'backend',
		icon: 'iconquanxian',
		key: '6.00',
		created_at: '2019-05-30 13:12:10',
		updated_at: '2020-03-24 13:46:42',
		sub_permission: [
			{
				id: 1,
				name: '管理员列表',
				pid: 3,
				route: 'administrator-list',
				icon: null,
				key: null,
				created_at: '2019-05-28 17:50:22',
				updated_at: '2020-02-12 16:46:42'
			},
			{
				id: 2,
				name: '角色管理',
				pid: 3,
				route: 'management-group-list',
				icon: '',
				key: '0.00',
				created_at: '2019-05-30 13:47:52',
				updated_at: '2020-03-24 14:07:08'
			},
			{
				id: 113,
				name: '权限管理',
				pid: 3,
				route: 'permissions-list',
				icon: '',
				key: '0.00',
				created_at: '2019-05-30 13:48:04',
				updated_at: '2020-02-12 16:46:25',
				sub_permission: [
					{
						id: 10,
						name: '大转盘',
						pid: 113,
						route: 'authOne',
						icon: '',
						key: '0.00',
						created_at: '2019-05-30 13:06:18',
						updated_at: '2020-12-21 11:37:47'
					}
				]
			}
		]
	},
]

// 登录接口
export const login = (req: Request, res: Response) => {
	console.log(req.body)
	const { username } = req.body
	if (adminInfo.username === username) {
		return res.json({
			code: 200,
			data: {
				access_token: '4fef5fe81c28ac77b602f5fb614b2f43',
				expire: 14400
			}
		})
	}
	return res.status(400).json({
		code: 400,
		messaege: '错误账号'
	})
}

// 用户信息接口
export const getLoginInfo = (req: Request, res: Response) => res.json({
	code: 200,
	data: adminInfo
})

// 用户权限接口
export const getAuthList = (req: Request, res: Response) => res.json({
	code: 200,
	data: {
		list: auth_list
	}
})
