import { Meteor } from 'meteor/meteor';
import { Facebook } from 'meteor/facebook';
import { OAuth } from 'meteor/oauth';
import { _ } from 'meteor/underscore';

export function getFacebookCredential(permissions, callback) {
  // If only callback provided
  if (typeof permissions === 'function') {
    callback = permissions;
    permissions = [];

  // If permissions provided, check format
  } else if (permissions && !_.isArray(permissions)) {
    const exception = new Meteor.Error('invalid permissions', 'Permissions must be an array of strings');
    if (typeof callback === 'function') {
      callback(exception);
      return;
    }
    return exception;
  }

  // Filter permissions to give only strings
  permissions = _.filter(permissions, _.isString);

  // If no callback provided, set mock up
  if (typeof callback !== 'function') {
    callback = () => {};
  }

  let result;
  Facebook.requestCredential({
    requestPermission: permissions,
  }, function(credentialToken) {
    const credentialSecret = OAuth._retrieveCredentialSecret(credentialToken);
    Meteor.call('facebook.setAccessToken', credentialToken, credentialSecret, callback);
  });
}
