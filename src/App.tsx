import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { publicRoutes } from "./Routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import "./App.css";
import { sellerRoutes } from "./Routes/seller";
import SellerLayout from "./Layouts/SellerLayout";
import PrivateRoute from "./Routes/PrivateRoute";
import ScrollToTop from "./Components/scroll/autoScrollTop";
import { userProfileRouter } from "./Routes/UserProfileRoute";
import CheckSubOrder from "./Components/payment/checkSubOrder";
import { adminRoute } from "./Routes/adminRoute";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <CheckSubOrder />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {userProfileRouter.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              >
                {route.children &&
                  route.children.map((childRoute, childIndex) => {
                    const ChildLayout = childRoute.layout || React.Fragment;
                    const ChildPage = childRoute.component;
                    return (
                      <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={
                          <ChildLayout>
                            <ChildPage />
                          </ChildLayout>
                        }
                      />
                    );
                  })}
              </Route>
            );
          })}

          {adminRoute.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              >
                {route.children &&
                  route.children.map((childRoute, childIndex) => {
                    const ChildLayout = childRoute.layout || React.Fragment;
                    const ChildPage = childRoute.component;
                    return (
                      <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={
                          <ChildLayout>
                            <ChildPage />
                          </ChildLayout>
                        }
                      />
                    );
                  })}
              </Route>
            );
          })}

          {sellerRoutes.map((route, index) => {
            const Layout = route.layout || SellerLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              >
                {route.children &&
                  route.children.map((child, childIndex) => {
                    const ChildPage = child.component;
                    return (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={<ChildPage />}
                      />
                    );
                  })}
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
