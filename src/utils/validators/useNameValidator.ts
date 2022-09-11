const useNameValidator = (value: string) => {
  const regex = /(^[A-Z|А-Я]{1}[a-zа-я]{1,14})/;
  return regex.test(value);
};
export default useNameValidator;
