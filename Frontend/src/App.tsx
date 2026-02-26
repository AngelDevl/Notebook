import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import Loading from "./components/Helper/Loading";
import NotFoundPage from "./components/Helper/NotFoundPage";
import NavigationBar from "./components/Navbar/NavigationBar";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Suspense fallback={<Loading width={"7rem"} height={"7rem"} />}>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                Component={route.component}
              />
            );
          })}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
