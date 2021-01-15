import { Request, Response } from 'express'

const sign_in_datas: any = {
	config: {
		sign_in_nums: 2,
		reissue_nums: 0,
		balance: 9945145,
		week_nums: 313,
		continuous: true
	},
	signInStatusLists: [
		{
			coin: '20',
			status: 1,
			name: '已签到'
		},
		{
			coin: '30',
			status: 0,
			name: '未签到'
		},
		{
			coin: '30',
			status: 2,
			name: '已错过'
		},
		{
			coin: '30',
			status: 3,
			name: '点我补签'
		},
		{
			coin: '30',
			status: 0,
			name: '未签到'
		},
		{
			coin: '30',
			status: 0,
			name: '未签到'
		},
		{
			coin: '30',
			status: 0,
			name: '未签到'
		}
	]
}

export const getSignInData = (req: Request, res: Response) => res.json({
	code: 200,
	data: sign_in_datas,
	message: '操作成功'
})
