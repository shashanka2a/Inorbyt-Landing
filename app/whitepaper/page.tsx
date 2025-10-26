import { Metadata } from 'next';
import { WhitepaperContent } from '@/components/WhitepaperContent';

export const metadata: Metadata = {
  title: 'Whitepaper - InOrbyt.io',
  description: 'The vision behind decentralized participation and community ownership. Deep dive into the reward layer for the creator economy.',
  openGraph: {
    title: 'Whitepaper - InOrbyt.io',
    description: 'The vision behind decentralized participation and community ownership.',
  },
};

export default function WhitepaperPage() {
  return <WhitepaperContent />;
}
