import React from 'react';
import { Grid } from 'react-loader-spinner';

const overLay =  {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  zIndex: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
}

export default function Loader() {
  return (
    <div style={overLay}>
      <Grid
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}
