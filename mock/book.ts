import faker from 'faker'
import { Request, Response } from 'express'

const adList: any = []
const adListCount = 100

for (let i = 0; i < adListCount; i++) {
	adList.push({
		id: i,
		ad_platform: faker.random.number({ min: 0, max: 1 }),
		pid: faker.random.number({ min: 10000, max: 19000 }),
		state: faker.random.number({ min: 0, max: 1 }),
		created_at: faker.date.past().getTime(),
		sort: faker.random.number({ min: 1, max: 3 }),
		page_type: faker.name.findName(),
	})
}

export const getList = (req: Request, res: Response) => {
	const { id, pid, state, page_type, ad_platform, page = 1, limit = 20, sort } = req.query

	// @ts-ignore
	let mockList: any = adList.filter(item => {
		if (id && item.id.indexOf(id) < 0) return false
		if (pid && item.pid.indexOf(pid) < 0) return false
		if (state && item.state != state) return false
		if (ad_platform && item.ad_platform != ad_platform) return false
		if (page_type && item.page_type.indexOf(page_type) < 0) return false
		return true
	})

	if (sort === 'id') {
		mockList = mockList.reverse()
	}

	// @ts-ignore
	const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

	return res.json({
		code: 200,
		data: {
			total: mockList.length,
			items: pageList
		}
	})
}

// 删除
export const del = (req: Request, res: Response) => res.json({
	code: 200,
	message: '删除成功'
})

// 新增
export const add = (req: Request, res: Response) => res.json({
	code: 200,
	message: '操作成功'
})

// 编辑
export const edit = (req: Request, res: Response) => res.json({
	code: 200,
	message: '操作成功'
})

// 变更状态
export const changeState = (req: Request, res: Response) => res.json({
	code: 200,
	message: '操作成功'
})
