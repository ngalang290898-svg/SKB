import { getPKSections } from '../../../lib/fetchers';
import PKPreviewClient from './PKPreviewClient';

export const dynamic = 'force-dynamic';

export default async function PKPreviewSection() {
  const pkSections = await getPKSections();   // 👈 corrected name
  return <PKPreviewClient pkSections={pkSections} />;
}
