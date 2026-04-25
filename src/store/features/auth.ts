export type GoogleSignupAction = {
  type: 'auth/googleSignup/fulfilled' | 'auth/googleSignup/rejected';
  payload?: string;
};

type GoogleSignupThunk = (() => Promise<GoogleSignupAction>) & {
  fulfilled: {
    match: (action: GoogleSignupAction) => boolean;
  };
  rejected: {
    match: (action: GoogleSignupAction) => boolean;
  };
};

const fulfilledType = 'auth/googleSignup/fulfilled';
const rejectedType = 'auth/googleSignup/rejected';

export const googleSignup = (() =>
  Promise.resolve<GoogleSignupAction>({
    type: fulfilledType,
  })) as GoogleSignupThunk;

googleSignup.fulfilled = {
  match: (action) => action.type === fulfilledType,
};

googleSignup.rejected = {
  match: (action) => action.type === rejectedType,
};
