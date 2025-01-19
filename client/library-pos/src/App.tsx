import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import BooksPage from './Pages/BooksPage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import UsersPage from './Pages/UsersPage';
import CustomersPage from './Pages/CustomersPage';
import SalesPage from './Pages/SalesPage';
import RegisterPage from './Pages/RegisterPage';
import CheckoutPage from './Pages/CheckoutPage';
import AddCustomerPage from './Pages/AddCustomerPage';
import AddBookPage from './Pages/AddBookPage';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
       <Route index element={<BooksPage/>} /> 
       <Route path='books' element={<BooksPage/>} /> 
       <Route path='add-book' element={<AddBookPage/>} /> 
       <Route path='users' element={<UsersPage/>} /> 
       <Route path='customers' element={<CustomersPage/>} />
       <Route path='add-customer' element={<AddCustomerPage/>} />
       <Route path='sales' element={<SalesPage/>} />
       <Route path='login' element={<LoginPage/>} />
       <Route path='register' element={<RegisterPage/>} />
       <Route path='checkout' element={<CheckoutPage/>} />
       <Route path='*'  element={<NotFoundPage/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
  
};

export default App
