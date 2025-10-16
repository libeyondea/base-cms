# Tab Component

Component Tab với khả năng chuyển đổi giữa các tab mà không cần tải lại component.

## Tính năng mới: keepMounted

Thêm prop `keepMounted` để giữ tất cả tab content được mount, chỉ thay đổi visibility thay vì mount/unmount.

### Cách sử dụng

```tsx
import { Tab, TabItem } from '@base-cms/components';

const MyComponent = () => {
	const tabs: TabItem[] = [
		{
			id: 'tab1',
			label: 'Tab 1',
			content: <ExpensiveComponent1 />
		},
		{
			id: 'tab2',
			label: 'Tab 2',
			content: <ExpensiveComponent2 />
		},
		{
			id: 'tab3',
			label: 'Tab 3',
			content: <ExpensiveComponent3 />
		}
	];

	return (
		<Tab
			tabs={tabs}
			keepMounted={true} // Giữ tất cả tab content được mount
			defaultValue="tab1"
		/>
	);
};
```

### Lợi ích của keepMounted

- **Hiệu suất**: Tránh việc tải lại component khi chuyển tab
- **Trạng thái**: Giữ nguyên state của các component trong tab
- **Trải nghiệm người dùng**: Chuyển tab nhanh hơn, không bị gián đoạn

### Lưu ý

- Khi `keepMounted={true}`, tất cả tab content sẽ được render và mount ngay từ đầu
- Chỉ tab hiện tại sẽ hiển thị (`display: block`), các tab khác sẽ ẩn (`display: none`)
- Có thể ảnh hưởng đến hiệu suất ban đầu nếu có quá nhiều tab với content phức tạp

### Props

| Prop           | Type               | Default | Mô tả                                      |
| -------------- | ------------------ | ------- | ------------------------------------------ |
| `keepMounted`  | `boolean`          | `false` | Giữ tất cả tab content được mount          |
| `tabs`         | `TabItem[]`        | -       | Danh sách các tab                          |
| `defaultValue` | `string \| number` | -       | Tab mặc định                               |
| `animate`      | `boolean`          | `true`  | Hiệu ứng chuyển đổi                        |
| `persistState` | `string`           | -       | Key để lưu trạng thái trong sessionStorage |

### TabItem Interface

```tsx
interface TabItem {
	id: string | number;
	label: string;
	icon?: React.ReactElement;
	disabled?: boolean;
	badge?: string | number;
	badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	content?: React.ReactNode;
}
```
