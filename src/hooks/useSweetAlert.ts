import { useCallback } from 'react';

import Swal, { SweetAlertOptions } from 'sweetalert2';

export type ConfirmOptions = SweetAlertOptions & {
	onConfirm?: () => void | Promise<void>;
	onCancel?: () => void;
	onDeny?: () => void;
};

export type DeleteConfirmOptions = ConfirmOptions & {
	itemName?: string;
	itemType?: string;
};

const useSweetAlert = () => {
	// Success alert
	const showSuccess = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string' ? { title: 'Thành công!', text: options, icon: 'success' } : { title: 'Thành công!', icon: 'success', ...options };

		return Swal.fire(config);
	}, []);

	// Error alert
	const showError = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string' ? { title: 'Lỗi!', text: options, icon: 'error' } : { title: 'Lỗi!', icon: 'error', ...options };

		return Swal.fire(config);
	}, []);

	// Warning alert
	const showWarning = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string' ? { title: 'Cảnh báo!', text: options, icon: 'warning' } : { title: 'Cảnh báo!', icon: 'warning', ...options };

		return Swal.fire(config);
	}, []);

	// Info alert
	const showInfo = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string' ? { title: 'Thông tin', text: options, icon: 'info' } : { title: 'Thông tin', icon: 'info', ...options };

		return Swal.fire(config);
	}, []);

	// Question alert
	const showQuestion = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string' ? { title: 'Câu hỏi', text: options, icon: 'question' } : { title: 'Câu hỏi', icon: 'question', ...options };

		return Swal.fire(config);
	}, []);

	// Confirmation dialog
	const showConfirm = useCallback(async (options: ConfirmOptions | string) => {
		const config: ConfirmOptions =
			typeof options === 'string'
				? {
						title: 'Xác nhận',
						text: options,
						icon: 'question',
						showCancelButton: true,
						confirmButtonText: 'Xác nhận',
						cancelButtonText: 'Hủy'
					}
				: {
						title: 'Xác nhận',
						icon: 'question',
						showCancelButton: true,
						confirmButtonText: 'Xác nhận',
						cancelButtonText: 'Hủy',
						...options
					};

		const result = await Swal.fire(config);

		if (result.isConfirmed && config.onConfirm) {
			await config.onConfirm();
		} else if (result.isDenied && config.onDeny) {
			config.onDeny();
		} else if (result.isDismissed && config.onCancel) {
			config.onCancel();
		}

		return result;
	}, []);

	// Delete confirmation dialog
	const showDeleteConfirm = useCallback(async (options: DeleteConfirmOptions | string) => {
		const config: DeleteConfirmOptions =
			typeof options === 'string'
				? {
						title: 'Xác nhận xóa',
						text: `Bạn có chắc chắn muốn xóa "${options}"?`,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Xóa',
						cancelButtonText: 'Hủy',
						confirmButtonColor: '#d33',
						cancelButtonColor: '#3085d6'
					}
				: {
						title: 'Xác nhận xóa',
						text: `Bạn có chắc chắn muốn xóa ${options.itemType || 'mục'} "${options.itemName || 'này'}"?`,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Xóa',
						cancelButtonText: 'Hủy',
						confirmButtonColor: '#d33',
						cancelButtonColor: '#3085d6',
						...options
					};

		const result = await Swal.fire(config);

		if (result.isConfirmed && config.onConfirm) {
			await config.onConfirm();
		} else if (result.isDenied && config.onDeny) {
			config.onDeny();
		} else if (result.isDismissed && config.onCancel) {
			config.onCancel();
		}

		return result;
	}, []);

	// Input dialog
	const showInput = useCallback(async (options: SweetAlertOptions & { inputValue?: string; inputPlaceholder?: string }) => {
		const config: SweetAlertOptions = {
			title: 'Nhập thông tin',
			icon: 'question',
			input: 'text' as const,
			inputPlaceholder: 'Nhập thông tin...',
			showCancelButton: true,
			confirmButtonText: 'Xác nhận',
			cancelButtonText: 'Hủy',
			...options
		};

		return Swal.fire(config);
	}, []);

	// Loading dialog
	const showLoading = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string'
				? {
						title: options,
						allowOutsideClick: false,
						didOpen: () => {
							Swal.showLoading();
						}
					}
				: {
						allowOutsideClick: false,
						didOpen: () => {
							Swal.showLoading();
						},
						...options
					};

		return Swal.fire(config);
	}, []);

	// Close any open dialog
	const close = useCallback(() => {
		Swal.close();
	}, []);

	// Toast notification
	const showToast = useCallback((options: SweetAlertOptions | string) => {
		const config: SweetAlertOptions =
			typeof options === 'string'
				? {
						text: options,
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true
					}
				: {
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
						...options
					};

		return Swal.fire(config);
	}, []);

	return {
		showSuccess,
		showError,
		showWarning,
		showInfo,
		showQuestion,
		showConfirm,
		showDeleteConfirm,
		showInput,
		showLoading,
		showToast,
		close,
		// Raw Swal instance for advanced usage
		Swal
	};
};

export default useSweetAlert;
