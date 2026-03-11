
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import LandingViewLayout from '../features/live-debugger/LandingViewLayout';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/live-debugger" element={<LandingViewLayout />} />
			</Routes>
		</BrowserRouter>
	);
}
