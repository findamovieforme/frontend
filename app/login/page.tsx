'use client'
import { Amplify } from "aws-amplify";
import { AmplifyConfig } from "../amplify-config";

import AuthForm from '../components/AuthForm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(AmplifyConfig as any);


export default function LoginPage() {
  return <AuthForm isSignUp={false} />
}
