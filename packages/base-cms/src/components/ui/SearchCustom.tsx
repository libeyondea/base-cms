import { useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash-es';

import { useTableContext } from '~/contexts/AppProvider';

import NTextField from '../input/NTextField';

interface SearchCustomProps {
	keyName?: string;
	size?: 'small' | 'medium';
}

const SearchCustom = ({ keyName = '', size = 'small' }: SearchCustomProps) => {
	const { filters, setFilterTable } = useTableContext();
	// Local state để hiển thị ngay lập tức
	const [searchValue, setSearchValue] = useState(filters[keyName]?.query?.keyword || '');

	// Debounce chỉ cho việc dispatch
	const debouncedDispatch = useMemo(
		() =>
			debounce((value: string) => {
				setFilterTable({ type: keyName, value: { keyword: value } });
			}, 500),
		[setFilterTable, keyName]
	);

	// Sync local state với store khi cần thiết
	useEffect(() => {
		const storeValue = filters[keyName]?.query?.keyword || '';
		if (storeValue !== searchValue) {
			setSearchValue(storeValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters[keyName]?.query?.keyword]);

	// Cleanup debounce
	useEffect(() => {
		return () => {
			debouncedDispatch.cancel();
		};
	}, [debouncedDispatch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value); // Cập nhật UI ngay lập tức
		debouncedDispatch(value); // Dispatch sau 500ms
	};

	return (
		<NTextField
			placeholder="Tìm kiếm..."
			onChange={handleChange}
			sx={{
				minWidth: '250px'
			}}
			size={size}
			value={searchValue}
		/>
	);
};

export default SearchCustom;
