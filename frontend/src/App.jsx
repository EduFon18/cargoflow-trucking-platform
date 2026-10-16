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
  const [moveForm, setMoveForm] = useState({
  moveDestination: '',
  destinationType: '',
  requestedPickupDate: '',
  requestedDeliveryDate: '',
  carrier: 'Not Assigned',
  pickupAppointment: '',
  deliveryAppointment: '',
  dispatchInstructions: '',
  operationalNotes: '',
})
const [formErrors, setFormErrors] = useState({})
const [createdMove, setCreatedMove] = useState(null)

const handleStartMoveCreation = () => {
  setMoveForm({
    moveDestination: selectedBooking?.moveDestination || '',
    destinationType: selectedBooking?.destinationType || '',
    requestedPickupDate: '',
    requestedDeliveryDate: '',
    carrier: 'Not Assigned',
    pickupAppointment: '',
    deliveryAppointment: '',
    dispatchInstructions: '',
    operationalNotes: '',
  })

  setActiveView('create-move')
}

const validateMoveForm = () => {
  const errors = {}

  if (!moveForm.moveDestination.trim()) {
    errors.moveDestination = 'Move destination is required.'
  }

  if (!moveForm.destinationType) {
    errors.destinationType = 'Destination type is required.'
  }

  if (!moveForm.requestedPickupDate) {
    errors.requestedPickupDate = 'Requested pickup date is required.'
  }

  if (!moveForm.requestedDeliveryDate) {
    errors.requestedDeliveryDate = 'Requested delivery date is required.'
  }

  if (
    moveForm.requestedPickupDate &&
    moveForm.requestedDeliveryDate &&
    moveForm.requestedDeliveryDate < moveForm.requestedPickupDate
  ) {
    errors.requestedDeliveryDate =
      'Requested delivery date cannot be earlier than pickup date.'
  }

  setFormErrors(errors)

  return Object.keys(errors).length === 0
}

const handleMoveFormSubmit = (event) => {
  event.preventDefault()

  const isValid = validateMoveForm()

  if (!isValid) {
    return
  }

  const newMove = {
    moveReference: `CF-${selectedBooking.id
      .toString()
      .padStart(4, '0')}`,
    bookingNumber: selectedBooking.bookingNumber,
    customer: selectedBooking.customer,
    containerNumber: selectedBooking.containerNumber,
    containerType: selectedBooking.containerType,
    origin: selectedBooking.origin,
    pol: selectedBooking.pol,
    erd: selectedBooking.erd,
    cutOff: selectedBooking.cutOff,
    ...moveForm,
    status: 'Active',
  }

  setCreatedMove(newMove)
  setFormErrors({})
  setActiveView('move-created')

  console.log('Created trucking move:', newMove)
}


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

        <button
          className="primary-button"
          onClick={handleStartMoveCreation}
        >
          Create Trucking Move
        </button>
      </div>
    </section>
  </>
)}
{activeView === 'create-move' && selectedBooking && (
  <>
    <section className="page-header">
      <p className="section-label">TRUCKING MOVE CREATION</p>
      <h2>Create Trucking Move</h2>
      <p>
        Enter and confirm the operational information required for booking{' '}
        {selectedBooking.bookingNumber}.
      </p>
    </section>

    <section className="form-card">

      <div className="booking-context">
        <div>
          <span>Booking</span>
          <strong>{selectedBooking.bookingNumber}</strong>
        </div>

        <div>
          <span>Customer</span>
          <strong>{selectedBooking.customer}</strong>
        </div>

        <div>
          <span>Container</span>
          <strong>{selectedBooking.containerNumber}</strong>
        </div>

        <div>
          <span>Origin</span>
          <strong>{selectedBooking.origin}</strong>
        </div>

        <div>
          <span>POL</span>
          <strong>{selectedBooking.pol}</strong>
        </div>

        <div>
          <span>Cut-Off</span>
          <strong>{selectedBooking.cutOff}</strong>
        </div>
      </div>

      <form
        className="move-form"
        onSubmit={handleMoveFormSubmit}
      >

        <div className="form-group">
          <label htmlFor="moveDestination">
            Move Destination / Delivery Facility *
          </label>

          <input
            id="moveDestination"
            type="text"
            className={formErrors.moveDestination ? 'input-error' : ''}
            value={moveForm.moveDestination}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                moveDestination: event.target.value,
              })
            }
  
          />

          {formErrors.moveDestination && (
            <span className="field-error">
             {formErrors.moveDestination}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="destinationType">
            Destination Type *
          </label>

          <select
            id="destinationType"
            className={formErrors.destinationType ? 'input-error' : ''}
            value={moveForm.destinationType}           
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                destinationType: event.target.value,
              })
            }           
          >
            <option value="">Select destination type</option>
            <option value="Port / Marine Terminal">
              Port / Marine Terminal
            </option>
            <option value="Rail / Intermodal Terminal">
              Rail / Intermodal Terminal
            </option>
            <option value="Other">
              Other
            </option>
          </select>

          {formErrors.destinationType && (
              <span className="field-error">
                {formErrors.destinationType}
              </span>
            )}
        </div>

        <div className="form-group">
          <label htmlFor="requestedPickupDate">
            Requested Pickup Date *
          </label>

          <input
            id="requestedPickupDate"
            type="date"
            className={formErrors.requestedPickupDate ? 'input-error' : ''}
            value={moveForm.requestedPickupDate}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                requestedPickupDate: event.target.value,
              })
            }            
          />
          {formErrors.requestedPickupDate && (
              <span className="field-error">
                {formErrors.requestedPickupDate}
              </span>
            )}
        </div>

        <div className="form-group">
          <label htmlFor="requestedDeliveryDate">
            Requested Delivery Date *
          </label>

          <input
            id="requestedDeliveryDate"
            type="date"
            className={formErrors.requestedDeliveryDate ? 'input-error' : ''}
            value={moveForm.requestedDeliveryDate}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                requestedDeliveryDate: event.target.value,
              })
            }            
          />

          {formErrors.requestedDeliveryDate && (
              <span className="field-error">
                {formErrors.requestedDeliveryDate}
              </span>
            )}
        </div>

        <div className="form-group">
          <label htmlFor="carrier">Carrier</label>

          <select
            id="carrier"
            value={moveForm.carrier}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                carrier: event.target.value,
              })
            }
          >
            <option value="Not Assigned">Not Assigned</option>
            <option value="Carrier A">Carrier A</option>
            <option value="Carrier B">Carrier B</option>
            <option value="Carrier C">Carrier C</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pickupAppointment">
            Pickup Appointment
          </label>

          <input
            id="pickupAppointment"
            type="datetime-local"
            value={moveForm.pickupAppointment}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                pickupAppointment: event.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliveryAppointment">
            Delivery Appointment
          </label>

          <input
            id="deliveryAppointment"
            type="datetime-local"
            value={moveForm.deliveryAppointment}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                deliveryAppointment: event.target.value,
              })
            }
          />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="dispatchInstructions">
            Dispatch Instructions
          </label>

          <textarea
            id="dispatchInstructions"
            rows="4"
            value={moveForm.dispatchInstructions}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                dispatchInstructions: event.target.value,
              })
            }
          />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="operationalNotes">
            Operational Notes
          </label>

          <textarea
            id="operationalNotes"
            rows="4"
            value={moveForm.operationalNotes}
            onChange={(event) =>
              setMoveForm({
                ...moveForm,
                operationalNotes: event.target.value,
              })
            }
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setActiveView('booking-details')}
          >
            Back
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Create Trucking Move
          </button>
        </div>

      </form>

    </section>
  </>
)}

        {activeView === 'move-created' && createdMove && (
          <>
            <section className="page-header">
              <p className="section-label">TRUCKING MOVE CREATED</p>
              <h2>Move Created Successfully</h2>
              <p>
                The trucking move has been temporarily created in the frontend prototype.
              </p>
            </section>

            <section className="success-card">

              <div className="success-message">
                <span className="success-icon">✓</span>

                <div>
                  <strong>{createdMove.moveReference}</strong>
                  <p>
                    Created from booking {createdMove.bookingNumber}
                  </p>
                </div>
              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Customer</span>
                  <strong>{createdMove.customer}</strong>
                </div>

                <div className="detail-item">
                  <span>Container</span>
                  <strong>{createdMove.containerNumber}</strong>
                </div>

                <div className="detail-item">
                  <span>Origin</span>
                  <strong>{createdMove.origin}</strong>
                </div>

                <div className="detail-item">
                  <span>Move Destination</span>
                  <strong>{createdMove.moveDestination}</strong>
                </div>

                <div className="detail-item">
                  <span>Destination Type</span>
                  <strong>{createdMove.destinationType}</strong>
                </div>

                <div className="detail-item">
                  <span>Port of Loading</span>
                  <strong>{createdMove.pol}</strong>
                </div>

                <div className="detail-item">
                  <span>Requested Pickup</span>
                  <strong>{createdMove.requestedPickupDate}</strong>
                </div>

                <div className="detail-item">
                  <span>Requested Delivery</span>
                  <strong>{createdMove.requestedDeliveryDate}</strong>
                </div>

                <div className="detail-item">
                  <span>Carrier</span>
                  <strong>{createdMove.carrier}</strong>
                </div>

                <div className="detail-item">
                  <span>Status</span>
                  <strong>{createdMove.status}</strong>
                </div>

              </div>

              <div className="details-actions">
                <button
                  className="secondary-button"
                  onClick={() => setActiveView('bookings')}
                >
                  Back to Processed Bookings
                </button>

                <button
                  className="primary-button"
                  onClick={() => setActiveView('moves')}
                >
                  View Trucking Moves
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