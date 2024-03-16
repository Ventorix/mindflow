'use client';

import { toast } from 'sonner';
import { useState, useRef, ElementRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { AlignLeft } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { CardWithList } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { updateCard } from '@/actions/update-card';

interface DescriptionProps {
	data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
	const params = useParams();
	const queryClient = useQueryClient();

	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef<ElementRef<'form'>>(null);
	const textareaRef = useRef<ElementRef<'textarea'>>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			textareaRef.current?.focus();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing();
		}
	};

	useEventListener('keydown', onKeyDown);
	useOnClickOutside(formRef, disableEditing);

	const { execute: executeUpdateDescription, fieldErrors } = useAction(updateCard, {
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id],
			});
			toast.success(`Card "${data.title}" updated`);
			disableEditing();
		},
		onError(error) {
			toast.error(error);
		},
	});

	const onSubmit = (formData: FormData) => {
		const description = formData.get('description') as string;
		const boardId = params.boardId as string;

		executeUpdateDescription({ boardId, description, id: data.id });
	};

	return (
		<div className='flex items-start gap-x-3 w-full'>
			<AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
			<div className='w-full '>
				<p className='font-bold text-neutral-700 mb-2'>Description</p>
				{isEditing ? (
					<form action={onSubmit} ref={formRef} className='space-y-2'>
						<FormTextarea
							id='description'
							ref={textareaRef}
							className='w-full mt-2'
							placeholder='Add a more detailed description'
							defaultValue={data.description || undefined}
							errors={fieldErrors}
						/>
						<div className='flex items-center gap-x-2'>
							<FormSubmit>Save</FormSubmit>
							<Button type='button' onClick={disableEditing} size={'sm'} variant={'ghost'}>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						onClick={enableEditing}
						role='button'
						className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'>
						{data.description || 'Add a more detailed description...'}
					</div>
				)}
			</div>
		</div>
	);
};

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<Skeleton className='w-6 h-6 bg-neutral-200' />
			<div className='w-full'>
				<Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
				<Skeleton className='w-full h-[78px] mb-2 bg-neutral-200' />
			</div>
		</div>
	);
};
