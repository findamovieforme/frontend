'use client'
import { signIn, signUp, fetchAuthSession } from 'aws-amplify/auth';
import { Amplify } from "aws-amplify";
import { AmplifyConfig } from "../amplify-config";

import { useState, FormEvent } from 'react';
import { useAuthStore } from '../store';
import { useRouter } from 'next/navigation';


import { UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavigationBar from './navbar/navBar';
import Link from 'next/link';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(AmplifyConfig as any);

interface AuthFormProps {
  isSignUp: boolean;
}

export default function AuthForm({ isSignUp = false }: AuthFormProps) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setTokens } = useAuthStore();

  const router = useRouter(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); 

    if (isSignUp) {
      await signUpUser(email, password, firstName, lastName);
    } else {
      await signInUser(email, password);
    }
  };

  const saveCurrentLoggin = async () => {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString(); 
    const accessToken = session.tokens?.accessToken?.toString();

    if (accessToken && idToken) {
      setTokens(accessToken, idToken);
    }
  }
  const signUpUser = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const strippedUsername = email.split('@')[0]; 


      await signUp({
        username: strippedUsername,
        password: password,
        options: {
          userAttributes: {
            email: email,
            given_name: firstName,
            family_name: lastName,
          },
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      router.push(`/confirm-signup?email=${encodeURIComponent(email)}`);

    } catch (error: unknown) {
      setError("Error signing up: " + error);
      console.error("Error signing up:", error);
    }
  };





  const signInUser = async (email: string, password: string) => {
    try {

      await signIn({ username: email, password: password });
      saveCurrentLoggin();
      router.push('/');

    } catch (error: unknown) {
      setError("Error signing in: " + error);
      console.error("Error signing in:", error);
    }
  };


  return (
    <div className='container mx-auto'>
      <NavigationBar />
      <div className="flex justify-center">
        <section className="bg-white py-16 p-8 rounded w-full max-w-md">
          <div className="container">
            <div className="flex flex-col gap-4">
              <Card className="mx-auto w-full max-w-md">
                <CardHeader className="items-center">
                  <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
                  <CardTitle className="text-xl">
                    {isSignUp ? 'Sign up with your email' : 'Log in with your email'}
                  </CardTitle>
                  <CardDescription>
                    {isSignUp ? 'Enter your information to sign up' : 'Enter your information to log in'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {/* <Button variant="outline" className="w-full">
                      <Globe className="mr-2 size-4" />
                      {isSignUp ? 'Sign up with Google' : 'Log in with Google'}
                    </Button>
                    <Button onClick={() => signInWithRedirect({ provider: "Facebook" })} variant="outline" className="w-full">
                      <FacebookIcon className="mr-2 size-4" />
                      {isSignUp ? 'Sign up with Facebook' : 'Log in with Facebook'}
                    </Button> */}
                    <div className="flex items-center gap-4">
                      <span className="h-px w-full bg-input"></span>
                      <span className="text-xs text-muted-foreground">OR</span>
                      <span className="h-px w-full bg-input"></span>
                    </div>
                    {isSignUp && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.currentTarget.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.currentTarget.value)}
                          />
                        </div>
                      </>
                    )}
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                      />
                    </div>
                    <Button type="submit" onClick={handleSubmit} className="w-full">
                      {isSignUp ? 'Sign Up' : 'Log In'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mx-auto flex gap-1 text-sm">
                {isSignUp ? (
                  <>
                    <p>Already have an account?</p>
                    <Link href="/login" className="underline">
                      Log In
                    </Link>
                  </>
                ) : (
                  <>
                    <p>Don&apos;t have an account yet?</p>
                      <Link href="/signup" className="underline">
                      Sign Up
                      </Link>
                  </>
                )}
              </div>
              {error && (
                <div className="mt-4 px-4 py-2 text-sm text-red-600 bg-red-100 rounded border border-red-200">
                  {error}
                </div>
              )}

            </div>
          </div>
        </section>
      </div>
    </div>

  );
}


