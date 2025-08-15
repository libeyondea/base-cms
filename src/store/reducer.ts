import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import menuReducer from './slices/menu';
import tableReducer from './slices/table';

const reducer = combineReducers({
	auth: authReducer,
	menu: menuReducer,
	table: tableReducer
});

export default reducer;
