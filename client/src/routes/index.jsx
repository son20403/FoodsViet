import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "../layout/MainLayout";
import NotFound404 from "../pages/not-found/NotFound404";
import ScrollToTop from "../layout/common/ScrollToTop";
import { ThemeProvider } from "@material-tailwind/react";
import LoadingPage from "../layout/loading/LoadingPage";
import Admin from "../ADMIN/Admin";
const PostPageAdmin = lazy(() => import("../pages/adminPage/PostPageAdmin"));
const CustomersPageAdmin = lazy(() => import("../pages/adminPage/CustomerPageAdmin"));
const CategoryPageAdmin = lazy(() =>
  import("../pages/adminPage/CategoryPageAdmin")
);

const SignInPageAdmin = lazy(() =>
  import("../pages/adminPage/SignInPageAdmin")
);

const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const InfoUser = lazy(() => import("../pages/InfoUser"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const SignInSignUp = lazy(() => import("../pages/SignInSignUp"));
const PostPage = lazy(() => import("../pages/PostPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AddNewPosts = lazy(() => import("../pages/AddNewPosts"));
const MessagePage = lazy(() => import("../pages/MessagePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppCustomer />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/categories", element: <CategoryPage /> },
      { path: "/info/:slug", element: <InfoUser /> },
      { path: "/detail/:slug", element: <DetailPage /> },
      { path: "/info-user/:id", element: <InfoUser /> },
      { path: "/posts", element: <PostPage /> },
      { path: "/add-post", element: <AddNewPosts /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  { path: "/message/:id", element: <MessagePage /> },
  //   {
  //     path: "/message",
  //     element: <MainLayout />,
  //     children: [
  //       {
  //         path: "",
  //         element: <MessagePage></MessagePage>,
  //       },
  //     ],
  //   },
  { path: "/signin", element: <SignInSignUp /> },
  { path: "/not-found", element: <NotFound404 /> },
  { path: "*", element: <NotFound404 /> },
  {
    path: "/admin",
    element: <AppAdmin />,
    children: [
      { path: "", element: <>Home</> },
      { path: "home", element: <>Home</> },
      { path: "posts", element: <PostPageAdmin /> },
      { path: "categories", element: <CategoryPageAdmin /> },
      { path: "customers", element: <CustomersPageAdmin /> },
      // { path: "edit-post/:slug", element: <EditPost /> },
      // { path: "edit-customer/:id", element: <EditCustomer /> },
      // { path: "edit-admin/:id", element: <EditAdmin /> },
      // { path: "edit-category/:slug", element: <EditCategory /> },
      // { path: "list-category", element: <ListCategory /> },
      // { path: "list-customer", element: <ListCustomer /> },
      // { path: "list-admin", element: <ListAdmin /> },
      // { path: "add-post", element: <AddPost /> },
      // { path: "add-category", element: <AddCategory /> },
      // { path: "add-customer", element: <AddCustomer /> },
      // { path: "add-admin", element: <AddAdmin /> },
    ],
  },
  { path: "admin/signin", element: <SignInPageAdmin /> },
]);
function AppCustomer() {
  return (
    <>
      <ScrollToTop />
      <MainLayout />
    </>
  );
}
function AppAdmin() {
  return (
    <>
      <ScrollToTop />
      <Admin />
    </>
  );
}
