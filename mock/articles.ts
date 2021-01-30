import faker from 'faker'
import { Request, Response } from 'express'

const articleList: any[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

faker.locale = 'zh_CN'

for (let i = 0; i < articleCount; i++) {
	articleList.push({
		id: i,
		zipCode: faker.address.zipCode(),
		mobile: faker.phone.phoneNumberFormat(),
		city: faker.address.city(),
		country: faker.address.country(),
		latitude: faker.address.latitude(),
		longitude: faker.address.longitude(),
		color: faker.commerce.color(),
		name: faker.name.findName(),
		created_at: faker.date.past(),
		updated_at: faker.date.recent(),
		title: faker.lorem.sentence(6, 10),
		content: faker.lorem.sentences(2),
		fullContent: mockFullContent,
		image: faker.image.image(),
		status: faker.random.boolean(),
		state: faker.random.number(2),
		images: [faker.image.image(), faker.image.image(), faker.image.image()],
		timestamp: faker.date.past().getTime(),
		author: faker.name.findName(),
		reviewer: faker.name.findName(),
		type: faker.random.arrayElement(['CN', 'US', 'JP', 'EU']),
		pageviews: faker.random.number({ min: 300, max: 500 })
	})
}

export const getArticles = (req: Request, res: Response) => {
	const { importance, type, title, page = 1, per_page = 10, sort } = req.query

	let mockList = articleList.filter(item => {
		if (importance && item.importance !== Number(importance)) return false
		if (type && item.type !== type) return false
		if (title && item.title.indexOf(title as string) < 0) return false
		return true
	})

	if (sort === '-id') {
		mockList = mockList.reverse()
	}

	const pageList = mockList.filter((_, index) => index < (per_page as number) * (page as number) && index >= (per_page as number) * (page as number - 1))

	return res.json({
		code: 200,
		data: {
			total: mockList.length,
			items: pageList
		}
	})
}

export const getArticle = (req: Request, res: Response) => {
	const { id } = req.params
	for (const article of articleList) {
		if (article.id.toString() === id) {
			return res.json({
				code: 200,
				data: {
					article
				}
			})
		}
	}
	return res.json({
		code: 70001,
		message: 'Article not found'
	})
}

export const createArticle = (req: Request, res: Response) => {
	const { article } = req.body
	return res.json({
		code: 200,
		data: {
			article
		}
	})
}

export const updateArticle = (req: Request, res: Response) => {
	const { id } = req.params
	const { article } = req.body
	for (const v of articleList) {
		if (v.id.toString() === id) {
			return res.json({
				code: 200,
				data: {
					article
				}
			})
		}
	}
	return res.json({
		code: 70001,
		message: 'Article not found'
	})
}

export const deleteArticle = (req: Request, res: Response) => res.json({
	code: 200,
})

export const getPageviews = (req: Request, res: Response) => res.json({
	code: 200,
	data: {
		pageviews: [
			{ key: 'PC', pageviews: 1024 },
			{ key: 'Mobile', pageviews: 1024 },
			{ key: 'iOS', pageviews: 1024 },
			{ key: 'Android', pageviews: 1024 }
		]
	}
})
