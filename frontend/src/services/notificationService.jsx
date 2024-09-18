// Firebase setup for push notifications
import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCBdeyXULMZ7pJ-rw85QYPXhnv2HPLorFA",
    authDomain: "auth-proj-a632a.firebaseapp.com",
    projectId: "auth-proj-a632a",
    storageBucket: "auth-proj-a632a.appspot.com",
    messagingSenderId: "829027959522",
    appId: "1:829027959522:web:5922497a00a18f833f54bb",
    measurementId: "G-N1X3T90P17"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Request notification permission
export const requestNotificationPermission = () => {
  messaging.requestPermission()
    .then(() => messaging.getToken())
    .then(token => {
      console.log('FCM Token:', token);
      // Send this token to the server to register the device
    })
    .catch(err => console.error('Notification permission error:', err));
};

// Listen to incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
