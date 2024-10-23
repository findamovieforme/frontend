'use client'
import { signIn, signUp, fetchAuthSession } from 'aws-amplify/auth';
import { Amplify } from "aws-amplify";
import { AmplifyConfig } from "../amplify-config";

import { useState, FormEvent } from 'react';
import { useAuthStore } from '../store';
import { useRouter } from 'next/navigation';

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (isSignUp) {
      await signUpUser(email, password, firstName, lastName);
    } else {
      await signInUser(email, password);
    }
  };

  const signUpUser = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const strippedUsername = email.split('@')[0]; // Strip off domain to use as unique username
      await signUp({
        username: strippedUsername, // Cognito-compatible username
        password: password,
        options: {
          userAttributes: {
            email: email,
            given_name: firstName,
            family_name: lastName,
          },
        }
      });
      console.log("Sign-up successful!");
    } catch (error: unknown) {
      setError("Error signing up: " + error);
      console.error("Error signing up:", error);
    }
  };
  const { setTokens } = useAuthStore();
  const router = useRouter(); // Initialize the router for navigation

  const signInUser = async (email: string, password: string) => {
    try {

      await signIn({ username: email, password: password });
      const session = await fetchAuthSession();
      // const token = session.signInDetails; // Get the JWT ID token
      const idToken = session.tokens?.idToken?.toString(); // Access this from the session object in your code
      const accessToken = session.tokens?.accessToken?.toString();
      const name = session.tokens?.idToken?.payload?.given_name as string;

      // Store tokens and user name in Zustand store
      if (accessToken && idToken) {
        setTokens(accessToken, idToken, name);
      }
      router.push('/');

    } catch (error: unknown) {
      setError("Error signing in: " + error);
      console.error("Error signing in:", error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isSignUp && (
          <>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="w-full p-2 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                className="w-full p-2 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
    </div>
  );
}
