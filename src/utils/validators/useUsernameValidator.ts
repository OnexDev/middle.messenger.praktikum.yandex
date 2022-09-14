const useUsernameValidator = (value: string) => {
  const atLeastOneLetter = /[a-zA-Z]/.test(value);
  const onlyValidChars = /^[A-Za-z0-9-_]+$/.test(value);

  return atLeastOneLetter && onlyValidChars && value.length > 3 && value.length < 20;
};
export default useUsernameValidator;
