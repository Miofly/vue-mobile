import faker from 'faker'
import { Request, Response } from 'express'

const userList: any[] = [
	{
		id: 0,
		username: 'admin',
		password: 'any',
		name: 'Super Admin',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		introduction: 'I am a super administrator',
		email: 'admin@test.com',
		phone: '1234567890',
		roles: ['admin'],
	},
	{
		id: 1,
		username: 'editor',
		password: 'any',
		name: 'Normal Editor',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		introduction: 'I am an editor',
		email: 'editor@test.com',
		phone: '1234567890',
		roles: ['editor'],
	}
]
