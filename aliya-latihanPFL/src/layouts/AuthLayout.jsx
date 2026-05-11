import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-8">
        {/* MOBILE/TABLET DECOR */}
        <div className="lg:hidden mb-8">
          <div
            className="relative w-full h-40 sm:h-52 rounded-[24px] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #d7d9e5 0%, #eceef5 55%, #d3d6e1 100%)",
            }}
          >
            <svg
              viewBox="0 0 520 300"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`
                    M ${40 + i * 22} -50
                    C ${180 + i * 12} 120,
                      ${-20 + i * 18} 180,
                      ${180 + i * 14} 400
                  `}
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  opacity={0.22 + i * 0.035}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10">
          <div className="relative w-10 h-10">
            <div className="absolute top-0 left-0 w-6 h-6 rounded-md bg-green-400 opacity-80"></div>

            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-md bg-navy opacity-90"></div>
          </div>

          <span className="font-poppins font-bold text-navy text-lg ml-1">
            Yummy
          </span>
        </div>

        <Outlet />

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2025 Yummy Catering Admin Dashboard. All rights reserved.
        </p>
      </div>

      {/* DESKTOP RIGHT */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-6">
        <div
          className="relative w-full max-w-[520px] h-[760px] rounded-[28px] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #d7d9e5 0%, #eceef5 55%, #d3d6e1 100%)",
          }}
        >
          <svg
            viewBox="0 0 520 760"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[...Array(13)].map((_, i) => (
              <path
                key={i}
                d={`
                  M ${40 + i * 22} -50
                  C ${180 + i * 12} 180,
                    ${-20 + i * 18} 360,
                    ${180 + i * 14} 760
                `}
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={0.22 + i * 0.035}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}