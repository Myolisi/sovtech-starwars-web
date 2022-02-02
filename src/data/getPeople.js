import { gql, useQuery } from '@apollo/client';

const peopleQue = gql`
  query {
    people {
      name
      gender
      height
      mass
      homeworld
    }
  }
`;

export const AllPeople = () => {
  const { loading, error, data } = useQuery(peopleQue);
  return {
    loading,
    error,
    data,
  };
};
