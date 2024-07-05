import * as yup from 'yup';
import useUserStore from '../zustandstore/userApisStore';
export const schema = () => {

const { users , selectedUser } = useUserStore.getState();
return yup.object().shape({
    
  name: yup.string().trim().required("Name is a required field*"),
  email: yup.string()
    .email("Invalid email format").required("Email is a required field*")
    .test('unique-email', 'Email already exists', value => !users.some(user => user.email === value && user.id !== selectedUser.id)),
  country: yup.string().required("Country is a required field*").test('not-usa', 'USA country is not allowed', value => value !== 'USA'),
    phone_number: yup.string().required("Phone number is a required field*")
    .matches(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
    key: yup.string().required("Key is a required field*"),
    user_type: yup.string()
      .required("User type is a required field*")
      .test('not-personal', 'Personal user type is not allowed', value => value !== 'Personal'),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is a required field*"),
    confirm_password: yup.string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Confirm password is a required field*"),
  });
};

export const passwordChangeSchema = yup.object().shape({
  oldPassword: yup.string().required('Current password is required'),
  newPassword: yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});
