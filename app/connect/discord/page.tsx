'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ConnectDiscordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Simulate OAuth callback handling
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const creatorId = searchParams.get('creator_id'); // From state param

    if (error) {
      setStatus('error');
      setErrorMessage(error);
      return;
    }

    if (code) {
      // Simulate API call to POST /creator/{id}/discord/connect
      handleDiscordConnection(code, creatorId || '1');
    } else {
      // If no code, show error or redirect
      setStatus('error');
      setErrorMessage('No authorization code received');
    }
  }, [searchParams]);

  const handleDiscordConnection = async (code: string, creatorId: string) => {
    try {
      // Simulate API call
      // const response = await fetch(`/api/creator/${creatorId}/discord/connect`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code })
      // });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo, always succeed
      setStatus('success');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/creator/dashboard');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to connect Discord. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 md:p-12 max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-6"
            >
              <Loader2 className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
              Connecting Discord...
            </h2>
            <p className="text-[#f9f4e1]/70">
              Please wait while we connect your Discord account
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
            </motion.div>
            <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
              Discord Connected!
            </h2>
            <p className="text-[#f9f4e1]/70 mb-6">
              Your Discord account has been successfully connected.
            </p>
            <p className="text-[#f9f4e1]/60 text-sm">
              Redirecting to dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
              Connection Failed
            </h2>
            <p className="text-[#f9f4e1]/70 mb-6">
              {errorMessage || 'Failed to connect Discord. Please try again.'}
            </p>
            <Link
              href="/creator/dashboard"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Return to Dashboard
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ConnectDiscordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 md:p-12 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-6"
          >
            <Loader2 className="w-8 h-8 text-purple-400" />
          </motion.div>
          <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
            Loading...
          </h2>
        </motion.div>
      </div>
    }>
      <ConnectDiscordContent />
    </Suspense>
  );
}

