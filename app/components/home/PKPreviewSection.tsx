import { getPkSections } from '../../../lib/fetchers';
import PKPreviewClient from './PKPreviewClient';

export default async function PKPreviewSection() {
  const pkSections = await getPkSections();
  return <PKPreviewClient pkSections={pkSections} />;
}
