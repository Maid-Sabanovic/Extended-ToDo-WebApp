import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://adfs.gws.ms/adfs',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'cbcc1e3c-05eb-4dde-881c-f8d37308a85e',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile',

  loginUrl: 'https://adfs.gws.ms/adfs/oauth2/authorize',
  logoutUrl: 'https://adfs.gws.ms/adfs/oauth2/logout',
  jwks: {
    keys: [
      'https://adfs.gws.ms/adfs/discovery/keys'
    ]
  }
}