export default function NotFound() {
  return (
    <html lang="ja">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          color: "#1a1a1a",
        }}
      >
        <main style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>404</h1>
          <p style={{ marginTop: "0.5rem", color: "#6b6b6b" }}>
            Page not found
          </p>
        </main>
      </body>
    </html>
  );
}
