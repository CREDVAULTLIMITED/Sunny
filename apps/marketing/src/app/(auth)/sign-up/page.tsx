'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthPageLayout, SignUpForm } from '@sunny/ui';
import { AuthRouter, useAuth } from '@sunny/auth';
import { UserAccountType, type SignUpRequest } from '@sunny/shared-types';

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const { signUp } = useAuth();

  const redirectUrl = searchParams?.get('redirect') || undefined;
  const accountType = searchParams?.get('type') as UserAccountType || undefined;

  const handleSignUp = async (data: SignUpRequest) => {
    const response = await signUp(data);
    
    if (response.success && response.user) {
      // Use auto-detection for account type and smart routing
      AuthRouter.handleAuthSuccessWithAutoDetection(response.user, redirectUrl);
    }
    
    return response;
  };

  return (
    <AuthPageLayout
      title="Join Sunny Payments"
      subtitle="Create your account and start accepting payments globally"
    >
      <SignUpForm
        onSubmit={handleSignUp}
        defaultAccountType={accountType}
        redirectUrl={redirectUrl}
      />
    </AuthPageLayout>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    }>
      <SignUpPageContent />
    </Suspense>
  );
}
