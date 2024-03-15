'use client';

import { ListWithCards } from '@/types';

import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';
import { CardForm } from './card-form';
import { cn } from '@/lib/utils';
import { CardItem } from './card-item';

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
				<ol
					className={cn(
						'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
						data.cards.length > 0 ? 'mt-2' : 'mt-0',
					)}>
					{data.cards.map((card, index) => (
						<CardItem index={index} key={card.id} data={card} />
					))}
				</ol>
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
