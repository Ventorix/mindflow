'use client';

import { ListWithCards } from '@/types';

import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';
import { CardForm } from './card-form';

interface ListItemProps {
	index: number;
	data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
	const textAreaRef = useRef<ElementRef<'textarea'>>(null);
	const [isEditing, setIsEditing] = useState(false);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			textAreaRef.current?.focus();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	return (
		<li className='shrink-0 h-full w-[272px] select-none'>
			<div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
				<ListHeader onAddCard={enableEditing} data={data} />
				<CardForm
					listId={data.id}
					ref={textAreaRef}
					isEditing={isEditing}
					enableEditing={enableEditing}
					disableEditing={disableEditing}
				/>
			</div>
		</li>
	);
};
