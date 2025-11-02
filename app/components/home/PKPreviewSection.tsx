import { getPKSections } from '../../../lib/fetchers';
import PKPreviewClient from './PKPreviewClient';

// Prevent long static build timeouts
export const dynamic = 'force-dynamic';

export default async function PKPreviewSection() {
  const pkSections = await getPKSections();
  return <PKPreviewClient pkSections={pkSections} />;
}
