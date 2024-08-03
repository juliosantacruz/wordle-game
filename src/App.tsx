import { Suspense } from "react";
import AppRoutes from "@/routes/router";


function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <AppRoutes />

    </Suspense>

  );
}

export default App;
