import HeroClient from './HeroClient';

export const dynamic = 'force-dynamic';

export default function HeroSection() {
  // Static content only – just return client-side visual
  return <HeroClient />;
}
