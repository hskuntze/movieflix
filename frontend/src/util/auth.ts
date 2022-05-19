import jwtDecode from "jwt-decode";
import { getAuthData } from "./storage";

export type Role = "ROLE_VISITOR" | "ROLE_MEMBER";

export type TokenData = {
  exp: number;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (err) {
    return undefined;
  }
};

export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    return roles.some((r) => tokenData.authorities.includes(r));
  }

  return false;
};
