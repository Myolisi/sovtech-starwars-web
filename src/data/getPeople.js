import { gql, useQuery } from '@apollo/client';

const peopleQue = gql`
  query people($next: String!) {
    people(next: $next) {
      name
      gender
      height
      mass
      homeworld
      next
    }
  }
`;

export const AllPeople = (next) => {
  const { data, error, loading } = useQuery(peopleQue, {
    variables: {
      next,
    },
  });

  return {
    data,
    error,
    loading,
  };
};
