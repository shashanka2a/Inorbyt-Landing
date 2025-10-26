import { Metadata } from 'next';
import { CreatorGuidesContent } from '@/components/CreatorGuidesContent';

export const metadata: Metadata = {
  title: 'Creator Guides - InOrbyt.io',
  description: 'Step-by-step tutorials for connecting and rewarding across platforms. Learn how to build your reward ecosystem.',
  openGraph: {
    title: 'Creator Guides - InOrbyt.io',
    description: 'Step-by-step tutorials for connecting and rewarding across platforms.',
  },
};

export default function CreatorGuidesPage() {
  return <CreatorGuidesContent />;
}
