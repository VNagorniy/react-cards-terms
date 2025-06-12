import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/forbidden" element={<div>forbidden page</div>}></Route>
					<Route path="/addquestion" element={<div>addquestion page</div>}></Route>
					<Route path="/question/:id" element={<div>Question page</div>}></Route>
					<Route path="*" element={<NotFoundPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
