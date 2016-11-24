# What is this for?
Meteor provides a way to login with external services (Facebook, Google, Twitter).
Now say you have used `loginWithGoogle` to create your user, if you also want to retrieve a Facebook access token for the same user
you cannot use `loginWithFacebook` since the latter will create a new user. I could not find a satisfying solution to this issue so
I wrote this small package which is simply a wrapper of the OAuth methods from the Meteor _facebook_ and _oauth_ packages.

### How to install
The package has not been published yet to Atmosphere. If you want to use it, simply clone the repository in your `packages` folder
and add `maxcs:fb-credential` in the `.meteor/packages` file.

### Setup
To use the facebook client, you will need to set up the `ServiceConfiguration` for Facebook in your app [see Meteor Guide](https://docs.meteor.com/api/accounts.html#service-configuration)

```javascript
import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.upsert({
  service: 'facebook',
}, {
  $set: {
    loginStyle: 'popup',
    requestOfflineToken: false,
    appId: 'your-app-id',
    secret: 'your-app-secret',
  },
});
````

### How to use
The package provide a simple function `getFacebookCredential([permissions], [callback])` that will trigger the login process and on completion,
set the `services.facebook` object on the login user.
- `permissions`: (optional) array of strings of the permissions to ask the user for (see full list on [facebook dev website](https://developers.facebook.com/docs/facebook-login/permissions)). Default permissions are 'public profile' and 'email address'.
- `callback(error, result)`: (optional) a function to be called on completion. `result` will be the number of `Meteor.users` affected (normally 1).

##### exemple:
```javascript
import { getFacebookCredential } from 'meteor/maxcs:fb-credential';

Template.myTemplate.events({
  'click #connect-to-facebook': function(event) {
    getFacebookCredential(['user\_photos', 'user\_posts'], function(err, res) {
      if(err) {
        // Notify user of error
      } else {
        // Success message
      };
    })
    return;
  }
});
````

### What to do next?
Once you have obtained the credentials, you can make API calls using the `accessToken` stored on the user's object.
There are several packages to be used to simplify the use of the API such as [fbgraph](https://www.npmjs.com/package/fbgraph)

##### example
```
// server side, assumes fbgraph has been installed with 'npm install -S fbgraph'
import graph from 'fbgraph';

const user = Meteor.users.findOne({
  _id: this.userId,
});
const accessToken = user.services.facebook.accessToken

graph.setAccessToken(accessToken);
graph.get("/me", function(err, res) {
  console.log(res); // User facebook object
});
````

### License
Copyright (c) 2016 Maxime Guitet

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.