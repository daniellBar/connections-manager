import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { CLIENT_ROUTES } from "./routes";
import { ConnectionManagerPage } from "../features/Connections/ConnectionsManager/ConnectionManagerPage";
import { ConnectionDetails } from "../features/Connections/ConnectionDetails/ConnectionDetails";

const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.Main,
    element: <App />,
    children: [
      {
        index: true,
        element: <ConnectionManagerPage />,
      },
      {
        path: CLIENT_ROUTES.ConnectionPage,
        element: <ConnectionDetails />,
      },
    ],
  },
]);

export default router;
