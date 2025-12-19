const Layout = ({ children }) => {
  return (
    <div style={{ width: "50%" }}>
      {/* FULL-WIDTH HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <h3 style={{ margin: 0 }}>My Application</h3>

        <div>
          <button
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Profile
          </button>

          <button
            style={{
              padding: "6px 12px",
              marginLeft: "10px",
              borderRadius: "4px",
              border: "1px solid red",
              background: "#ff4d4d",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div style={{  width:"100% -330px" }}>
        {children} 
      </div>
    </div>
  );
};

export default Layout;
