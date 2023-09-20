// src/components/Skeleton.js
import React from 'react';
import { Card, CardContent } from '@mui/material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loader = ({noCard, noDark}) => {

  return (
    <React.Fragment>
{
[...Array(noCard)].map((item, index)=> (
<Card key={index}>
        <CardContent>
          <Skeleton count={noDark} />
        </CardContent>
      </Card>
))
      
      
}

    </React.Fragment>
  );
};

export default Loader;
