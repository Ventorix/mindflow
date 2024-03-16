'use client';

import { toast } from 'sonner';
import { Copy, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CardWithList } from '@/types';
import { useAction } from '@/hooks/use-action';
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { useParams } from 'next/navigation';
import { useCardModal } from '@/hooks/use-card-modal';

interface ActionsProps {
	data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
	const params = useParams();
	const cardModal = useCardModal();

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
		onSuccess(data) {
			toast.success(`Card "${data.title.split(' - Copy')[0]}" copied`);
			cardModal.onClose();
		},
		onError(error) {
			toast.error(error);
		},
	});

	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
		onSuccess(data) {
			toast.success(`Card "${data.title}" deleted`);
			cardModal.onClose();
		},
		onError(error) {
			toast.error(error);
		},
	});

	const onCopy = () => {
		const boardId = params.boardId as string;

		executeCopyCard({ boardId, id: data.id });
	};

	const onDelete = () => {
		const boardId = params.boardId as string;

		executeDeleteCard({ boardId, id: data.id });
	};

	return (
		<div className='space-y-2 mt-2'>
			<p className='text-xs font-bold'>Actions</p>
			<Button
				onClick={onCopy}
				disabled={isLoadingCopy}
				variant={'gray'}
				className='w-full justify-start font-semibold hover:bg-orange-200'
				size={'inline'}>
				<Copy className='h-4 w-4 mr-2' />
				Copy
			</Button>
			<Button
				onClick={onDelete}
				disabled={isLoadingDelete}
				variant={'gray'}
				className='w-full justify-start font-semibold hover:bg-red-300'
				size={'inline'}>
				<Trash className='h-4 w-4 mr-2' />
				Delete
			</Button>
		</div>
	);
};

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className='space-y-2 mt-2'>
			<Skeleton className='w-20 h-4 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
		</div>
	);
};
