import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./Routes";
import DefaultLayout from "./Layouts/DefaultLayout"; // Ensure correct import path
import "./App.css";
import { sellerRoutes } from "./Routes/seller";
import SellerLayout from "./Layouts/SellerLayout";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
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

          {sellerRoutes.map((route, index) => {
            const Layout = route.layout || SellerLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }>
                {route.children &&
                  route.children.map((child, childIndex) => {
                    const ChildPage = child.component;
                    return (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={
                            <ChildPage />
                        }
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
