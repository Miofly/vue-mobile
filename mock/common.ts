import { Request, Response } from 'express'

const selectList: any[] = [
	{ id: 666, state: 0, name: '审核失败' },
	{ id: 888, state: 1, name: '审核成功' },
	{ id: 999, state: 2, name: '提现成功' },
]

const video_random = [
	'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318214226685784.mp4',
	'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319104618910544.mp4',
	'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319125415785691.mp4',
	'http://vfx.mtime.cn/Video/2019/03/17/mp4/190317150237409904.mp4',
	'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314223540373995.mp4',
	'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4',
	'http://vfx.mtime.cn/Video/2019/03/13/mp4/190313094901111138.mp4',
	'http://vfx.mtime.cn/Video/2019/03/12/mp4/190312143927981075.mp4',
	'http://vfx.mtime.cn/Video/2019/03/12/mp4/190312083533415853.mp4',
	'http://vfx.mtime.cn/Video/2019/03/09/mp4/190309153658147087.mp4',
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
