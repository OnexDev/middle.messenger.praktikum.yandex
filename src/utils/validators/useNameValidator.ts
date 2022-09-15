const useNameValidator = (value: string) => {
  const regex = /^[А-ЯЁA-Z][a-zA-Zа-яёЁ]+$/;
  return regex.test(value);
};
export default useNameValidator;
