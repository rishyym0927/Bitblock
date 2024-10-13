import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { Mint } from "@/pages/Mint";
import { CreateCollection } from "@/pages/CreateCollection";
import { MyCollections } from "@/pages/MyCollections";
import { TopBanner } from "./components/TopBanner";
import { IS_DEV } from "./constants";
import Landing from "./pages/Landing";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "create-collection",
        element: <CreateCollection />,
      },
      {
        path: "my-collections",
        element: <MyCollections />,
      },{
        path:"mint",
        element: <Mint />
      }
    ],
  },
]);

function App() {
  return (
    <>
    
      <RouterProvider router={router} />
    </>
  );
}

export default App;
