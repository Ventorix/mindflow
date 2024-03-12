import { auth } from '@clerk/nextjs';
import { OrgControl } from './_components/org-control';
import { startCase } from 'lodash';

export async function generateMetadata() {
	const { orgSlug } = auth();

	return {
		title: startCase(orgSlug || 'organization'),
	};
}
export default function OrganizationIdLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<OrgControl />
			{children}
		</>
	);
}
