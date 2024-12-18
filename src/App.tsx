import React from 'react';

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to My React TypeScript App</h1>
        <p>This app is powered by React and TypeScript.</p>
      </header>
      <main style={styles.main}>
        <button onClick={() => alert('Hello, world!')} style={styles.button}>
          Click Me!
        </button>
      </main>
      <footer style={styles.footer}>
        <p>© 2024 Your App. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Basic inline styles for the app
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    margin: '0',
  },
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
  },
  main: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#21a1f1',
  },
  footer: {
    marginTop: '40px',
    fontSize: '14px',
    color: '#888',
  },
};

export default App;
