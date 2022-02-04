import { gql, useQuery } from '@apollo/client';

const peopleQue = gql`
  query people($next: Int!) {
    people(next: $next) {
      name
      mass
      height
      homeworld
      gender
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
