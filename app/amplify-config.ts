const AmplifyConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: '65a9tu59er2c4ulldt82gi9pc2',
      userPoolId: 'us-east-2_Np0K9PFP6',
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


