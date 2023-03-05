import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { blobToBase64 } from '../helpers/blobToBase64';
import { User } from 'microsoft-graph';
import msalInstance, { scopes } from './AzureConfig';


let graphClient: Client | undefined = undefined;

export default class AzureGraphServices {


  static authProvider = new AuthCodeMSALBrowserAuthenticationProvider(

    msalInstance as PublicClientApplication,
    {
      account: msalInstance.getActiveAccount()!,
      scopes,
      interactionType: InteractionType.Popup
    }
  );

  static async getUserPhotoAsync(email: string) {
    this.ensureClient(this.authProvider);
    try {
      const photo = await graphClient?.api(`/users/${email}/photo/$value`).get();
      // Convierte el blod en base64
      const photoFormatted = blobToBase64(photo);
      return photoFormatted;
    } catch (error) {
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    }
  }

  static async getUserByEmail(email: string) {
    this.ensureClient(this.authProvider);
    try {
      const user = await graphClient?.api(`/users/${email}`).get();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPhoto() {
    this.ensureClient(this.authProvider);
    const photo = await graphClient?.api('me/photo/$value')
      .get();

    //Convierte el blod en base64
    const photoFormatted = blobToBase64(photo);
    return photoFormatted;
  }

  static async getUser(): Promise<User> {
    this.ensureClient(this.authProvider);

    const user: User = await graphClient!.api('/me')
      .select('displayName,mail,mailboxSettings,userPrincipalName,jobTitle ')
      .get();

    return user;
  }

  static async getAccestToken() {

    const result = await msalInstance.loginPopup({
      scopes: scopes,
      prompt: 'select_account'
    });
    return result.accessToken;
  }

  static ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
    if (!graphClient) {
      graphClient = Client.initWithMiddleware({
        authProvider: authProvider
      });
    }

    return graphClient;
  }

}
