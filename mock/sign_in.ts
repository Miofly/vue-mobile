import { Request, Response } from 'express'

const sign_in_datas: any = {
	user: {
		nickname: '徐',
		money: '1305',
		headimgurl: 'http://thirdwx.qlogo.cn/mmopen/wbKdib81ny69kgwA0LCYD6NRBZJLz7kUXc5dKKe7V1VAkcyqsvG6KTmQcjWurlGCiaohsvHfeUa3ZOfEIHoLbv8g/132',
		current_stage_coin: '20',
		repair: '2',
		current_day: 6,
		allow_option: 0,
		gift: 1,
		checkin_days: 1
	},
	table: {
		1: {
			day: '1',
			is_repair: '0',
			checked: '1',
			coin: 20,
			model: 3
		},
		2: {
			day: '2',
			is_repair: '0',
			checked: '0',
			coin: 30,
			model: 1
		},
		3: {
			day: '3',
			is_repair: '0',
			checked: '0',
			coin: 40,
			model: 2
		},
		4: {
			day: '4',
			is_repair: '0',
			checked: '0',
			coin: 50,
			model: 2
		},
		5: {
			day: '5',
			is_repair: '0',
			checked: '0',
			coin: 50,
			model: 0
		},
		6: {
			day: '6',
			is_repair: '0',
			checked: '0',
			coin: 50,
			model: 0
		},
		7: {
			day: '7',
			is_repair: '0',
			checked: '0',
			coin: 50,
			model: 0
		}
	}
}

export const getSignInData = (req: Request, res: Response) => res.json({
	code: 200,
	data: sign_in_datas,
	message: '操作成功'
})
