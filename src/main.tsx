import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { createHashRouter, RouterProvider } from "react-router-dom"
import Create from "./pages/create/Create.tsx"
import Properties from "./pages/create/Properties.tsx"
import Services from "./pages/create/Services.tsx"
import SiteSettings from "./pages/create/SiteSettings.tsx"
import Testimonials from "./pages/create/Testimonials.tsx"

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "create",
        element: <Create />,
        children: [
          {
            path: "properties",
            element: <Properties />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "site_settings",
            element: <SiteSettings />,
          },
          {
            path: "testimonials",
            element: <Testimonials />,
          },
        ],
      },
    ],
  },
])
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
