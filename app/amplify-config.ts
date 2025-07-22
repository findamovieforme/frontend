/// <reference types="node" />

const AmplifyConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID ?? '',
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID ?? '',
      allowGuestAccess: false,
      signUpVerificationMethod: 'code',
      authenticationFlowType: 'USER_PASSWORD_AUTH',
      loginWith: {
        email: 'true',
        password: 'true',
      },
      oauth: {
        domain: process.env.NEXT_PUBLIC_COGNITO_OAUTH_DOMAIN ?? '',
        scope: ['email', 'profile', 'openid'],
        redirectSignIn: `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/dashboard`,
        redirectSignOut: `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/logout`,
        responseType: 'code',
        options: {
          facebook: true,
        },
      },
    },
  },
};

export { AmplifyConfig };


