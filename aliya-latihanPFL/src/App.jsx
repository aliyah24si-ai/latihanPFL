import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const DashboardPenjualan  = React.lazy(() => import("./pages/main/DashboardPenjualan"));
const DashboardPelanggan  = React.lazy(() => import("./pages/main/DashboardPelanggan"));
const Orders              = React.lazy(() => import("./pages/main/Orders"));
const Customers           = React.lazy(() => import("./pages/main/Customers"));
const MenuManagement      = React.lazy(() => import("./pages/main/MenuManagement"));
const Users               = React.lazy(() => import("./pages/main/Users"));
const Promotions          = React.lazy(() => import("./pages/main/Promotions"));
const Feedbacks           = React.lazy(() => import("./pages/main/Feedbacks"));
const Components          = React.lazy(() => import("./pages/main/Components"));
const ErrorPage           = React.lazy(() => import("./pages/main/ErrorPage"));
const NotFound            = React.lazy(() => import("./pages/main/NotFound"));

const Login    = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot   = React.lazy(() => import("./pages/auth/Forgot"));

const GuestMenu    = React.lazy(() => import("./pages/guest/GuestMenu"));
const GuestPromo   = React.lazy(() => import("./pages/guest/GuestPromo"));
const GuestService = React.lazy(() => import("./pages/guest/GuestService"));
const GuestReward  = React.lazy(() => import("./pages/guest/GuestReward"));

const MemberLogin     = React.lazy(() => import("./pages/member/MemberLogin"));
const MemberRegister  = React.lazy(() => import("./pages/member/MemberRegister"));
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));

const LandingPage = React.lazy(() => import("./pages/landing/LandingPage"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ── Landing Page — halaman utama / pertama dibuka ── */}
        <Route path="/"       element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* ── Guest Pages ── */}
        <Route path="/guest"         element={<GuestMenu />} />
        <Route path="/guest/promo"   element={<GuestPromo />} />
        <Route path="/guest/service" element={<GuestService />} />
        <Route path="/guest/reward"  element={<GuestReward />} />

        {/* ── Member Pages ── */}
        <Route path="/member/login"     element={<MemberLogin />} />
        <Route path="/member/register"  element={<MemberRegister />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />

        {/* ── Auth Pages ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* ── Admin Pages (setelah login admin) ── */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard"           element={<DashboardPenjualan />} />
          <Route path="/dashboard-penjualan" element={<DashboardPenjualan />} />
          <Route path="/dashboard-pelanggan" element={<DashboardPelanggan />} />
          <Route path="/orders"              element={<Orders />} />
          <Route path="/customers"           element={<Customers />} />
          <Route path="/menu"                element={<MenuManagement />} />
          <Route path="/users"               element={<Users />} />
          <Route path="/promotions"          element={<Promotions />} />
          <Route path="/feedbacks"           element={<Feedbacks />} />
          <Route path="/components"          element={<Components />} />
          <Route path="/error-400" element={<ErrorPage code={400} description="Permintaanmu ga bisa diproses nih 😅" image="🤔" />} />
          <Route path="/error-401" element={<ErrorPage code={401} description="Eh, kamu belum login nih! 🔐" image="🙈" />} />
          <Route path="/error-403" element={<ErrorPage code={403} description="Ups, kamu ga punya akses ke sini 🚫" image="🙅‍♀️" />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
