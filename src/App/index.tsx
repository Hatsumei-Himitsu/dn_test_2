import React, { Suspense } from 'react';

import Spinner from '../components/Spinner';

const SomeConvenientWidget = React.lazy(() => import('../SomeConvenientWidget'));

function App() {
  return (
    <div className="app">
      <Suspense fallback={<Spinner />}>
        <SomeConvenientWidget />
      </Suspense>
    </div>
  );
}

export default App;
