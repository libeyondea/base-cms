import { useMemo } from 'react';

import { Chip, ChipProps, alpha } from '@mui/material';

import { isLightColor } from '~/utils/color';

interface ItemChip {
	id: number | string;
	name: string;
	color?: string;
}

interface StatusChipProps {
	label?: string;
	color?: string;
	value?: number | string;
	data?: ItemChip[];
	size?: ChipProps['size'];
	variant?: ChipProps['variant'];
	endLabel?: React.ReactNode;
}

export const StatusChip = ({ value, label, color, data = [], size = 'small', variant = 'filled', endLabel }: StatusChipProps) => {
	const item = useMemo(() => data.find((chip) => String(chip?.id) === String(value)), [data, value]);
	const chipColor = item?.color || color || '#888';

	const chipStyles = useMemo(() => {
		if (variant === 'filled') {
			const textColor = isLightColor(chipColor) ? '#000' : '#fff';
			return {
				color: textColor,
				backgroundColor: chipColor,
				'&:hover': {
					backgroundColor: alpha(chipColor, 0.8),
					boxShadow: `0px 0px 6px ${alpha(chipColor, 0.5)}`
				}
			};
		} else {
			return {
				color: chipColor,
				border: `1px solid ${chipColor}`,
				backgroundColor: 'transparent',
				'&:hover': {
					backgroundColor: alpha(chipColor, 0.12)
				}
			};
		}
	}, [chipColor, variant]);

	const itemName = item?.name || 'N/A';

	const displayLabel = label || (endLabel ? `${itemName}${endLabel}` : itemName);

	return (
		<Chip
			variant={variant}
			size={size}
			label={displayLabel}
			sx={{
				fontWeight: 600,
				minWidth: '84px',
				transition: 'all 0.3s ease',
				...chipStyles
			}}
		/>
	);
};
