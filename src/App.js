import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {LoadingCustom} from "./components"
import {ErrorBoundary} from 'react-error-boundary'
function ErrorHandler({error}) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}
function App() {
  const Dashboard = lazy(() => import("./pages/Fermentors"));
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>

  <Suspense fallback={ <LoadingCustom/>}>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Dashboard />} />
  </Routes>
  
  </BrowserRouter></Suspense>
  </ErrorBoundary>
  )
}

export default App;