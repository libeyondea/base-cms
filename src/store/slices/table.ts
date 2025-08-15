import { createSlice } from '@reduxjs/toolkit';

export type InitialTableState = {
	filters: {
		[key: string]: {
			query: {
				[key: string]: string | number;
			};
		};
	};
};

const initialState: InitialTableState = {
	filters: {}
};

const table = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setFilterTable(state, action) {
			const { payload } = action;

			const isExistKey = Object.prototype.hasOwnProperty.call(state.filters, payload?.type);
			const query = payload?.value || {};

			if (isExistKey) {
				state.filters[payload.type] = {
					query: { ...state.filters[payload.type]?.query, ...query }
				};
			} else {
				state.filters[payload.type] = {
					query
				};
			}
		}
	}
});

export const { setFilterTable } = table.actions;

export default table.reducer;
