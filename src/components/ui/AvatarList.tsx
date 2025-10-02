import { useState } from 'react';

import { Avatar, SxProps } from '@mui/material';

import ImageModal from './ImageModal';

interface AvatarListProps {
	currentImage: {
		path?: string;
		title?: string;
	};
	size?: number;
	sx?: SxProps;
}

const AvatarList: React.FC<AvatarListProps> = ({ currentImage, size = 100, sx }) => {
	const [imageModalOpen, setImageModalOpen] = useState(false);

	const handleOpenImage = () => {
		if (currentImage.path) {
			setImageModalOpen(true);
		}
	};

	return (
		<>
			<Avatar
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
				<ImageModal open={imageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={currentImage.path} title={currentImage.title} />
			)}
		</>
	);
};

export default AvatarList;
