import { gql } from 'apollo-boost'

export const GET_ARTISTS = gql`
  {
    artists {
      id
      firstName
      lastName
    }
  }
`

export const ADD_ARTIST = gql`
  mutation AddArtist($id: String!, $firstName: String!, $lastName: String!) {
    addArtist(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist($id: String!, $firstName: String!, $lastName: String!) {
    updateArtist(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_ARTIST = gql`
  mutation RemoveArtist($id: String!) {
    removeArtist(id: $id) {
      id
      firstName
      lastName
    }
  }
`
export const GET_ARTISTS_INSTRUMENTS = gql`
  {
    instruments {
      id, 
      year, 
      brand, 
      type, 
      price, 
      artistId
    }
  }
`

export const ADD_INSTRUMENT = gql`
  mutation AddInstrument($id: String!, $year: String!, $brand: String!, $type: String!, $price: String!, $artistId: String!) {
    addInstrument(id: $id, year: $year, brand: $brand, type: $type, price: $price, artistId: $artistId) {
      id
      year
      brand
      type
      price
      artistId
    }
  }
`