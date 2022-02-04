import { Person, Terrain } from '@mui/icons-material';
import { Box, Card, CardContent, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { GetHomeworld } from './../data/getHomeworld';

function Details(props) {
  const person = useSelector((state) => state.person.value);
  let id;

  // Get homeworld id for the currently viewed person
  if (person) {
    const { homeworld } = person;
    id = homeworld.replace(/\D/g, '');
  }

  const { loading, data } = GetHomeworld(id ? Number(id) : 0);

  return (
    <Box sx={{ bgcolor: '#F3EEEE', width: '100%', height: '100vh' }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Card sx={{ mt: 5 }}>
                <Grid container spacing={2}>
                  {/*  <Grid item xs={1}>
                  </Box>
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

                      {loading && <LinearProgress size={24} />}
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Details;
