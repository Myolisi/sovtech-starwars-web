import { Button, Grid, Card, CardContent, Typography, CardActions, Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchPerson } from '../store/personDetails';
import { Person } from '@mui/icons-material';

function Details(props) {
  const person = useSelector((state) => state.person.value);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <Box sx={{ bgcolor: 'primary.main', width: '100%', height: '100%' }}></Box>
                </Grid>
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
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Details;
