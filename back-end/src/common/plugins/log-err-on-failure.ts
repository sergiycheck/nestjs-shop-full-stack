import { deverr } from '../loggers/devLogger';

export const LogErrOnFailure = {
  async requestDidStart(_requestContext: any) {
    return {
      async parsingDidStart() {
        return async (err) => {
          if (err) {
            deverr(err);
          }
        };
      },
      async validationDidStart() {
        // This end hook is unique in that it can receive an array of errors,
        // which will contain every validation error that occurred.
        return async (errs) => {
          if (errs) {
            errs.forEach((err) => deverr(err));
          }
        };
      },
      async executionDidStart() {
        return {
          async executionDidEnd(err) {
            if (err) {
              deverr(err);
            }
          },
        };
      },
    };
  },
};
