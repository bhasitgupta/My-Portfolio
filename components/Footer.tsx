export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 0" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: "var(--text-3)", letterSpacing: "0.1em" }}>
          © {year} BHASIT GUPTA
        </p>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: "var(--text-3)", letterSpacing: "0.08em" }}>
          Designed &amp; Built with ♥
        </p>
      </div>
    </footer>
  );
}
