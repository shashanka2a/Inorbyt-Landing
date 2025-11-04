'use client';

import { CreatorDashboard } from '@/components/CreatorDashboard';

export default function CreatorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] w-full flex justify-center">
      <div className="w-full max-w-[1920px]">
        <CreatorDashboard />
      </div>
    </div>
  );
}

