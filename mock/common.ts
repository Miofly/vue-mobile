import { Request, Response } from 'express'

const selectList: any[] = [
	{ id: 666, name: '胡歌' },
	{ id: 888, name: '杨幂' },
	{ id: 999, name: '冯楠楠' },
]

export const getSelectLists = (req: Request, res: Response) => res.json({
	code: 200,
	data: selectList,
	message: '操作成功'
})
