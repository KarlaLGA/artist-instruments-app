import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import { GET_ARTISTS_INSTRUMENTS } from "../../queries/index";
import Instrument from "../listItems/Instrument";
import DisplayCard from '../cards/DisplayCard'

const Instruments = (props) => {
  const { loading, error, data } = useQuery(GET_ARTISTS_INSTRUMENTS);

  const artistId = props.artistId;

  const [instruments, setInstruments] = useState([])

  useEffect(() => {
      if(!loading) {
        const relatedInstruments = data.instruments.filter(instrument => instrument.artistId === artistId);
        setInstruments(relatedInstruments)
      }
      
  }, [loading, data, artistId])


  //console.log(data);

  return (
    <ul>
        <DisplayCard>
      {instruments.map(({ id, year, brand, type, price }) => (
          <Container key={id}>
            <List>
              <Instrument year={year} brand={brand} type={type} price={price} key={id} />
            </List>
          </Container>
        ))}
        </DisplayCard>
    </ul>
  );
};

export default Instruments;
