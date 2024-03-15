'use client';

import { ElementRef, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { cn } from '@/lib/utils';
import { ListWithCards } from '@/types';

import { CardForm } from './card-form';
import { CardItem } from './card-item';
import { ListHeader } from './list-header';

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
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className='shrink-0 h-full w-[272px] select-none'>
					<div
						{...provided.dragHandleProps}
						className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
						<ListHeader onAddCard={enableEditing} data={data} />
						<Droppable droppableId={data.id} type='card'>
							{(provided) => (
								<ol
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={cn(
										'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
										data.cards.length > 0 ? 'mt-2' : 'mt-0',
									)}>
									{data.cards.map((card, index) => (
										<CardItem index={index} key={card.id} data={card} />
									))}
									{provided.placeholder}
								</ol>
							)}
						</Droppable>
						<CardForm
							listId={data.id}
							ref={textAreaRef}
							isEditing={isEditing}
							enableEditing={enableEditing}
							disableEditing={disableEditing}
						/>
					</div>
				</li>
			)}
		</Draggable>
	);
};
