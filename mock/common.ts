import { Request, Response } from 'express'

const selectList: any[] = [
	{ id: 666, state: 0, name: '审核失败' },
	{ id: 888, state: 1, name: '审核成功' },
	{ id: 999, state: 2, name: '提现成功' },
]

const switch_value = 1

export const getSwitch = (req: Request, res: Response) => res.json({
	code: 200,
	data: switch_value,
	message: '操作成功'
})

export const getSelectLists = (req: Request, res: Response) => res.json({
	code: 200,
	data: selectList,
	message: '操作成功'
})
