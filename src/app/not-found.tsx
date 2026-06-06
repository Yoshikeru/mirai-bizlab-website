/**
 * Root-level not-found — renders a standalone HTML page outside the app layout.
 * Used only for requests that bypass locale routing entirely (edge case).
 * All animations are pure CSS so no external runtime is needed here.
 */
export default function NotFound() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — MIRAI BizLab</title>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{
            font-family:'Inter Tight','Inter',system-ui,sans-serif;
            background:#0c0c0e;color:#f5f5f7;
            min-height:100vh;display:flex;
            align-items:center;justify-content:center;
            overflow:hidden;
          }
          /* grid */
          .grid-bg{
            position:fixed;inset:0;z-index:0;pointer-events:none;
            opacity:.04;
            background-image:
              linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),
              linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px);
            background-size:60px 60px;
          }
          /* glow blobs */
          .blob{position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;z-index:0;}
          .blob-1{width:560px;height:560px;background:rgba(187,0,13,.14);top:-160px;left:-160px;
            animation:drift1 20s ease-in-out infinite;}
          .blob-2{width:380px;height:380px;background:rgba(187,0,13,.09);bottom:-80px;right:-80px;
            animation:drift2 26s ease-in-out infinite;}
          @keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(50px,36px)}}
          @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-36px,-26px)}}
          /* container */
          .wrap{position:relative;z-index:1;text-align:center;padding:2rem 1.5rem;max-width:540px;}
          /* tuk-tuk */
          .tuktuk{
            margin:0 auto 0.5rem;width:240px;position:relative;
            animation:bob 3.4s ease-in-out infinite;
          }
          @keyframes bob{0%,100%{transform:translateY(0) rotate(-.6deg)}50%{transform:translateY(-10px) rotate(.6deg)}}
          /* wheel spin via CSS */
          .wheel{animation:spin 1.6s linear infinite;transform-box:fill-box;transform-origin:center;}
          @keyframes spin{to{transform:rotate(360deg)}}
          /* bubble */
          .bubble{
            position:absolute;top:-28px;right:10px;
            width:44px;height:44px;
            animation:wobble 2.4s ease-in-out infinite;
          }
          @keyframes wobble{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-9px) scale(1.1)}}
          /* digits */
          .digits{display:flex;align-items:center;justify-content:center;gap:4px;}
          .d4{font-size:clamp(5rem,14vw,9rem);font-weight:900;line-height:1;
            letter-spacing:-.04em;color:#bb000d;}
          .d0{font-size:clamp(4.5rem,13vw,8rem);font-weight:900;line-height:1;
            letter-spacing:-.04em;color:#f5f5f7;}
          /* text */
          .tag{font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
            color:#bb000d;margin-bottom:.5rem;}
          .title{font-size:clamp(1.25rem,4vw,1.625rem);font-weight:700;margin-top:1.25rem;line-height:1.4;}
          .fun{font-size:.9375rem;color:rgba(245,245,247,.55);margin-top:.75rem;line-height:1.65;white-space:pre-line;}
          /* button */
          .btn{
            display:inline-flex;align-items:center;gap:.5rem;
            margin-top:2.25rem;padding:.875rem 2.25rem;
            background:#bb000d;color:#fff;font-size:.9375rem;font-weight:700;
            text-decoration:none;border-radius:9999px;
            transition:background .2s,transform .2s;
          }
          .btn:hover{background:#d9000f;transform:translateY(-2px);}
        `}</style>
      </head>
      <body>
        <div className="grid-bg" aria-hidden="true" />
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />

        <main className="wrap">
          {/* Tuk-tuk */}
          <div className="tuktuk" aria-hidden="true">
            {/* ? bubble */}
            <div className="bubble">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="20" r="17" fill="rgba(187,0,13,.12)" stroke="#bb000d" strokeWidth="1.5" strokeDasharray="4 3"/>
                <text x="22" y="27" textAnchor="middle" fontSize="19" fill="#bb000d" fontWeight="900" fontFamily="system-ui,sans-serif">?</text>
                <path d="M14 36 L7 43 L19 40 Z" fill="rgba(187,0,13,.28)"/>
              </svg>
            </div>

            <svg viewBox="0 0 230 140" fill="none" xmlns="http://www.w3.org/2000/svg" width="240">
              <ellipse cx="96" cy="133" rx="72" ry="4.5" fill="white" opacity=".06"/>
              {/* body */}
              <rect x="18" y="48" width="155" height="54" rx="10" fill="#FFB300"/>
              {/* roof */}
              <path d="M8 34 Q8 21 18 21 L158 21 Q172 21 173 33 L173 48 L18 48 Z" fill="#E69800"/>
              {/* windshield */}
              <rect x="23" y="24" width="62" height="20" rx="4" fill="rgba(135,206,235,.45)" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
              {/* driver */}
              <circle cx="44" cy="33" r="8" fill="#F0C080"/>
              <path d="M36 30 Q44 22 52 30" fill="none" stroke="#5a3a1a" strokeWidth="3" strokeLinecap="round"/>
              {/* passenger */}
              <rect x="110" y="53" width="52" height="40" rx="8" fill="rgba(0,0,0,.1)"/>
              <circle cx="136" cy="68" r="7" fill="#F0C080"/>
              <circle cx="133" cy="67" r="1.5" fill="#5a3a1a"/>
              <circle cx="139" cy="67" r="1.5" fill="#5a3a1a"/>
              <path d="M132 71 Q136 74 140 71" stroke="#5a3a1a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              {/* stripe */}
              <rect x="18" y="72" width="155" height="4" rx="2" fill="rgba(255,255,255,.2)"/>
              {/* headlight */}
              <circle cx="13" cy="77" r="6.5" fill="rgba(255,255,200,.85)"/>
              <circle cx="13" cy="77" r="4" fill="rgba(255,255,230,.95)"/>
              {/* front wheel */}
              <g className="wheel" style={{transformOrigin:"52px 117px"}}>
                <circle cx="52" cy="117" r="16" fill="#1C1C1E"/>
                <circle cx="52" cy="117" r="10.5" fill="#2a2a2a"/>
                <circle cx="52" cy="117" r="4" fill="#FFB300"/>
                <line x1="52" y1="101" x2="52" y2="133" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="36" y1="117" x2="68" y2="117" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="40.7" y1="106.7" x2="63.3" y2="127.3" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="63.3" y1="106.7" x2="40.7" y2="127.3" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              {/* rear wheel */}
              <g className="wheel" style={{transformOrigin:"148px 117px"}}>
                <circle cx="148" cy="117" r="16" fill="#1C1C1E"/>
                <circle cx="148" cy="117" r="10.5" fill="#2a2a2a"/>
                <circle cx="148" cy="117" r="4" fill="#FFB300"/>
                <line x1="148" y1="101" x2="148" y2="133" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="132" y1="117" x2="164" y2="117" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="136.7" y1="106.7" x2="159.3" y2="127.3" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="159.3" y1="106.7" x2="136.7" y2="127.3" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              {/* exhaust */}
              <circle cx="178" cy="93" r="5.5" fill="rgba(180,180,180,.18)"/>
              <circle cx="186" cy="87" r="4" fill="rgba(180,180,180,.12)"/>
              <circle cx="193" cy="82" r="2.5" fill="rgba(180,180,180,.08)"/>
            </svg>
          </div>

          <p className="tag">Error 404</p>
          <div className="digits" aria-label="404">
            <span className="d4">4</span>
            <span className="d0">0</span>
            <span className="d4">4</span>
          </div>
          <h1 className="title">このページ、迷子になっています</h1>
          <p className="fun">{`バンコクのどこかでトゥクトゥクに乗って\nさまよっているかもしれません 🛺`}</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="btn">← ホームへ戻る</a>
        </main>
      </body>
    </html>
  );
}
