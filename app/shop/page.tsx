export default function Shop() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>SHOP</h1>

        <p style={styles.text}>
          This is your fragrance lab. Products coming soon.
        </p>

        <a href="/" style={styles.button}>
          Back Home
        </a>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  container: {
    textAlign: "center" as const,
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
    letterSpacing: "3px",
  },
  text: {
    opacity: 0.6,
    marginBottom: "25px",
  },
  button: {
    padding: "10px 18px",
    background: "black",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
  },
};
