
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import LandingViewLayout from '../features/live-debugger/LandingViewLayout';
import AnalyticsLayout from '../features/analytics/AnalyticsLayout';
import AgentStudioLayout from '../features/studio/AgentStudioLayout';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/live-debugger" element={<LandingViewLayout />} />
				<Route path="/analytics" element={<AnalyticsLayout />} />
				<Route path="/studio" element={<AgentStudioLayout />} />
			</Routes>
		</BrowserRouter>
	);
}
