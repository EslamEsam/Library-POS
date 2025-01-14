import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import BooksPage from './Pages/BooksPage';
import LoginPage from './Pages/loginPage';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
       <Route path='books' element={<BooksPage/>} /> 
       <Route path='login' element={<LoginPage/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
  
};

export default App
