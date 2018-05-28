import React from 'react';

export default ({ error }) => {
  if (error) {
    return <div>Error</div>
  } else {
    return <div>Loading...</div>;
  }
}
