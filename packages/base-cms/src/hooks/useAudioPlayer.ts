import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAudioPlayerReturn {
	play: (src?: string) => Promise<void>;
	pause: () => void;
	stop: () => void;
	isPlaying: boolean;
	setVolume: (volume: number) => void;
}

/**
 * Custom hook for audio playback functionality
 * @param defaultSrc - Default audio source
 * @returns Object with audio control functions and state
 */
export const useAudioPlayer = (defaultSrc?: string): UseAudioPlayerReturn => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const playPromiseRef = useRef<Promise<void> | null>(null);

	// Create audio element on mount
	useEffect(() => {
		audioRef.current = new Audio(defaultSrc || '');

		// Setup event listeners
		const audio = audioRef.current;

		const handleEnded = () => setIsPlaying(false);
		audio.addEventListener('ended', handleEnded);

		return () => {
			audio.removeEventListener('ended', handleEnded);
			audio.pause();
			audio.src = '';
		};
	}, [defaultSrc]);

	// Safely stop any current playback
	const safeStop = useCallback(async (): Promise<void> => {
		if (!audioRef.current) return;

		// Wait for any pending play operation to complete
		if (playPromiseRef.current) {
			try {
				await playPromiseRef.current;
			} catch (error) {
				// Ignore errors from previous play attempt
			}
			playPromiseRef.current = null;
		}

		// Now it's safe to pause
		audioRef.current.pause();
		setIsPlaying(false);
	}, []);

	// Play audio with optional new source
	const play = useCallback(
		async (src?: string): Promise<void> => {
			if (!audioRef.current) return;

			// Stop any current playback first
			await safeStop();

			// Set new source if provided
			if (src) {
				audioRef.current.src = src;
			}

			// Start new playback
			try {
				// Store the play promise to track its state
				playPromiseRef.current = audioRef.current.play();
				await playPromiseRef.current;
				setIsPlaying(true);
			} catch (error) {
				// Only log errors that aren't AbortError
				if (error instanceof DOMException && error.name === 'AbortError') {
					console.log('Play request was aborted, likely due to a new request');
				} else {
					console.error('Error playing audio:', error);
				}
			} finally {
				playPromiseRef.current = null;
			}
		},
		[safeStop]
	);

	// Pause audio
	const pause = useCallback(async (): Promise<void> => {
		await safeStop();
	}, [safeStop]);

	// Stop audio (pause and reset position)
	const stop = useCallback(async (): Promise<void> => {
		await safeStop();
		if (audioRef.current) {
			audioRef.current.currentTime = 0;
		}
	}, [safeStop]);

	// Set audio volume (0 to 1)
	const setVolume = useCallback((volume: number): void => {
		if (!audioRef.current) return;
		audioRef.current.volume = Math.max(0, Math.min(1, volume));
	}, []);

	return {
		play,
		pause,
		stop,
		isPlaying,
		setVolume
	};
};
