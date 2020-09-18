import { useQuery } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, loading } = useQuery(GET_REPOSITORIES);

  const fetchRepositories = async () => {
    if(!loading) setRepositories(data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, [loading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;