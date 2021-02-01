import faker from 'faker'
import { Request, Response } from 'express'

const adList: any = []
const adListCount = 100

for (let i = 0; i < adListCount; i++) {
	adList.push({
		id: i,
		pid: faker.random.number({ min: 10000, max: 19000 }),
		state: faker.random.number({ min: 0, max: 1 }),
		created_at: faker.date.past().getTime(),
		sort: faker.random.number({ min: 1, max: 3 }),
		page_type: faker.name.findName(),
	})
}

export const getAdList = (req: Request, res: Response) => {
	const { id, pid, state, page_type, page = 1, limit = 20, sort } = req.query

	// @ts-ignore
	let mockList: any = adList.filter(item => {
		if (id && item.id.indexOf(id) < 0) return false
		if (pid && item.pid.indexOf(pid) < 0) return false
		if (state && item.state.indexOf(state) < 0) return false
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
