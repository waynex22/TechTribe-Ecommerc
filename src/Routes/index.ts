import HomePageComponent from "../Page/Home";
import { Route } from "../Type";
const publicRoutes: Route[]  = [
    {
        path: '/',
        component: HomePageComponent,
        layout: null,
    },

]
export { publicRoutes };