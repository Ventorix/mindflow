'use client';

import Image from 'next/image';

import { toast } from 'sonner';
import { stripeRedirect } from '@/actions/stripe-redirect';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAction } from '@/hooks/use-action';
import { useProModal } from '@/hooks/use-pro-modal';

export const ProModal = () => {
	const proModal = useProModal();
	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess(data) {
			window.location.href = data;
		},
		onError(error) {
			toast.error(error);
		},
	});

	const onClick = () => {
		execute({});
	};

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className='max-w-md p-0 overflow-hidden'>
				<div className='aspect-video relative flex items-center justify-center'>
					<Image src={'/hero.svg'} alt='Hero' className='object-cover' fill />
				</div>
				<div className='text-neutral-700 mx-auto space-y-6 p-6'>
					<h2 className='font-bold text-xl'>Update to Mindflow Pro Today!</h2>
					<p className='text-xs font-semibold text-neutral-600'>Explore the best of Mindflow</p>
					<div className='pl-3'>
						<ul className='text-sm list-disc'>
							<li>Unlimited boards</li>
							<li>Advanced checklist</li>
							<li>Admin and security features</li>
							<li>And more!</li>
						</ul>
					</div>
					<Button disabled={isLoading} onClick={onClick} variant={'primary'} className='w-full'>
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
