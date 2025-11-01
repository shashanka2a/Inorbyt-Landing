'use client';

import { FanJoinFlow } from '@/components/FanJoinFlow';
import { useParams } from 'next/navigation';

export default function CreatorLinkPage() {
  const params = useParams();
  const creatorSlug = params?.slug as string;

  return <FanJoinFlow creatorSlug={creatorSlug} />;
}
