import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { AddQuestionPage } from './pages/AddQuestionPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/forbidden" element={<div>forbidden page</div>}></Route>
					<Route
						path="/addquestion"
						element={
							<div>
								<AddQuestionPage />
							</div>
						}
					></Route>
					<Route path="/question/:id" element={<QuestionPage />}></Route>
					<Route path="*" element={<NotFoundPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
