import { Meteor } from 'meteor/meteor';
import { Facebook } from 'meteor/facebook';
import { check } from 'meteor/check';

Meteor.methods({
  'facebook.setAccessToken'(credentialToken, credentialSecret) {
    check(credentialToken, String);
    check(credentialSecret, String);

    if(!this.userId) {
      throw new Meteor.Error('facebook.setAccessToken.notLoggedIn', 'Unable to find target user.');
    }

    const facebookCredential = Facebook.retrieveCredential(credentialToken, credentialSecret);
    const facebookData = facebookCredential && facebookCredential.serviceData || null;

    return Meteor.users.update({
      _id: this.userId,
    }, {
      $set: {
        'services.facebook': facebookData,
      },
    });
  }
});
