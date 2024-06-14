export const checkValidData = (name, email, password) => {
  if (name !== null) {
    const isNameValid =
      /^[A-Za-z0-9]+(([' -][A-Za-z0-9 ])?[A-Za-z0-9]*)*$/.test(name);
    if (!isNameValid) return "Name is not valid";
  }
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
