import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

function LoadingComponent() {
  const [loading, setLoading] = useState(false);

  const handleAsyncOperation = async () => {
    setLoading(true);
    // Perform asynchronous operation here
    // ...
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <button onClick={handleAsyncOperation}>Start Async Operation</button>
      )}
    </>
  );
}

export default LoadingComponent;

// This code creates a LoadingComponent that displays a CircularProgress component from @material-ui/core while an asynchronous operation is being performed.
// The loading state is used to control when the CircularProgress component is displayed.