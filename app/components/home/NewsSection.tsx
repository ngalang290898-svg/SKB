import { getPosts } from '../../../lib/fetchers';
import NewsSectionClient from './NewsSectionClient';

export default async function NewsSection() {
  const posts = await getPosts();
  return <NewsSectionClient posts={posts} />;
}
