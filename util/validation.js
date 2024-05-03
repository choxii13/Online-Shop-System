function passwordAreValid(password) {
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  if (isEmpty(password)) {
    return isEmpty(password);
  }
  if (!password.match(lowerCaseLetters)) {
    return "Password must contain a lowercase letter";
  }
  if (!password.match(upperCaseLetters)) {
    return "Password must contain an uppercase letter";
  }
  if (!password.match(numbers)) {
    return "Password must contain numbers";
  }
  if (password.length <= 8) {
    return "Password have atleast 8 minimum characters ";
  }
}

function passwordAreEqual(password, confirmPassword) {
  if (isEmpty(password) || isEmpty(confirmPassword)) {
    return isEmpty(password) || isEmpty(confirmPassword);
  }
  if (password !== confirmPassword) {
    return "Password are not equal";
  }
}

function isEmpty(value) {
  if (value.trim() === "") {
    return "Please input a value";
  }
}

function emailIsValid(email, hasSameEmail) {
  if (isEmpty(email)) {
    return isEmpty(email);
  }
  if (hasSameEmail) {
    return "Email Already Exists";
  }
  if (!email.includes("@") || !email.includes("@")) {
    return 'Email does not have "@"';
  }
}

function loginEmail(email, hasSameEmail) {
  console.log(email);
  if (isEmpty(email)) {
    return isEmpty(email);
  }

  if (!hasSameEmail) {
    return "Email does not exists";
  }
}

function loginPassword(password) {
  if (!password) {
    return "Incorrect email or password";
  }
}

function userDetailsAreValid(
  hasSameEmail,
  email,
  password,
  fullname,
  street,
  city,
  postalCode,
  confirmPassword
) {
  if (fullname || street || city || postalCode || confirmPassword) {
    console.log(fullname);
    return {
      email: emailIsValid(email, hasSameEmail),
      password: passwordAreValid(password),
      fullname: isEmpty(fullname),
      street: isEmpty(street),
      city: isEmpty(city),
      ["postal-code"]: isEmpty(postalCode),
      ["new-password"]: passwordAreEqual(password, confirmPassword),
    };
  }

  return {
    email: loginEmail(email, hasSameEmail),
    password: loginPassword(password),
  };
}

module.exports = { userDetailsAreValid };
