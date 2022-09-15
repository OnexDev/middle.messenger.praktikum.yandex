const usePhoneValidator = (value: string) => {
  const regex = /^\+?\d{10,15}$/;
  return regex.test(value);
};
export default usePhoneValidator;
