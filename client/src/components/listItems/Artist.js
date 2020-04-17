import React, { Fragment } from 'react'

import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

import RemoveArtist from '../buttons/RemoveArtist'
import DisplayCard from '../cards/DisplayCard'

import Instruments from '../lists/Instruments'

const useStyles = makeStyles({
  label: {
    textDecoration: 'none'
  }
})

const Artist = (props) => {
  const classes = useStyles()

  const artistId = props.id;
  const firstName = props.firstName;
  const lastName = props.lastName;
  return (
    <DisplayCard>
      <Fragment>
        <ListItem>
          <ListItemText primary={`${firstName} ${lastName}`} />
          <Button variant='contained' style={{ margin: '5px' }}>
            Edit
          </Button>
          <RemoveArtist />
        </ListItem>
        <Instruments artistId={artistId}/>
        <CardActions>
          <Button color='primary' size='small' variant='outlined'>
            Learn More
          </Button>
        </CardActions>
      </Fragment>
    </DisplayCard>
  )
}

export default Artist
