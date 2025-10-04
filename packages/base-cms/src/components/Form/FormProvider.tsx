import { CSSProperties } from 'react';

import { FormProvider as Form, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
	id?: string;
	methods: UseFormReturn<any>;
	onSubmit?: SubmitHandler<any>;
	style?: CSSProperties;
	children: React.ReactNode;
}

export const FormProvider = ({ id, methods, onSubmit, style, children }: FormProviderProps) => {
	return (
		<Form {...methods}>
			<form id={id} style={{ ...style }} onSubmit={onSubmit}>
				{children}
			</form>
		</Form>
	);
};
