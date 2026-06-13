export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.center}>
        <h1 style={styles.title}>PERFECTIONISTS</h1>

        <p style={styles.subtitle}>
          Minimal fragrance lab for experimental scents.
        </p>

        <a href="/shop" style={styles.button}>
          Enter Shop
        </a>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    height: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
  },
  center: {
    textAlign: "center",
  },
  title: {
    fontSize: "50px",
    letterSpacing: "6px",
    marginBottom: "10px",
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    background: "white",
    color: "black",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};
