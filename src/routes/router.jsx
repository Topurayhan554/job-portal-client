import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import MainLayouts from "../layouts/mainLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
