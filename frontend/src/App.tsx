import { BrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import AppRoutes from "@/router";

export default function App() {
	return (
		<BrowserRouter>
			<Layout>
				<AppRoutes />
			</Layout>
		</BrowserRouter>
	);
}
