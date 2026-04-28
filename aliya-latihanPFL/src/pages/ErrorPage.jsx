import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <div className="text-8xl mb-4 animate-bounce">{image}</div>
      <div className="text-[120px] font-poppins font-extrabold text-gray-100 leading-none select-none">
        {code}
      </div>
      <h2 className="text-2xl font-bold text-teks -mt-4 mb-3">
        {code === 400 && "Aduh, ada yang salah nih!"}
        {code === 401 && "Hei, siapa kamu? 👀"}
        {code === 403 && "Zona terlarang! 🚧"}
      </h2>
      <p className="text-gray-400 mb-8 max-w-sm">{description}</p>
      <button
        onClick={() => navigate("/")}
        className="bg-hijau text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        🏠 Balik ke Dashboard
      </button>
    </div>
  );
}
