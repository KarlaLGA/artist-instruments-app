import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useQuery } from "@apollo/react-hooks";

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles'

import Select from '@material-ui/core/Select';
import { v4 as uuidv4 } from 'uuid'

import { ADD_INSTRUMENT, GET_ARTISTS_INSTRUMENTS, GET_ARTISTS } from '../../queries/index'


const getStyles = () => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
  });

const AddArtist = () => {

    const styles = getStyles()

  const [id] = useState(uuidv4());
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artists, setArtists] = useState([]);

  const { loading, error, data } = useQuery(GET_ARTISTS);

  useEffect(() => {
      if(!loading) {
          setArtists(data.artists);
      }
  }, [data, loading])

  console.log(artists);
  

  const [ addInstrument ] = useMutation(ADD_INSTRUMENT, {
    update(cache, { data: { addInstrument } }) {
      const { instruments } = cache.readQuery({ query: GET_ARTISTS_INSTRUMENTS });
      cache.writeQuery({
        query: GET_ARTISTS_INSTRUMENTS,
        data: { instruments: instruments.concat([addInstrument]) },
      });
    },
  });

  const handleArtist = (e) => {
    setArtistId(e.target.value)
    setArtistName(e.target.text)
  };
  
  return (
    <form
    style={styles.form}
    onSubmit={(e) => {
        e.preventDefault();
        addInstrument({
          variables: {
            id, 
            year, 
            brand, 
            type, 
            price, 
            artistId
          },
          optimisticResponse: {
            __typename: "Mutation",
            addInstrument: {
              __typename: "Instrument",
                id, 
                year, 
                brand, 
                type, 
                price, 
                artistId
            },
          },
          update: (proxy, { data: { addInstrument } }) => {
            const data = proxy.readQuery({ query: GET_ARTISTS_INSTRUMENTS });
            proxy.writeQuery({
              query: GET_ARTISTS_INSTRUMENTS,
              data: {
                ...data,
                instruments: [...data.instruments, addInstrument],
              },
            });
          },
        });
      }}
      >
      <TextField
        label='Year'
        placeholder='i.e. 1980'
        margin='normal'
        variant='outlined'
        onChange={e => setYear(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TextField
        label='Brand'
        placeholder='i.e. Gibson'
        margin='normal'
        variant='outlined'
        onChange={e => setBrand(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TextField
        label='Type'
        placeholder='i.e. Electric Guitar'
        margin='normal'
        variant='outlined'
        onChange={e => setType(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TextField
        label='Price'
        placeholder='i.e. $5,000'
        margin='normal'
        variant='outlined'
        onChange={e => setPrice(e.target.value)}
        style={{ margin: '10px' }}
      />

      <FormControl variant="filled" className="artist">
        <InputLabel htmlFor="filled-artist-native-simple">Artist</InputLabel>
        <Select
          native
          value={artistName}
          onChange={handleArtist}
          inputProps={{
            name: 'artist',
            id: 'filled-artist-native-simple',
          }}
        >
          {(artists.length > 0) &&
          artists.map(artist => (
            <option value={artist.id} key={artist.id}>{`${artist.firstName} ${artist.lastName}`}</option>
          ))}
        </Select>
      </FormControl>

      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginTop: '20px', alignItems: 'center', marginLeft: '10px' }}
      >
        Add Instrument
      </Button>
    </form>
  )
}

export default AddArtist
