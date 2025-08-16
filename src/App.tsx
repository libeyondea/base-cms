import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { ToastContainer } from './components/ui/CustomToast';
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
				<CssBaseline />
				<ToastContainer />
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<Routes />
				</LocalizationProvider>
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
