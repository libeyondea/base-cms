import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InitialAuthState = {
	isAuthenticated?: boolean;
	isInitialized?: boolean;
	user?: any;
	token?: string | null;
};

const initialState: InitialAuthState = {
	isAuthenticated: false,
	isInitialized: false,
	user: null,
	token: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signup: (state, action: PayloadAction<{ user: any }>) => {
			state.user = action.payload.user;
		},
		signin: (state, action: PayloadAction<{ user: any; token: string }>) => {
			state.isAuthenticated = true;
			state.isInitialized = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		signout: (state) => {
			state.isInitialized = true;
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		}
	}
});

export const { signup, signin, signout } = authSlice.actions;

export default authSlice.reducer;
