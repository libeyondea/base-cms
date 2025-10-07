import { AppProvider, Toastify } from '@libeyondea/base-cms';

import Routes from './routes';

const App = () => {
	return (
		<AppProvider>
			<Routes />
			<Toastify />
		</AppProvider>
	);
};

export default App;
