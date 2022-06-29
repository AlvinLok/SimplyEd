// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: 'AIzaSyDAntw03YWct9bg4ARX10AK10oi7nhXHn0',
  authDomain: 'simplyed-b5a8d.firebaseapp.com',
  projectId: 'simplyed-b5a8d',
  storageBucket: 'simplyed-b5a8d.appspot.com',
  messagingSenderId: '253597455390',
  appId: '1:253597455390:web:7b0935fd686042b8df0a0f',
  measurementId: 'G-SVBSTHXPCV',
  databaseURL: 'https://simplyed-b5a8d-default-rtdb.firebaseio.com',
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  console.log('submittin');
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message,
  });
}
