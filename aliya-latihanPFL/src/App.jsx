import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Orders = React.lazy(() => import("./pages/main/Orders"));
const Customers = React.lazy(() => import("./pages/main/Customers"));
const MenuManagement = React.lazy(() => import("./pages/main/MenuManagement"));
const Reports = React.lazy(() => import("./pages/main/Reports"));
const Promotions = React.lazy(() => import("./pages/main/Promotions"));
const Components = React.lazy(() => import("./pages/main/Components"));
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"));
const NotFound = React.lazy(() => import("./pages/main/NotFound"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));


export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/components" element={<Components />} />
          <Route
            path="/error-400"
            element={
              <ErrorPage
                code={400}
                description="Permintaanmu ga bisa diproses nih 😅"
                image="🤔"
              />
            }
          />
          <Route
            path="/error-401"
            element={
              <ErrorPage
                code={401}
                description="Eh, kamu belum login nih! 🔐"
                image="🙈"
              />
            }
          />
          <Route
            path="/error-403"
            element={
              <ErrorPage
                code={403}
                description="Ups, kamu ga punya akses ke sini 🚫"
                image="🙅‍♀️"
              />
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
