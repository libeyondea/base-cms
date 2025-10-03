import { Tooltip, Typography, TypographyProps } from '@mui/material';

interface TruncatedTextProps extends Omit<TypographyProps, 'children'> {
	text: any;
	maxLength?: number;
}

const TruncatedText = ({ text, maxLength = 30, ...typographyProps }: TruncatedTextProps) => {
	if (text === null || text === undefined) return <Typography {...typographyProps}>-</Typography>;

	const textString = String(text);
	const shouldTruncate = textString.length > maxLength;
	const displayText = shouldTruncate ? `${textString.substring(0, maxLength)}...` : textString;

	return shouldTruncate ? (
		<Tooltip title={textString} arrow placement="top">
			<Typography {...typographyProps}>{displayText}</Typography>
		</Tooltip>
	) : (
		<Typography {...typographyProps}>{displayText}</Typography>
	);
};

export default TruncatedText;
