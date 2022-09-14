const usePasswordValidator = (value: string) => {
  const regex = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
  return regex.test(value);
};
export default usePasswordValidator;
