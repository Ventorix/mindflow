import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href={'/'}>
			<div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
				<Image src='/logo.svg' alt='logo' height={92} width={92} />
			</div>
		</Link>
	);
}
