import { Meteor } from 'meteor/meteor';
import { Facebook } from 'meteor/facebook';
import { OAuth } from 'meteor/oauth';

export async function getFacebookCredentials() {
  let result;
  return await Facebook.requestCredential({
    // Need to be able to define which permissions are needed
    requestPermission: ['user_friends'],
  }, async function(credentialToken) {
    const credentialSecret = OAuth._retrieveCredentialSecret(credentialToken);
    return await Meteor.callPromise('facebook.setAccessToken', credentialToken, credentialSecret);
  })
}
