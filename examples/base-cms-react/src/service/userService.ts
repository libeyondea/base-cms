import { BaseService } from '@libeyondea/base-cms';

import { FilterObject } from '~/types/hook';

export class UserService extends BaseService {
	constructor() {
		super('/kiosks');
	}

	getAllUser = (params?: FilterObject) => {
		return this.getAll(params);
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
