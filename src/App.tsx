import React from "react";
import { BrowserRouter as Router, Routes, Route, useRoutes, RouteObject } from 'react-router-dom';
import { publicRoutes } from "./Routes";
// import DefaultLayout from "./Layouts/DefaultLayout"; // Ensure correct import path
import "./App.css";
// import { Route } from "./Type";
export interface AppRoute {
  path: string;
  component: React.FC<any>;
  layout?: React.FC<any> | null;
  children?: AppRoute[];
}
const AppRoutes: React.FC = () => {
  const generateRoutes = (routes: AppRoute[]): RouteObject[] => {
    return routes.map((route) => {
      const Component = route.component;
      const element = route.layout ? (
        <route.layout>
          <Component />
        </route.layout>
      ) : (
        <Component />
      );

      return {
        path: route.path,
        element: element,
        children: route.children ? generateRoutes(route.children) : [],
      };
    });
  };

  return useRoutes(generateRoutes(publicRoutes));
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {publicRoutes.map((route, index) => {
//             const Layout = route.layout || DefaultLayout;
//             const Page = route.component;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={
//                   <Layout>
//                     <Page />
//                   </Layout>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </div>
//     </Router>
//   );
// };


