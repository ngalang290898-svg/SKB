import { getSchoolMetadata } from '../../../lib/fetchers';
import ContactClient from './ContactClient';

export default async function ContactSection() {
  const school = await getSchoolMetadata();
  return <ContactClient school={school} />;
}
