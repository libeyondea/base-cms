import { useCallback, useState } from 'react';

import { MODE_MODAL } from '~/components/Modal';

export type IValue = boolean | string | number | MODE_MODAL;

export interface ReturnType {
	value: IValue;
	onTrue: () => void;
	onFalse: () => void;
	onToggle: () => void;
	setValue: React.Dispatch<React.SetStateAction<IValue>>;
}

export const useStateValue = (defaultValue: IValue = false): ReturnType => {
	const [value, setValue] = useState<IValue>(defaultValue);

	const onTrue = useCallback(() => {
		setValue(true);
	}, []);

	const onFalse = useCallback(() => {
		setValue(false);
	}, []);

	const onToggle = useCallback(() => {
		setValue((prev) => !prev);
	}, []);

	return {
		value,
		onTrue,
		onFalse,
		onToggle,
		setValue
	};
};
