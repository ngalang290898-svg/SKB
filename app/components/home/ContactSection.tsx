import { getSchoolMetadata } from '../../../lib/fetchers';
import ContactClient from './ContactClient';

// Prevent long static build timeouts
export const dynamic = 'force-dynamic';

export default async function ContactSection() {
  const school = await getSchoolMetadata();
  return <ContactClient school={school} />;
}
