export default function UserPortal() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl text-center">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8l2-2m0 0L5 4m2 2h14" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">Your QR Portal</h2>
        <p className="text-gray-400 mb-8 text-sm">Generate and track your solar referral codes instantly.</p>
        
        <button className="w-full py-4 rounded-xl font-bold text-black transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(90deg, #FFD700, #FDB931)" }}>
          Generate New QR Code
        </button>
        
        <button onClick={() => window.location.href = "http://localhost:8080"} className="mt-4 text-xs text-gray-500 hover:text-white transition-colors">
          Return to Solar Division
        </button>
      </div>
    </div>
  );
}