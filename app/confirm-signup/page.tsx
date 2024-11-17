'use client'
import { useState, useEffect, Suspense } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { AmplifyConfig } from "../amplify-config";
import { Amplify } from 'aws-amplify';
import NavigationBar from '../components/navbar/navBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(AmplifyConfig as any);

function ConfirmSignUpSkeleton() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const email = searchParams.get('email');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      if (!email) throw Error("Email missing");
      await confirmSignUp({ confirmationCode: code, username: email.split('@')[0] }); // Strip off domain to use as unique username
      setSuccess(true); // Set success state to display the confirmation message
    } catch (error: unknown) {
      setError("Error confirming sign-up: " + error);
      console.error("Error confirming sign-up:", error);
    }
  };

  // Countdown effect for redirection
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      router.push('/login'); // Redirect to login page after countdown
    }
  }, [success, countdown, router]);

  return (
    <div>
      <div className='container mx-auto h-screen'>
        <NavigationBar />
        <div className="flex justify-center items-center flex-col h-5/6">
          <Card className="w-full max-w-md p-4 shadow-md rounded">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Confirm Your Account</CardTitle>
              <CardDescription>
                {success
                  ? "Your email has been confirmed. Please log in again."
                  : "We’ve sent a confirmation code to your email. Please enter it below to complete your sign-up."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!success ? (
                <div className="grid gap-4">
                  <div className="flex justify-center">
                    {/* <Input
                      id="code"
                      type="text"
                      placeholder="Enter confirmation code"
                      value={code}
                      onChange={(e) => setCode(e.currentTarget.value)}
                      required
                    /> */}
                    <InputOTP onChange={(e) => {
                      setCode(e)
                    }} maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button className="w-full mt-4" onClick={handleConfirm}>
                    Confirm
                  </Button>
                  {error && (
                    <div className="mt-4 px-4 py-2 text-sm text-red-600 bg-red-100 rounded border border-red-200">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-600">
                    Your email has been confirmed. Please log in again.
                  </p>
                  <p className="text-sm mt-2">
                    Redirecting to login page... {countdown}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



export default function ConfirmSignUp() {
  return (
    <Suspense >
      <ConfirmSignUpSkeleton />
    </Suspense>
  )
}
