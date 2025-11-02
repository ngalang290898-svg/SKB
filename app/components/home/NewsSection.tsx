import { getPosts } from '../../../lib/fetchers';
import NewsSectionClient from './NewsSectionClient';

// Prevent long static build timeouts
export const dynamic = 'force-dynamic';

export default async function NewsSection() {
  const posts = await getPosts();
  return <NewsSectionClient posts={posts} />;
}
