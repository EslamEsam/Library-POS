import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import BooksPage from './Pages/BooksPage';
import LoginPage from './Pages/LoginPage';
import {BookPage} from './Pages/BookPage';
import NotFoundPage from './Pages/NotFoundPage';
import UsersPage from './Pages/UsersPage';
import CustomersPage from './Pages/CustomersPage';
import SalesPage from './Pages/SalesPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
       <Route index element={<BooksPage/>} /> 
       <Route path='books' element={<BooksPage/>} /> 
       <Route path='books/:id' element={<BookPage />} />
       <Route path='users' element={<UsersPage/>} /> 
       <Route path='customers' element={<CustomersPage/>} />
       <Route path='sales' element={<SalesPage/>} />
       <Route path='login' element={<LoginPage/>} />
       <Route path='register' element={<RegisterPage/>} />
       <Route path='*'  element={<NotFoundPage/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
  
};

export default App
