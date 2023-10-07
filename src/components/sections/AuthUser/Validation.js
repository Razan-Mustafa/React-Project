function validation(value) {
  let errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  const namePattern = /^[a-zA-Z0-9_-]{3,16}$/;

  if (!emailPattern.test(value.email)) {
    errors.email = "The email empty";
  }

  if (value.name === "") {
    errors.name = "The Username is empty";
  } else if (!namePattern.test(value.name)) {
    errors.name =
      "Name must be 3 to 16 charts.";
  }

  if (value.password === "") {
    errors.password = "The password is empty";
  } else if (!passwordPattern.test(value.password)) {
    errors.password =
      "Password must be at least 8 charact, contain one letter & one digit.";
  } 
  
  return errors;
}

export default validation;
