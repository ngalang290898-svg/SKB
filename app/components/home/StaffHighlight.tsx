import { getFeaturedStaff } from '../../../lib/fetchers';
import StaffHighlightClient from './StaffHighlightClient';

export const dynamic = 'force-dynamic';

export default async function StaffHighlight() {
  const staff = await getFeaturedStaff();
  return <StaffHighlightClient staff={staff} />;
}
