import { Box, Typography } from '@mui/material';
import { ToastContainer as ReactToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Toast Content Component
const ToastContent = ({ message }: { message: string }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
			<Typography variant="body1">{message}</Typography>
		</Box>
	);
};

// Default toast options
const defaultOptions: ToastOptions = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: true,
	progress: undefined
};

// Toast utility functions
export const showToast = {
	success: (message: string, options?: ToastOptions) => {
		return toast.success(<ToastContent message={message || 'Thành công'} />, { ...defaultOptions, ...options });
	},
	error: (message: string, options?: ToastOptions) => {
		return toast.error(<ToastContent message={message || 'Lỗi'} />, { ...defaultOptions, ...options });
	},
	info: (message: string, options?: ToastOptions) => {
		return toast.info(<ToastContent message={message || 'Thông tin'} />, { ...defaultOptions, ...options });
	},
	warning: (message: string, options?: ToastOptions) => {
		return toast.warning(<ToastContent message={message || 'Cảnh báo'} />, { ...defaultOptions, ...options });
	}
};

// ToastContainer component
export const ToastContainer = () => <ReactToastContainer newestOnTop pauseOnFocusLoss />;

export default showToast;
