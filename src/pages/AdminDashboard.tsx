export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter" style={{ color: "oklch(0.75 0.16 65)" }}>
              HSQUARE ADMIN <span className="text-white/50">| Portal</span>
            </h1>
            <p className="text-sm text-gray-400">Welcome back, Sidharth Rajput</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all">
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-yellow-500/50 transition-all cursor-pointer group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">Manage Users</h3>
            <p className="text-gray-400 text-sm">Control solar referral access and permissions.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-yellow-500/50 transition-all cursor-pointer group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">QR Analytics</h3>
            <p className="text-gray-400 text-sm">Monitor how many QR codes are being generated.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-yellow-500/50 transition-all cursor-pointer group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">Agency Settings</h3>
            <p className="text-gray-400 text-sm">Update platform configs and metallic themes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}