import { getSchoolMetadata } from '../../../lib/fetchers';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export default async function ContactSection() {
  const school = await getSchoolMetadata();
  return <ContactClient school={school} />;
}
