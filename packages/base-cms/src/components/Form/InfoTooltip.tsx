import { Tooltip } from '@mui/material';

/**
 * Helper: Tạo label node có Tooltip nếu có `info`.
 * Khi hover vào label sẽ hiển thị thông tin mô tả.
 * Dùng cho các component truyền label vào MUI TextField / InputLabel.
 */
export const renderLabelWithInfo = (label?: string, info?: string): React.ReactNode | undefined => {
	if (!label) return undefined;
	if (!info) return label;

	return (
		<Tooltip
			title={info}
			placement="top"
			arrow
			slotProps={{
				tooltip: {
					sx: {
						fontSize: '13px',
						maxWidth: 300,
						padding: '8px 12px'
					}
				}
			}}
		>
			<span style={{ cursor: 'help' }}>{label}</span>
		</Tooltip>
	);
};
