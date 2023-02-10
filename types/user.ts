export type UserType = {
  _id: string;
  username: string;
  role: string;
  domain: string;
  shouldRedirectOnLimit: boolean;
  affiliateCodes: string[];
};
