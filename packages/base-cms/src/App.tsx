import { Provider } from 'react-redux';

import Router from './Router';
import { Toastify } from './components/Toastify';
import { AppProvider } from './contexts/AppProvider';
import { store } from './store';

const App = () => {
	return (
		// <Provider store={store}>
		<AppProvider>
			<Router />
			<Toastify />
		</AppProvider>
		// </Provider>
	);
};

export default App;
