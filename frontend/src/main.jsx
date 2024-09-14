import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Analysis from "./components/Analysis/Analysis.jsx";
import Budget from "./components/Budget/Budget.jsx";
import Category from "./components/Category/Category.jsx";
import Transactions from "./components/Transations/Transactions.jsx";
import Signup from "./components/loginSignup/Signup.jsx"
import Login from "./components/loginSignup/Login.jsx"
import "./index.css";
import store from "./app/store.js";
import { Provider } from 'react-redux'
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
// import Home from "./components/Home/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route path="" element={<Home />}></Route> */}
      {/* <Route path="about" element={<About />}></Route> */}
      <Route path="analysis" element={<Analysis />} />
      <Route path="budget" element={<Budget />} />
      <Route path="category/*" element={<Category />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="signup" element={<Signup/>} />
      <Route path="login" element={<Login/>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
