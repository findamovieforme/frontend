const AmplifyConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: '3c0menbugs4qj1ej5lmknj1b6',
      userPoolId: 'us-east-1_OnlBMR2Mn',
      allowGuestAccess: false,
      signUpVerificationMethod: 'code',
      authenticationFlowType: 'USER_PASSWORD_AUTH',
      loginWith: {
        email: 'true',
        password: 'true',
      },
      oauth: {
        domain: 'https://auth.findamovie.me', // Your Cognito domain
        scope: ['email', 'profile', 'openid'],
        redirectSignIn: 'https://findamovie.me/dashboard', // Replace with your app's URL
        redirectSignOut: 'https://findamovie.me/logout', // Replace with your app's signout URL
        responseType: 'code', // `code` for Authorization Code Grant or `token` for Implicit Grant
        options: {
          facebook: true,
        },
      },
    },
  },
};

export { AmplifyConfig };


