import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-latar flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-2 animate-bounce">🍽️</div>
      <div className="text-[130px] font-poppins font-extrabold text-gray-100 leading-none select-none">
        404
      </div>
      <h1 className="text-3xl font-bold text-teks -mt-4 mb-2">
        Halaman Ini Belum Ada di Menu! 😅
      </h1>
      <p className="text-gray-400 mb-2 max-w-sm">
        Kayaknya kamu nyasar deh... halaman yang kamu cari ga ada di sini.
      </p>
      <p className="text-pink font-semibold mb-8">
        Udah laper ya? Yuk balik dulu! 🍱
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-hijau text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition text-lg"
      >
        🏠 Balik ke Dashboard
      </button>
    </div>
  );
}
