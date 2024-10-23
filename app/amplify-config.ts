const AmplifyConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: '2kcr3s8gaovau5gqed04hkfdp',
      userPoolId: 'us-east-2_bGoLN5t49',
      identityPoolId: `us-east-2:d3f959ad-91fd-4361-b876-4a656d6b3040`,
      allowGuestAccess: false,
      signUpVerificationMethod: 'code',
      loginWith: {
        email: 'true',
        password: 'true',
      },
    },
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
};

export { AmplifyConfig };


