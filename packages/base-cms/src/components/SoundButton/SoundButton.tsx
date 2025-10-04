import StopIcon from '@mui/icons-material/Stop';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton, Tooltip } from '@mui/material';

import { useAudioPlayer } from '~/hooks/useAudioPlayer';

interface SoundButtonProps {
	soundPath?: string;
	size?: 'small' | 'medium' | 'large';
}

export const SoundButton = ({ soundPath, size = 'medium' }: SoundButtonProps) => {
	const { play, stop, isPlaying } = useAudioPlayer();

	const handleSound = () => {
		if (isPlaying) {
			stop();
			return;
		}

		if (soundPath) {
			play(soundPath);
		}
	};

	const isDisabled = !soundPath;

	return (
		<Tooltip title={isDisabled ? 'Không có âm thanh' : isPlaying ? 'Dừng' : 'Nghe thử'} placement="top" arrow>
			<span>
				<IconButton onClick={handleSound} size={size} disabled={isDisabled}>
					{isDisabled ? <VolumeOffIcon color="disabled" /> : isPlaying ? <StopIcon color="error" /> : <VolumeUpIcon color="primary" />}
				</IconButton>
			</span>
		</Tooltip>
	);
};
