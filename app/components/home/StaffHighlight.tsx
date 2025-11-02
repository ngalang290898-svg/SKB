import { getFeaturedStaff } from '../../../lib/fetchers';
import StaffHighlightClient from './StaffHighlightClient';

// Prevent long static build timeouts
export const dynamic = 'force-dynamic';

export default async function StaffHighlight() {
  const staff = await getFeaturedStaff();
  return <StaffHighlightClient staff={staff} />;
}
