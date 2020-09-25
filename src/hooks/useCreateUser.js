import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const client = useApolloClient();

  const createUser = async ({ username, password }) => {
    const payload = await mutate({ variables: { username, password } });
    return payload;
  };

  return [createUser, result];
};

export default useCreateUser;