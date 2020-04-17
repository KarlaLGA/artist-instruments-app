import React from 'react'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

import RemoveArtist from '../buttons/RemoveArtist'


const useStyles = makeStyles({
  label: {
    textDecoration: 'none'
  }
})

const Instrument = (props) => {
  const classes = useStyles()

  const year = props.year;
  const brand = props.brand;
  const type = props.type;
  const price = props.price;

  return (

        <ListItem>
          <ListItemText primary={`${year}`} />
          <ListItemText primary={`${brand}`} />
          <ListItemText primary={`${type}`} />
          <ListItemText primary={`${price}`} />
          <Button variant='contained' style={{ margin: '5px' }}>
            Edit
          </Button>
          <RemoveArtist />
        </ListItem>

  )
}

export default Instrument
