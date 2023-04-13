import { ReactNode, createContext, useState } from "react";
interface Props {
  children: React.ReactNode;
}
type TokenType = string;
type IAuthContext = {
  token: TokenType;
  setToken?: (token: TokenType) => void;
  getToken?: () => TokenType;
};

const defaultState = {
  token: "",
};
export const AuthContext = createContext<IAuthContext>(defaultState);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  const setToken = (token: TokenType) => {
    setAuthToken(token)
  };
  const getToken = () =>{
    return authToken
  }
  const value = {
    token:authToken,
    setToken:setToken,
    getToken:getToken
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthContextProvider