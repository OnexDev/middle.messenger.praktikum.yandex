const usePasswordValidator = (value: string) => {
  const regex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,40}$/;
  return regex.test(value);
};
export default usePasswordValidator;
