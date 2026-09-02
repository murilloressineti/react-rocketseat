import { createBrowserRouter } from "react-router";

import { AppLayout } from "../components/layout";

import { Refunds, RefundDetails, NewRefund } from "../pages";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Refunds />,
      },
      {
        path: "/new",
        element: <NewRefund />,
      },
      {
        path: "/:id",
        element: <RefundDetails />,
      },
    ],
  },
]);
