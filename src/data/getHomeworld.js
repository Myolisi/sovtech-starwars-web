import { gql, useQuery } from '@apollo/client';

const homeworld = gql`
  query Homeland($getHomelandId: Int!) {
    getHomeworld(id: $getHomelandId) {
      name
      climate
      terrain
    }
  }
`;

export const GetHomeworld = (getHomelandId) => {
  const { data, error, loading } = useQuery(homeworld, {
    variables: {
      getHomelandId,
    },
  });

  return {
    data,
    error,
    loading,
  };
};
