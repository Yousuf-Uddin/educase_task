export interface User {
  fullName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  companyName?: string;
  isAgency?: boolean;
  avatarUrl?: string;
  bio?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: User) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export enum RoutePath {
  WELCOME = '/',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  PROFILE = '/profile',
}