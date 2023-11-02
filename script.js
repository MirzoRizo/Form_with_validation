const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const inputs = document.querySelectorAll('input');

function check(id) {
  const constraints = {
    username: [
      '^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$',
      'Username must have at least 2 characters and not contain special characters',
    ],
    email: ['^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$', 'Email must be a valid'],
    password: [
      '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
      'Password must contain at minimum eight characters, at least one letter and one number',
    ],
  };
  const username = document.getElementById(id);
  const usernameId = username.id;
  const constraint = new RegExp(constraints[usernameId][0], '');
  if (constraint.test(username.value)) {
    username.setCustomValidity('');
  } else {
    username.setCustomValidity(constraints[usernameId][1]);
  }
}

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    check(input.id);
  });
});

function confPassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

confirmPassword.addEventListener('input', () => {
  confPassword();
});

function checkZIP() {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    ch: [
      '^(CH-)?\\d{4}$',
      'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
    ],
    de: [
      '^(D-)?\\d{5}$',
      'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
  };

  // Read the country id
  const country = document.getElementById('Country').value;
  // Get the NPA field
  const ZIPField = document.getElementById('ZIP');
  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], '');
  // Check it!
  if (constraint.test(ZIPField.value)) {
    // The ZIP follows the constraint, we use the ConstraintAPI to tell it
    ZIPField.setCustomValidity('');
  } else {
    // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    ZIPField.setCustomValidity(constraints[country][1]);
  }
}

window.onload = () => {
  document.getElementById('Country').onchange = checkZIP;
  document.getElementById('ZIP').oninput = checkZIP;
};

// const form = document.getElementById('form');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   // window.location.href = '/welcome.html';
// });
