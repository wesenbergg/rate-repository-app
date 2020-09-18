import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const data = await mutate({variables: {username, password}});
    async () => (data.authorize) ? await authStorage.setAccessToken(data.authorize.accessToken): '';
    client.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;