import './People.css';

import { Alert, Box, Button, ButtonGroup, Container, Grid, LinearProgress, Pagination, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AllPeople } from '../data/getPeople';
import { PeopleByName } from './../data/getPeopleByName';
import PeopleCard from './PeopleCard';

export function People() {
  const navigate = useNavigate();
  let [next, setNext] = useState('');
  const [isSearch, setIsSearch] = useState('');
  const [searchValue, setSeachValue] = useState('');
  const [isError, setIsError] = useState('');

  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  let { loading, error, data } = AllPeople();
  let { loading: searchLoading, error: searchError, data: searchData } = PeopleByName(searchValue);

  useEffect(() => {
    console.log(data);
    if (!data)
      return (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      );
    if (searchError) {
      setIsError('true');
      return <Alert severity="error">There was a problem loading data, please refresh</Alert>;
    }
  }, [data]);

  if (loading)
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  if (error) {
    return <Alert severity="error">There was a problem loading data, please refresh</Alert>;
  }

  const doPageNext = (next) => {
    console.log(data.people[0].next);
    setNext(next);
  };

  const doPagePrev = (next) => {
    setNext(next);
  };

  const doSearch = () => {
    setValue(searchValue);
    setIsSearch(true);
  };

  const cancelSearch = () => {
    setSeachValue('');
    setIsSearch(false);
  };

  // TODO: mode card to saperate component
  const people = () => {
    if (!isSearch && data) {
      console.log('not searching bra');
      return data.people.map((person, index) => (
        <Grid item xs={6} key={index}>
          <PeopleCard person={person} />
        </Grid>
      ));
    } else if (isSearch && searchData) {
      console.log('searching ..', searchData);
      return searchData.getPeopleByName.map((person, index) => (
        <Grid item xs={12} key={index}>
          <PeopleCard person={person} />
        </Grid>
      ));
    }
  };

  return (
    <div className="container">
      <Box sx={{ mt: 0, p: 0 }}>
        <Container maxWidth="md">
          <Grid container spacing={1}>
            <Grid item md={7}>
              <TextField sx={{ mr: 0, mb: 4 }} fullWidth={true} value={searchValue} onChange={(e) => setSeachValue(e.target.value)} label="Search" variant="filled" />
            </Grid>
            <Grid item md={3}>
              <ButtonGroup variant="contained" size="large">
                <Button disabled={!searchValue} onClick={doSearch} variant="contained" color="primary">
                  Search
                </Button>
                <Button onClick={cancelSearch} variant="contained" color="warning">
                  Cancel
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Box sx={{ mb: 4 }}>
            <Container maxWidth="md">
              <Grid container spacing={2}>
                {people()}
              </Grid>
            </Container>
          </Box>
          <Box>
            <Container maxWidth="sm">
              <Pagination sx={{ ml: 15, fontSize: 24 }} count={5} />
            </Container>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default People;
