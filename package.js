Package.describe({
  name: 'maxcs:fb-credentials',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Uses the native facebook package to adds the facebook service object for an already logged in user.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.2');
  api.use([
    'accounts-oauth',
    'check',
    'ecmascript',
    'facebook',

    'deanius:promise@3.1.3'
  ]);
  api.mainModule('api-connect-fb.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('fb-credentials');
  api.mainModule('fb-credentials-tests.js');
});
