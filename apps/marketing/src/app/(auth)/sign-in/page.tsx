'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthPageLayout, SimpleSignInForm } from '@sunny/ui';
import { AuthRouter, useAuth } from '@sunny/auth';
import { type SignInRequest } from '@sunny/shared-types';

function SignInPageContent() {
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const redirectUrl = searchParams?.get('redirect') || undefined;

  const handleSignIn = async (data: SignInRequest) => {
    const response = await signIn(data);
    
    if (response.success && response.user) {
      // Use auto-detection for account type and smart routing
      AuthRouter.handleAuthSuccessWithAutoDetection(response.user, redirectUrl);
    }
    
    return response;
  };

  return (
    <AuthPageLayout
      title="Welcome Back"
      subtitle="Sign in to your Sunny Payments account"
    >
      <SimpleSignInForm
        onSubmit={handleSignIn}
        redirectUrl={redirectUrl}
      />
    </AuthPageLayout>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    }>
      <SignInPageContent />
    </Suspense>
  );
}
