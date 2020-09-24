import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { NEW_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(NEW_REVIEW);
  const client = useApolloClient();

  const newReview = async ({ owner, name, rating, review }) => {
    const payload = await mutate({ variables: { owner, name, rating, review } });
    return payload;
  };

  return [newReview, result];
};

export default useReview;