import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import MainLayout from '../layout/MainLayout'
import NotFound404 from '../pages/not-found/NotFound404';
import ScrollToTop from '../layout/common/ScrollToTop';
import { ThemeProvider } from '@material-tailwind/react';
import LoadingPage from '../layout/loading/LoadingPage';

const InfoUser = lazy(() => import("../pages/InfoUser"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const SignInSignUp = lazy(() => import("../pages/SignInSignUp"));
const PostPage = lazy(() => import("../pages/PostPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AddNewPosts = lazy(() => import("../pages/AddNewPosts"));



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
        ]
    },
    { path: "/signin", element: <SignInSignUp /> },
    { path: "/not-found", element: <NotFound404 /> },
    { path: "*", element: <NotFound404 /> }
    // {
    //     path: "/admin",
    //     element: <AppAdminWrapper />,
    //     children: [
    //         { path: "", element: <ListPost /> },
    //         { path: "list-post", element: <ListPost /> },
    //         { path: "login", element: <LoginAdmin /> },
    //         { path: "edit-post/:slug", element: <EditPost /> },
    //         { path: "edit-customer/:id", element: <EditCustomer /> },
    //         { path: "edit-admin/:id", element: <EditAdmin /> },
    //         { path: "edit-category/:slug", element: <EditCategory /> },
    //         { path: "list-category", element: <ListCategory /> },
    //         { path: "list-customer", element: <ListCustomer /> },
    //         { path: "list-admin", element: <ListAdmin /> },
    //         { path: "add-post", element: <AddPost /> },
    //         { path: "add-category", element: <AddCategory /> },
    //         { path: "add-customer", element: <AddCustomer /> },
    //         { path: "add-admin", element: <AddAdmin /> },
    //     ]
    // },
]);
function AppCustomer() {
    return (
        <div>
            <ScrollToTop />
            <ThemeProvider>
                <Suspense fallback={<LoadingPage></LoadingPage>}>
                    <MainLayout />
                </Suspense>
            </ThemeProvider>
        </div>
    );
}

