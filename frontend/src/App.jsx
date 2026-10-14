import { useState } from 'react'
import './App.css'


const processedBookings = [
  {
    id: 1,
    bookingNumber: 'BK-1001',
    customer: 'Demo Customer A',
    containerNumber: 'MSCU1234567',
    containerType: '40HC',
    origin: 'Toronto, ON',
    moveDestination: 'CN Brampton',
    destinationType: 'Rail / Intermodal Terminal',
    pol: 'Montreal',
    erd: '2026-10-15',
    cutOff: '2026-10-17 16:00',
    status: 'Ready for Review',
  },
  {
    id: 2,
    bookingNumber: 'BK-1002',
    customer: 'Demo Customer B',
    containerNumber: 'TGHU7654321',
    containerType: '40HC',
    origin: 'Calgary, AB',
    moveDestination: 'CN Calgary',
    destinationType: 'Rail / Intermodal Terminal',
    pol: 'Vancouver',
    erd: '2026-10-16',
    cutOff: '2026-10-18 14:00',
    status: 'Ready for Review',
  },
]

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedBooking, setSelectedBooking] = useState(null)

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
        <button
          className={`nav-item ${
            activeView === 'dashboard' ? 'nav-item-active' : ''
          }`}
          onClick={() => setActiveView('dashboard')}
        >
          Dashboard
        </button>

        <button
          className={`nav-item ${
            activeView === 'bookings' ? 'nav-item-active' : ''
          }`}
          onClick={() => setActiveView('bookings')}
        >
          Processed Bookings
        </button>

        <button
          className={`nav-item ${
            activeView === 'moves' ? 'nav-item-active' : ''
          }`}
          onClick={() => setActiveView('moves')}
        >
          Trucking Moves
        </button>
      </nav>

      <main className="app-content">

        {activeView === 'dashboard' && (
          <>
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
                <strong>{processedBookings.length}</strong>
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
          </>
        )}

        {activeView === 'bookings' && (
          <>
            <section className="page-header">
              <p className="section-label">OPERATIONS PORTAL</p>
              <h2>Processed Bookings</h2>
              <p>
                Review export bookings requiring inland transportation.
              </p>
            </section>

            <section className="table-card">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Customer</th>
                    <th>Container</th>
                    <th>Origin</th>
                    <th>Move Destination</th>
                    <th>POL</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {processedBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.bookingNumber}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.containerNumber}</td>
                      <td>{booking.origin}</td>
                      <td>{booking.moveDestination}</td>
                      <td>{booking.pol}</td>
                      <td>
                        <span className="status-badge">
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="review-button" 
                          onClick={() => {
                            setSelectedBooking(booking)
                            setActiveView('booking-details')
                          }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
        
{activeView === 'booking-details' && selectedBooking && (
  <>
    <section className="page-header">
      <p className="section-label">PROCESSED BOOKING REVIEW</p>
      <h2>{selectedBooking.bookingNumber}</h2>
      <p>
        Review the processed booking information before creating a trucking move.
      </p>
    </section>

    <section className="details-card">
      <div className="details-grid">

        <div className="detail-item">
          <span>Customer</span>
          <strong>{selectedBooking.customer}</strong>
        </div>

        <div className="detail-item">
          <span>Container Number</span>
          <strong>{selectedBooking.containerNumber}</strong>
        </div>

        <div className="detail-item">
          <span>Container Type</span>
          <strong>{selectedBooking.containerType}</strong>
        </div>

        <div className="detail-item">
          <span>Pickup Location / Origin</span>
          <strong>{selectedBooking.origin}</strong>
        </div>

        <div className="detail-item">
          <span>Move Destination</span>
          <strong>{selectedBooking.moveDestination}</strong>
        </div>

        <div className="detail-item">
          <span>Destination Type</span>
          <strong>{selectedBooking.destinationType}</strong>
        </div>

        <div className="detail-item">
          <span>Port of Loading (POL)</span>
          <strong>{selectedBooking.pol}</strong>
        </div>

        <div className="detail-item">
          <span>ERD</span>
          <strong>{selectedBooking.erd}</strong>
        </div>

        <div className="detail-item">
          <span>Cut-Off</span>
          <strong>{selectedBooking.cutOff}</strong>
        </div>

        <div className="detail-item">
          <span>Status</span>
          <strong>{selectedBooking.status}</strong>
        </div>

      </div>

      <div className="details-actions">
        <button
          className="secondary-button"
          onClick={() => setActiveView('bookings')}
        >
          Back to Processed Bookings
        </button>
      </div>
    </section>
  </>
)}
        {activeView === 'moves' && (
          <section className="page-header">
            <p className="section-label">OPERATIONS PORTAL</p>
            <h2>Trucking Moves</h2>
            <p>No trucking moves have been created yet.</p>
          </section>
        )}

      </main>

    </div>
  )
}

export default App