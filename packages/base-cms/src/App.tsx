import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { ToastContainer } from './components/ui/CustomToast';
import { AppProvider } from './contexts/AppProvider';
import Routes from './routes';
import { store } from './store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false
		}
	}
});

const App = () => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<Routes />
					<ToastContainer />
				</AppProvider>
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
