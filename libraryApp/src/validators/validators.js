export const emailValidator = email => {
  const reg = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";
    if (!email) {
      return "Email is required";
    } else if (reg.test(email) === false) {
      return "Incorrect email format";
    }
    return "";
};
  
export const stringValidator = string => {
    if (!string) {
      return "Required field";
    }
    return "";
};

export const phoneValidator = phone => {
  const reg = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
    if (!phone) {
        return "Phone is required"
    }else if (reg.test(phone) === false){
        return "Invalid phone number format"
    }
    return "";
}
  
export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};