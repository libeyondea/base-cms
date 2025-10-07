import { AppProvider, Toastify } from '@libeyondea/base-cms';
import { Provider } from 'react-redux';

import Routes from './routes';
import { store } from './store';

const App = () => {
	return (
		// <Provider store={store}>
		<AppProvider>
			<Routes />
			<Toastify />
		</AppProvider>
		// </Provider>
	);
};

export default App;
