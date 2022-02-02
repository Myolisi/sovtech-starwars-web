import { AccountCircleOutlined } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { dispatchPerson } from '../store/personDetails';

function PeopleCard(props) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ backgroundColor: '#F9F7F7' }}>
      <CardContent variant="outlined">
        <AccountCircleOutlined sx={{ fontSize: 55 }} />
        <Typography sx={{ fontSize: 25 }} variant="h5" color="text.primary" gutterBottom>
          {props.person.name}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {props.person.gender.toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => dispatch(dispatchPerson(props.person))} component={RouterLink} to={`/people/${props.person.name}`} variant="outlined">
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
}

export default PeopleCard;
