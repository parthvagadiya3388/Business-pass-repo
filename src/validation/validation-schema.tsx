import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().trim().required("Name is a required field*"),
    email: yup.string().email("Invalid email format").required("Email is a required field*"),
    country: yup.string().required("Country is a required field*"),
    phone_number: yup.string().required("Phone number is a required field*"),
    key: yup.string().required("Key is a required field*"),
    user_type: yup.string().required("User type is a required field*"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is a required field*"),
    confirm_password: yup.string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Confirm password is a required field*"),
});


export const passwordChangeSchema = yup.object().shape({
    oldPassword: yup.string().required('Current password is required'),
    newPassword: yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your new password'),
  });

