import { useState } from 'react';

import { Avatar as MuiAvatar, SxProps } from '@mui/material';

import { AvatarModal } from './AvatarModal';

interface AvatarProps {
	currentImage: {
		path?: string;
		title?: string;
	};
	size?: number;
	sx?: SxProps;
}

export const Avatar = ({ currentImage, size = 100, sx }: AvatarProps) => {
	const [imageModalOpen, setImageModalOpen] = useState(false);

	const handleOpenImage = () => {
		if (currentImage.path) {
			setImageModalOpen(true);
		}
	};

	return (
		<>
			<MuiAvatar
				src={`${currentImage.path}`}
				sx={{
					width: size,
					height: size,
					cursor: currentImage.path ? 'pointer' : 'default',
					'&:hover': currentImage.path
						? {
								// transform: 'scale(1.05)',
								boxShadow: '0 0 8px rgba(25, 118, 210, 0.5)',
								transition: 'all 0.2s ease-in-out'
							}
						: {},
					...sx
				}}
				onClick={(e) => {
					e.stopPropagation();
					handleOpenImage();
				}}
				variant="square"
			/>

			{/* Image Modal */}
			{currentImage.path && (
				<AvatarModal open={imageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={currentImage.path} title={currentImage.title} />
			)}
		</>
	);
};
