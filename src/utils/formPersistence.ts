import { SignupReq } from '@/dtos/auth.dto';

const SIGNUP_FORM_KEY = 'signup_form_data';

export const saveSignupFormData = (data: Partial<SignupReq>) => {
  try {
    localStorage.setItem(SIGNUP_FORM_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save signup form data:', error);
  }
};

export const getSignupFormData = (): Partial<SignupReq> | null => {
  try {
    const data = localStorage.getItem(SIGNUP_FORM_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Failed to load signup form data:', error);
    return null;
  }
};

export const clearSignupFormData = () => {
  try {
    localStorage.removeItem(SIGNUP_FORM_KEY);
  } catch (error) {
    console.warn('Failed to clear signup form data:', error);
  }
};
