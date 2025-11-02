import { getFeaturedStaff } from '../../../lib/fetchers';
import StaffHighlightClient from './StaffHighlightClient';

export default async function StaffHighlight() {
  const staff = await getFeaturedStaff();
  return <StaffHighlightClient staff={staff} />;
}
