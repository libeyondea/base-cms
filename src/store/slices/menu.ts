import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InitialMenuState = {
	drawerOpen: boolean;
};

const initialState: InitialMenuState = {
	drawerOpen: false
};

const menu = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		openDrawer: (state, action: PayloadAction<boolean>) => {
			state.drawerOpen = action.payload;
		}
	}
});

export const { openDrawer } = menu.actions;

export default menu.reducer;
