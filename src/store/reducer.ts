import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import tableReducer from './slices/table';

const reducer = combineReducers({
	auth: authReducer,
	table: tableReducer
});

export default reducer;
