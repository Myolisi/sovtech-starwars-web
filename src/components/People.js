import './People.css';
import { Alert, Backdrop, Box, Button, ButtonGroup, CircularProgress, Container, Grid, Pagination, TextField, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AllPeople } from '../data/getPeople';
import { PeopleByName } from './../data/getPeopleByName';
import PeopleCard from './PeopleCard';

export function People() {
  // Pagination
  let [next, setNext] = useState(Number(1));

  let [pageCount, setPageCount] = useState(next);
  let [pageSize, setPageSize] = useState(next);

  const [isSearch, setIsSearch] = useState('');
  const [searchValue, setSeachValue] = useState('');
  const [value, setValue] = useState('');

  let { loading, error, data } = AllPeople(parseInt(next));
  let { data: searchData, loading: searchLoader } = PeopleByName(value);

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
    <Box sx={{ mt: 4 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ mt: 0, p: 0 }}>
        <Container maxWidth="md">
          <Grid container spacing={1}>
            <Grid item md={9}>
              <TextField sx={{ mr: 0, mb: 4 }} fullWidth={true} value={searchValue} onChange={(e) => setSeachValue(e.target.value)} label="Search" variant="filled" />
            </Grid>
            <Grid item md={3}>
              <ButtonGroup variant="contained" size="large" sx={{ mt: 1 }}>
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
              <Pagination sx={{ ml: 15, fontSize: 30, visibility: loading || searchValue || isSearch ? 'hidden' : 'visible' }} count={pageCount > pageSize ? pageCount : pageSize} color="secondary" onChange={handlePagination} />
            </Container>

            <Container maxWidth="md">
              {searchLoader && searchValue && <LinearProgress size={24} />}
              {!searchLoader && isSearch && searchData.getPeopleByName.length == 0 && (
                <Alert severity="warning">
                  <Typography variant="p">
                    No results found for <b>{value}</b>
                  </Typography>
                </Alert>
              )}
            </Container>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default People;
