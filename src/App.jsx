import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<div>home</div>}></Route>
					<Route path="/forbidden" element={<div>forbidden page</div>}></Route>
					<Route path="/addquestion" element={<div>addquestion page</div>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
