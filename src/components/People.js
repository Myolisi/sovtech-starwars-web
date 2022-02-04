import './People.css';

import { Alert, Backdrop, Box, Button, ButtonGroup, Container, Grid, LinearProgress, Pagination, TextField, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AllPeople } from '../data/getPeople';
import { PeopleByName } from './../data/getPeopleByName';
import PeopleCard from './PeopleCard';

export function People() {
  const navigate = useNavigate();
  // Pagination
  let [next, setNext] = useState(Number(1));

  let [pageCount, setPageCount] = useState(next);
  let [pageSize, setPageSize] = useState(next);

  const [isSearch, setIsSearch] = useState('');
  const [searchValue, setSeachValue] = useState('');
  const [value, setValue] = useState('');

  let { loading, error, data } = AllPeople(parseInt(next));
  let { loading: searchLoading, error: searchError, data: searchData } = PeopleByName(value);

  useEffect(() => {
    // We want to make sure we have a page
    if (data && data.people[data.people.length - 1].next !== 0) {
      setPageCount(++next);
    }
    if (data && pageCount >= pageSize && data.people[data.people.length - 1].next !== 0) {
      setPageSize(pageCount);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  // Remove warning on state

  const handlePagination = (event, value) => {
    setNext(value);
  };

  if (error) {
    return <Alert severity="error">{JSON.stringify(error)}</Alert>;
  }

  const doSearch = () => {
    setValue(searchValue);
    setIsSearch(true);
  };

  const cancelSearch = () => {
    setSeachValue('');
    setIsSearch(false);
  };

  const people = () => {
    if (!isSearch && data) {
      return data.people.map((person, index) => (
        <Grid item xs={6} key={index}>
          <PeopleCard person={person} />
        </Grid>
      ));
    } else if (isSearch && searchData) {
      return searchData.getPeopleByName.map((person, index) => (
        <Grid item xs={12} key={index}>
          <PeopleCard person={person} />
        </Grid>
      ));
    }
  };

  return (
    <div className="container">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading && searchLoading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <Pagination sx={{ ml: 15, fontSize: 30, visibility: loading || searchValue ? 'hidden' : 'visible' }} count={pageCount > pageSize ? pageCount : pageSize} color="secondary" onChange={handlePagination} />
            </Container>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default People;
