import { Person, Terrain } from '@mui/icons-material';
import { Box, Card, CardContent, CircularProgress, Container, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetHomeworld } from './../data/getHomeworld';

function Details(props) {
  const person = useSelector((state) => state.person.value);
  let id;

  if (person) {
    const { homeworld } = person;

    id = homeworld.replace(/\D/g, '');
    console.log(homeworld, id);
  }

  const { loading, error, data } = GetHomeworld(id ? Number(id) : 0);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={2}>
                {/*  <Grid item xs={1}>
                  <Box sx={{ bgcolor: 'primary.main', width: '100%', height: '100%' }}></Box>
                </Grid> */}
                <Grid item xs={5}>
                  <Person sx={{ fontSize: 250 }} />
                </Grid>

                {/* User details */}
                <Grid item xs={6}>
                  <CardContent variant="outlined">
                    <Typography sx={{ fontSize: 45, mb: 3 }} variant="h1" color="text.primary" gutterBottom>
                      {person.name}
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} variant="h4" color="text.dark" gutterBottom>
                      GENDER
                    </Typography>
                    <Typography sx={{ fontSize: 16, mb: 2 }} color="text.secondary" gutterBottom>
                      {person.gender === 'n/a' ? 'Not Applicable' : person.gender}
                    </Typography>

                    <Typography sx={{ fontSize: 15 }} variant="h4" color="text.dark" gutterBottom>
                      HEIGHT
                    </Typography>
                    <Typography sx={{ fontSize: 16, mb: 2 }} color="text.secondary" gutterBottom>
                      {person.height}
                    </Typography>

                    <Typography sx={{ fontSize: 15 }} variant="h4" color="text.dark" gutterBottom>
                      MASS
                    </Typography>
                    <Typography sx={{ fontSize: 16, mb: 2 }} color="text.secondary" gutterBottom>
                      {person.mass}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12}>
                  <Container>
                    <Typography sx={{ fontSize: 20 }} variant="h4" color="text.dark" gutterBottom>
                      <Terrain sx={{ fontSize: 40, mb: -1.1 }} />
                      HOMEWORLD
                    </Typography>
                    <Divider />
                  </Container>
                  <Box sx={{ width: '100%', height: '100%', p: 3 }}>
                    <Typography sx={{ fontSize: 16, mb: 2 }} color="text.secondary" gutterBottom>
                      <b>Name</b> {data ? data.getHomeworld.name : '...'}
                    </Typography>
                    <Typography sx={{ fontSize: 16, mb: 2 }} color="text.secondary" gutterBottom>
                      <b>Climate</b> {data ? data.getHomeworld.climate : '...'}
                    </Typography>
                    <Typography sx={{ fontSize: 19, mb: 2 }} color="text.secondary" gutterBottom>
                      <b>Terrain</b> {data ? data.getHomeworld.terrain : '...'}
                    </Typography>

                    {loading && <CircularProgress size={24} />}
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Details;
