import { BaseService } from '~/service/core/baseService';
import { FilterObject } from '~/types/hook';

export default class UserService extends BaseService {
	constructor() {
		super('/user');
	}

	getAllUser = (params?: FilterObject) => {
		return this.getAll(params, '/users', {}, { isOtherUrl: true });
	};

	getDetailUser = (id?: number) => {
		return this.getById(id);
	};

	createUser = (payload: any) => {
		return this.create(payload);
	};

	updateUser = (payload: any) => {
		return this.update(payload.id, payload);
	};

	deleteUser = (id?: number) => {
		return this.delete(id);
	};
}
