import { gql, useQuery } from '@apollo/client';

const peopleByNameQue = gql`
  query GetbyName($name: String!) {
    getPeopleByName(name: $name) {
      name
      gender
      height
      mass
      homeworld
      next
    }
  }
`;

export const PeopleByName = (name) => {
  const { data, error, loading } = useQuery(peopleByNameQue, {
    variables: {
      name,
    },
  });

  return {
    data,
    error,
    loading,
  };
};
