import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { AddQuestionPageLazy } from './pages/AddQuestionPage';
import { AuthProvider } from './auth/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { ForbiddenPage } from './pages/ForbiddenPage';
import { EditQuestionPageLazy } from './pages/EditQuestionPage';

const ProtectedRoutes = () => {
	const { isAuth } = useAuth();
	const location = useLocation();

	return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/forbidden" element={<ForbiddenPage />}></Route>
						<Route
							path="/addquestion"
							element={
								<div>
									<AddQuestionPageLazy />
								</div>
							}
						></Route>

						<Route element={<ProtectedRoutes />}>
							<Route path="/question/:id" element={<QuestionPage />}></Route>
							<Route path="/editquestion/:id" element={<EditQuestionPageLazy />}></Route>
						</Route>

						<Route path="*" element={<NotFoundPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
