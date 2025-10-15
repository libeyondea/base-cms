import { useEffect, useState } from 'react';

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
	const [hasError, setHasError] = useState(false);
	const [frozenImageUrl, setFrozenImageUrl] = useState<string | undefined>(undefined);
	const [frozenTitle, setFrozenTitle] = useState<string | undefined>(undefined);
	const defaultSrc = '/images/camera.svg';
	const computedSrc = hasError ? defaultSrc : currentImage.path || defaultSrc;

	useEffect(() => {
		// Reset error state when image path changes
		setHasError(false);
	}, [currentImage.path]);

	const handleOpenImage = () => {
		if (currentImage.path && !hasError) {
			// Freeze current url/title to avoid switching when list updates
			setFrozenImageUrl(currentImage.path);
			setFrozenTitle(currentImage.title);
			setImageModalOpen(true);
		}
	};

	return (
		<>
			<MuiAvatar
				src={computedSrc}
				sx={{
					width: size,
					height: size,
					cursor: currentImage.path && !hasError ? 'pointer' : 'default',
					'&:hover':
						currentImage.path && !hasError
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
				onError={() => setHasError(true)}
				variant="square"
			/>

			{/* Image Modal */}
			{frozenImageUrl && <AvatarModal open={imageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={frozenImageUrl} title={frozenTitle} />}
		</>
	);
};
