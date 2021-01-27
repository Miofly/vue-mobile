import faker from 'faker'
import { Request, Response } from 'express'

faker.locale = 'zh_CN'

const dataList: any[] = {
	id: faker.random.number(10),
	avatar: faker.image.image(),
	name: faker.name.findName(),
	
	zipCode: faker.address.zipCode(),
	mobile: faker.phone.phoneNumberFormat(),
	city: faker.address.city(),
	country: faker.address.country(),
	latitude: faker.address.latitude(),
	longitude: faker.address.longitude(),
	color: faker.commerce.color(),
	created_at: faker.date.past(),
	updated_at: faker.date.recent(),
	title: faker.lorem.sentence(6, 10),
	content: faker.lorem.sentences(2),
	status: faker.random.boolean(),
	state: faker.random.number(2),
	images: [faker.image.image(), faker.image.image(), faker.image.image()],
	timestamp: faker.date.past().getTime(),
	author: faker.name.findName(),
	reviewer: faker.name.findName(),
	type: faker.random.arrayElement(['CN', 'US', 'JP', 'EU']),
	pageviews: faker.random.number({ min: 300, max: 500 })
}

export const getList = (req: Request, res: Response) => res.json({
	code: 200,
	data: dataList,
	message: '操作成功'
})
