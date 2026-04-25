import { googleSignup } from './features/auth';

type GoogleSignupAction = Awaited<ReturnType<typeof googleSignup>>;

export function useAppDispatch() {
  return async (action: Promise<GoogleSignupAction>) => action;
}
