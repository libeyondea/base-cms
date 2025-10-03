import { BaseService } from '~/service/core/baseService';

export default class AuthService extends BaseService {
	constructor() {
		super('');
	}

	signin = (payload: any) => {
		return this.create(payload, '/login');
	};

	signup = (payload: any) => {
		return this.create(payload, '/register');
	};

	signout = () => {
		return this.delete('/logout');
	};

	profile = (token: string) => {
		return this.getAll({}, '/profile', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	};
}
