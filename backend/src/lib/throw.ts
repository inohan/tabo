export const throw_ = (exception: Error) => {
  throw exception;
};

export const throwUnexpected_ = (msg?: string) => {
  throw new Error(msg);
};
