import './App.css'

function App() {
  return (
    <div className="app-shell">

      <header className="app-header">
        <div>
          <p className="brand-eyebrow">CONTAINER TRUCKING</p>
          <h1 className="brand-name">CargoFlow</h1>
        </div>

        <div className="user-badge">
          Operations User
        </div>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        <button className="nav-item nav-item-active">Dashboard</button>
        <button className="nav-item">Processed Bookings</button>
        <button className="nav-item">Trucking Moves</button>
      </nav>

      <main className="app-content">

        <section className="page-header">
          <p className="section-label">OPERATIONS PORTAL</p>
          <h2>Dashboard</h2>
          <p>
            Week 2 frontend prototype for the CargoFlow container trucking
            move management platform.
          </p>
        </section>

        <section className="summary-grid">

          <article className="summary-card">
            <span>Processed Bookings</span>
            <strong>2</strong>
            <small>Ready for review</small>
          </article>

          <article className="summary-card">
            <span>Active Trucking Moves</span>
            <strong>0</strong>
            <small>No active moves</small>
          </article>

          <article className="summary-card">
            <span>Operational Exceptions</span>
            <strong>0</strong>
            <small>No exceptions reported</small>
          </article>

        </section>

      </main>

    </div>
  )
}

export default App