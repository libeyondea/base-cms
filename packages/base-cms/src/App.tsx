import { Provider } from 'react-redux';

import { Toastify } from './components/Toastify';
import { AppProvider } from './contexts/AppProvider';
import Routes from './routes';
import { store } from './store';

const App = () => {
	return (
		<Provider store={store}>
			<AppProvider>
				<Routes />
				<Toastify />
			</AppProvider>
		</Provider>
	);
};

export default App;
