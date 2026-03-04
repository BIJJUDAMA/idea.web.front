// 1. Update the import to grab AnyRouter instead of Router
import { RouterProvider, type AnyRouter } from "@tanstack/react-router";

// 2. Update your interface to use AnyRouter
interface AppProps {
	router: AnyRouter;
}

export default function App({ router }: AppProps) {
	return <RouterProvider router={router} />;
}

