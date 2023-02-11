export type UserType = {
  _id: string;
  username: string;
  role: string;
  domain: string;
  shouldRedirectOnLimit: boolean;
  shouldAlwaysRedirect: boolean;
  affiliateCodes: string[];
};
