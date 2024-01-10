export const getPasswordStrength = (password) => {
    if(password.length < 3) return "Very Poor";
    else if(password.length < 7) return "Poor";
    else if(password.length < 12)   return "Medium";
    else if(password.length < 18)   return "Strong";
    return "Very Strong";
}
