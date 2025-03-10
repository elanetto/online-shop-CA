import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/index.jsx';
import { SpecificProduct } from "./pages/specificProduct.jsx";
import { Checkout } from "./pages/checkout.jsx";
import { Contact } from "./pages/contact.jsx";
import { OrderConfirmation } from './pages/orderConfirmation.jsx';
import { MessageSent } from './pages/messageSent.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/:id",
        element: <SpecificProduct />,
      },
      {
        path: "cart",
        element: <Checkout />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "message-sent",
        element: <MessageSent />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
