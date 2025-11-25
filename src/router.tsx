import { createBrowserRouter } from "react-router-dom";

const Home = () => <div className="p-8 text-center">Home Page</div>;
const PokemonDetailPage = () => <div className="p-8 text-center">Pokemon Detail</div>;
const NotFound = () => <div className="p-8 text-center">404 Not Found</div>;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/pokemon/:idOrName',
        element: <PokemonDetailPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
