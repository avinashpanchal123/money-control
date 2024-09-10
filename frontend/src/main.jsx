// import ReactDOM from "react-dom/client";
// import './index.css'
// import { BrowserRouter, Routes, Route } from "react-router-dom";


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navbar />}>
//         {/* <Route path="/" element={<Analysis/>  }/> */}
//           {/* <Route index element={<Home />} /> */}
//           <Route path="analysis" element={<Analysis />} />
//           <Route path="budget" element={<Budget />} />
//           <Route path="category" element={<Category />} />
//           <Route path="transactions" element={<Transactions />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Analysis from "./components/Analysis/Analysis.jsx";
import Budget from "./components/Budget/Budget.jsx";
import Category from "./components/Category/Category.jsx";
import Transactions from "./components/Transations/Transactions.jsx";
import "./index.css";
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
      <Route path="category" element={<Category />} />
      <Route path="transactions" element={<Transactions />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
