export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      <h2 className="text-2xl font-bold">
        AI Retail Platform
      </h2>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/scan">Scan</a>
      </div>
    </nav>
  );
}