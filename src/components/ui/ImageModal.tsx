import React, { useCallback, useEffect, useRef, useState } from 'react';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Backdrop, Box, CircularProgress, Fade, IconButton, Modal, Slider, Tooltip, Typography } from '@mui/material';

interface ImageModalProps {
	open: boolean;
	onClose: () => void;
	imageUrl: string;
	title?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, imageUrl, title }) => {
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [isEnhanced, setIsEnhanced] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const imageContainerRef = useRef<HTMLDivElement>(null);

	// Reset position and scale when the modal opens with a new image
	useEffect(() => {
		if (open) {
			setScale(1);
			setRotation(0);
			setPosition({ x: 0, y: 0 });
			setIsEnhanced(false);
			setUploadSuccess(false);
		}
	}, [open, imageUrl]);

	const handleZoomIn = useCallback(() => {
		setScale((prev) => Math.min(prev + 0.25, 3));
	}, []);

	const handleZoomOut = useCallback(() => {
		setScale((prev) => Math.max(prev - 0.25, 0.5));
	}, []);

	// Handle mouse wheel zoom
	const handleWheel = useCallback(
		(e: WheelEvent) => {
			e.preventDefault();

			// Calculate delta from wheel event
			const delta = e.deltaY * -0.01;
			const newScale = Math.min(Math.max(scale + delta, 0.5), 3);

			if (delta !== 0 && newScale !== scale && imageContainerRef.current) {
				const container = imageContainerRef.current;
				// Get container dimensions
				const rect = container.getBoundingClientRect();
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;

				// Calculate position relative to the center
				const centerX = mouseX - rect.width / 2;
				const centerY = mouseY - rect.height / 2;

				// Calculate how much the scale changed
				const scaleFactor = newScale / scale;

				// Calculate new position
				const newX = position.x + centerX * (1 - scaleFactor);
				const newY = position.y + centerY * (1 - scaleFactor);

				// Get image dimensions
				const image = container.querySelector('img') as HTMLImageElement;
				if (!image) return;

				const imageWidth = image.naturalWidth * newScale;
				const imageHeight = image.naturalHeight * newScale;

				// Calculate the boundaries
				const maxX = Math.max(imageWidth - rect.width, 0) / 2;
				const maxY = Math.max(imageHeight - rect.height, 0) / 2;

				// Constrain the position
				const constrainedX = Math.min(Math.max(newX, -maxX), maxX);
				const constrainedY = Math.min(Math.max(newY, -maxY), maxY);

				// Update position to zoom centered on mouse cursor with constraints
				setPosition({
					x: constrainedX,
					y: constrainedY
				});

				// Update scale
				setScale(newScale);
			}
		},
		[scale, position]
	);

	// Attach wheel event listener with { passive: false }
	useEffect(() => {
		const container = imageContainerRef.current;
		if (container && open) {
			container.addEventListener('wheel', handleWheel, { passive: false });
		}

		return () => {
			if (container) {
				container.removeEventListener('wheel', handleWheel);
			}
		};
	}, [open, handleWheel]);

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setScale(newValue as number);
	};

	const handleRotateLeft = useCallback(() => {
		setRotation((prev) => prev - 90);
	}, []);

	const handleRotateRight = useCallback(() => {
		setRotation((prev) => prev + 90);
	}, []);

	const handleDownload = useCallback(() => {
		const link = document.createElement('a');
		link.href = imageUrl;
		link.download = title || 'image';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [imageUrl, title]);

	const handleEnhanceImage = useCallback(() => {
		setIsEnhanced((prev) => !prev);
	}, []);

	const handleUploadForAI = useCallback(() => {
		setIsUploading(true);
		setUploadSuccess(false);

		// Simulate API call to upload image to AI training storage
		setTimeout(() => {
			setIsUploading(false);
			setUploadSuccess(true);

			// Reset success indicator after 3 seconds
			setTimeout(() => {
				setUploadSuccess(false);
			}, 3000);
		}, 1500);

		// TODO: Implement actual API call to upload image
		// Example:
		// fetch('/api/ai-training/upload', {
		//   method: 'POST',
		//   body: JSON.stringify({ imageUrl }),
		//   headers: {
		//     'Content-Type': 'application/json'
		//   }
		// })
		//   .then(response => response.json())
		//   .then(data => {
		//     setIsUploading(false);
		//     setUploadSuccess(true);
		//     setTimeout(() => setUploadSuccess(false), 3000);
		//   })
		//   .catch(error => {
		//     setIsUploading(false);
		//     console.error('Error uploading image:', error);
		//   });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageUrl]);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!open) return;

			switch (e.key) {
				case '+':
				case '=': // Same key on most keyboards
					e.preventDefault();
					handleZoomIn();
					break;
				case '-':
				case '_': // Same key on most keyboards
					e.preventDefault();
					handleZoomOut();
					break;
				case 'ArrowLeft':
					e.preventDefault();
					handleRotateLeft();
					break;
				case 'ArrowRight':
					e.preventDefault();
					handleRotateRight();
					break;
				case 'e':
				case 'E':
					e.preventDefault();
					handleEnhanceImage();
					break;
				case 'u':
				case 'U':
					e.preventDefault();
					if (!isUploading && !uploadSuccess) handleUploadForAI();
					break;
				case 'd':
				case 'D':
					e.preventDefault();
					handleDownload();
					break;
				case 'Escape':
					e.preventDefault();
					onClose();
					break;
				default:
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [
		open,
		handleZoomIn,
		handleZoomOut,
		handleRotateLeft,
		handleRotateRight,
		handleEnhanceImage,
		handleUploadForAI,
		handleDownload,
		isUploading,
		uploadSuccess,
		onClose
	]);

	// Mouse event handlers for dragging
	const handleMouseDown = (e: React.MouseEvent) => {
		// Only enable dragging with middle mouse button (wheel click) - button 1
		if (e.button !== 1) return;

		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y
		});
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging) {
			// Calculate new position
			const newX = e.clientX - dragStart.x;
			const newY = e.clientY - dragStart.y;

			// Get container dimensions
			const container = e.currentTarget as HTMLElement;
			const containerRect = container.getBoundingClientRect();

			// Get image dimensions
			const image = container.querySelector('img') as HTMLImageElement;
			if (!image) return;

			const imageWidth = image.naturalWidth * scale;
			const imageHeight = image.naturalHeight * scale;

			// Calculate the boundaries
			// For images larger than container, limit dragging to keep image within view
			// For images smaller than container, limit dragging to keep image within container
			const maxX = Math.max(imageWidth - containerRect.width, 0) / 2;
			const maxY = Math.max(imageHeight - containerRect.height, 0) / 2;

			// Constrain the position
			const constrainedX = Math.min(Math.max(newX, -maxX), maxX);
			const constrainedY = Math.min(Math.max(newY, -maxY), maxY);

			setPosition({
				x: constrainedX,
				y: constrainedY
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// Touch event handlers for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		if (e.touches.length === 1) {
			setIsDragging(true);
			setDragStart({
				x: e.touches[0].clientX - position.x,
				y: e.touches[0].clientY - position.y
			});
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (isDragging && e.touches.length === 1) {
			// Calculate new position
			const newX = e.touches[0].clientX - dragStart.x;
			const newY = e.touches[0].clientY - dragStart.y;

			// Get container dimensions
			const container = e.currentTarget as HTMLElement;
			const containerRect = container.getBoundingClientRect();

			// Get image dimensions
			const image = container.querySelector('img') as HTMLImageElement;
			if (!image) return;

			const imageWidth = image.naturalWidth * scale;
			const imageHeight = image.naturalHeight * scale;

			// Calculate the boundaries
			const maxX = Math.max(imageWidth - containerRect.width, 0) / 2;
			const maxY = Math.max(imageHeight - containerRect.height, 0) / 2;

			// Constrain the position
			const constrainedX = Math.min(Math.max(newX, -maxX), maxX);
			const constrainedY = Math.min(Math.max(newY, -maxY), maxY);

			setPosition({
				x: constrainedX,
				y: constrainedY
			});
		}
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
	};

	// Constrain position within bounds whenever scale changes
	useEffect(() => {
		// Only run when modal is open
		if (!open) return;

		// Use a small timeout to ensure the DOM is updated
		const timer = setTimeout(() => {
			// Get image and container after rendering
			const container = document.querySelector('.image-modal-container') as HTMLElement;
			const image = container?.querySelector('img') as HTMLImageElement;

			if (!container || !image || !image.complete) return;

			// Calculate constraints after image is loaded
			const containerRect = container.getBoundingClientRect();

			const imageWidth = image.naturalWidth * scale;
			const imageHeight = image.naturalHeight * scale;

			// Calculate the boundaries
			const maxX = Math.max(imageWidth - containerRect.width, 0) / 2;
			const maxY = Math.max(imageHeight - containerRect.height, 0) / 2;

			// Constrain current position
			const constrainedX = Math.min(Math.max(position.x, -maxX), maxX);
			const constrainedY = Math.min(Math.max(position.y, -maxY), maxY);

			// Only update if position needs to be constrained
			if (constrainedX !== position.x || constrainedY !== position.y) {
				setPosition({
					x: constrainedX,
					y: constrainedY
				});
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [open, scale, rotation, position]);

	return (
		<Modal
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{
				backdrop: Backdrop
			}}
			slotProps={{
				backdrop: {
					timeout: 500,
					style: { backgroundColor: 'rgba(0, 0, 0, 0.85)' }
				}
			}}
		>
			<Fade in={open}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '90%',
						maxWidth: '1000px',
						maxHeight: '90vh',
						bgcolor: 'transparent',
						boxShadow: 24,
						p: 0,
						outline: 'none',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					{/* Header with title and controls */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							p: 2,
							bgcolor: 'rgba(0, 0, 0, 0.7)',
							color: 'white',
							borderTopLeftRadius: 4,
							borderTopRightRadius: 4
						}}
					>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
							{title || 'Xem ảnh'}
						</Typography>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Tooltip title="Tải ảnh xuống">
								<IconButton size="small" onClick={handleDownload} sx={{ color: 'white' }}>
									<DownloadIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title={uploadSuccess ? 'Đã tải lên thành công' : 'Tải lên kho lưu trữ'}>
								<span>
									<IconButton
										size="small"
										onClick={handleUploadForAI}
										disabled={isUploading || uploadSuccess}
										sx={{
											color: 'white'
										}}
									>
										{isUploading ? (
											<CircularProgress size={24} sx={{ color: 'white' }} />
										) : uploadSuccess ? (
											<CheckCircleIcon sx={{ color: 'white' }} />
										) : (
											<CloudUploadIcon />
										)}
									</IconButton>
								</span>
							</Tooltip>
							<Tooltip title="Đóng">
								<IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
									<CloseIcon />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>

					{/* Image container */}
					<Box
						ref={imageContainerRef}
						className="image-modal-container"
						sx={{
							position: 'relative',
							overflow: 'hidden',
							height: '70vh',
							bgcolor: 'rgba(0, 0, 0, 0.5)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'default'
						}}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						{/* Actual image with transformations */}
						<Box
							component="img"
							src={imageUrl}
							alt={title || 'Image'}
							sx={{
								maxHeight: '100%',
								maxWidth: '100%',
								objectFit: 'contain',
								transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
								transition: isDragging ? 'none' : 'transform 0.2s',
								filter: isEnhanced ? 'contrast(120%) brightness(105%) saturate(110%)' : 'none'
							}}
							draggable={false}
						/>
					</Box>

					{/* Controls footer */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							p: 2,
							gap: 2,
							bgcolor: 'rgba(0, 0, 0, 0.7)',
							color: 'white',
							borderBottomLeftRadius: 4,
							borderBottomRightRadius: 4
						}}
					>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Tooltip title="Phóng to">
								<IconButton size="small" onClick={handleZoomIn} sx={{ color: 'white' }}>
									<ZoomInIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Thu nhỏ">
								<IconButton size="small" onClick={handleZoomOut} sx={{ color: 'white' }}>
									<ZoomOutIcon />
								</IconButton>
							</Tooltip>
						</Box>

						<Slider
							value={scale}
							min={0.5}
							max={3}
							step={0.1}
							onChange={handleSliderChange}
							sx={{
								color: 'primary.main',
								width: '100px',
								'& .MuiSlider-thumb': {
									width: 14,
									height: 14
								},
								'& .MuiSlider-track': {
									height: 3
								}
							}}
						/>

						<Box sx={{ display: 'flex', gap: 1 }}>
							<Tooltip title="Xoay trái">
								<IconButton size="small" onClick={handleRotateLeft} sx={{ color: 'white' }}>
									<RotateLeftIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Xoay phải">
								<IconButton size="small" onClick={handleRotateRight} sx={{ color: 'white' }}>
									<RotateRightIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Làm rõ ảnh">
								<IconButton
									size="small"
									onClick={handleEnhanceImage}
									sx={{
										color: isEnhanced ? 'primary.main' : 'white',
										backgroundColor: isEnhanced ? 'rgba(255,255,255,0.2)' : 'transparent'
									}}
								>
									<AutoFixHighIcon />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
};

export default ImageModal;
