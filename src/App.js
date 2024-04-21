// Filename - App.js

import "./App.css";
import Sidebar from "./components/Sidebar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import {
	Nmap,
	NmapOne,
	NmapTwo,
} from "./pages/Nmap";
import {
	Vuln,
	VulnOne,
	VulnTwo,
	VulnThree,
} from "./pages/Vuln";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import AllOutput from "./pages/AllOutput";
function App() {
	return (
		<Router>
			<Sidebar />
			<Routes>
			<Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
				<Route
                    path="/user"
                    element={<User />}
                />
				<Route
                    path="/allOutput"
                    element={<AllOutput />}
                />
				<Route
					path="/nmap"
					element={<Nmap />}
				/>
				<Route
					path="/nmap/nmap1"
					element={<NmapOne />}
				/>
				<Route
					path="/nmap/nmap2"
					element={<NmapTwo />}
				/>
				<Route
					path="/vuln"
					element={<Vuln />}
				/>
				<Route
					path="/vuln/vuln1"
					element={<VulnOne />}
				/>
				<Route
					path="/vuln/vuln2"
					element={<VulnTwo />}
				/>
				<Route
					path="/vuln/vuln3"
					element={<VulnThree />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
