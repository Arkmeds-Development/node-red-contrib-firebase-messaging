# Import into nodered by going on "Gerenciar Paleta" and pressing the import .tgz button.
We are using version 0.5.2 with changes to the payload used in **firebaseOutNode.js**

# Communicate with Google Firebase real-time database

These nodes use the new firebase-admin API and service account json is used for authentication.

## To run test, create a file in the top folder:

    touch my-firebase-service-credential.json

Setup a firebase project, get and paste the service account json to this file.

Then do

    npm run test

