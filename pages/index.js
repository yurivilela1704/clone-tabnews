import { useState, useEffect } from "react";

function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/api/v1/status");
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: "20px",
      }}
    >
      <main
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#24292e", marginTop: "1rem" }}>Status do Sistema</h2>
        </div>

        <div
          style={{
            borderTop: "1px solid #e1e4e8",
            paddingTop: "1.5rem",
            textAlign: "left",
          }}
        >
          {loading ? (
            <p style={{ color: "#586069", fontSize: "0.9rem" }}>Carregando informações...</p>
          ) : status ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>API:</strong> <span style={{ color: "#28a745" }}>Online</span>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Database:</strong>{" "}
                <span
                  style={{
                    color: status.dependencies.database.status === "healthy" ? "#28a745" : "#d73a49",
                  }}
                >
                  {status.dependencies.database.status === "healthy" ? "Saudável" : "Indisponível"}
                </span>
              </li>
              <li>
                <strong>Última atualização:</strong>{" "}
                {new Date(status.updated_at).toLocaleString("pt-BR")}
              </li>
            </ul>
          ) : (
            <p style={{ color: "#d73a49", fontSize: "0.9rem" }}>Erro ao carregar status.</p>
          )}
        </div>

        <div style={{ marginTop: "2rem", borderTop: "1px solid #e1e4e8", paddingTop: "1.5rem" }}>
          <p style={{ color: "#586069", fontSize: "1rem" }}>
            Visite meu site:{" "}
            <a
              href="https://www.yurivilela.com.br"
              style={{
                color: "#0366d6",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              yurivilela.com.br
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;
