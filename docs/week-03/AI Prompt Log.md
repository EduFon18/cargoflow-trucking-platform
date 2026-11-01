# Week 3 — API Development and Integration

## Prompt 1 — API Requirements and Data Flow

**Date:** October 31, 2026  
**Task:** Define the CargoFlow API requirements and frontend-to-backend data flow.

**Prompt Used:**  
Help me define the API requirements for CargoFlow based on the existing React frontend and the Create Trucking Move workflow. The main integration should follow: Operations User → React Create Trucking Move Form → HTTP POST /moves → FastAPI → Validation & Processing → 201 Created JSON Response → React Confirmation Screen.

**AI Tool:**  
ChatGPT

**Generated Result:**  
The AI helped define the primary POST /moves API requirement, request and response structure, expected HTTP status, and the API data flow diagram.

**What We Changed:**  
The proposed design was reviewed and aligned with the existing CargoFlow workflow, processed booking data, and Week 2 frontend fields.

**Was the Output Correct?**  
Yes, after review and refinement.

**How We Validated It:**  
The API requirements were compared against the existing frontend form, CargoFlow functional requirements, and the Week 3 API endpoint specification.


## Prompt 2 — FastAPI Backend and Pydantic Models

**Date:** October 31, 2026  
**Task:** Create the initial FastAPI backend and define request/response models.

**Prompt Used:**  
Help me create a simple FastAPI backend for CargoFlow and define Pydantic models for creating a trucking move. Required fields should include booking number, destination, destination type, requested pickup date, and requested delivery date. Optional fields should include carrier, appointments, dispatch instructions, and operational notes.

**AI Tool:**  
ChatGPT

**Generated Result:**  
The AI generated the initial FastAPI project structure, root health endpoint, TruckingMoveCreate model, TruckingMoveResponse model, and instructions for running the API with Uvicorn.

**What We Changed:**  
The models were adjusted to match the exact fields used by the CargoFlow React frontend and the previously documented POST /moves specification.

**Was the Output Correct?**  
Yes.

**How We Validated It:**  
The models were imported successfully in Python, FastAPI started without errors, and Swagger/OpenAPI automatically displayed the request and response schemas.


## Prompt 3 — React to FastAPI Integration

**Date:** October 31, 2026  
**Task:** Connect the Week 2 React Create Trucking Move form to the FastAPI backend.

**Prompt Used:**  
Help me replace the temporary local React move creation logic with a real HTTP POST request to the CargoFlow FastAPI POST /moves endpoint. The frontend should send JSON, receive the API-created trucking move, store the response in React state, and display the existing confirmation screen.

**AI Tool:**  
ChatGPT

**Generated Result:**  
The AI suggested configuring CORS in FastAPI and using JavaScript fetch() inside handleMoveFormSubmit() to send the trucking move data to the API.

**What We Changed:**  
The previous frontend-only mock move creation logic was removed. The React form now sends data to FastAPI and uses the JSON response returned by the backend.

**Was the Output Correct?**  
Yes, after correcting a JSX syntax issue caused by leftover code from the previous implementation.

**How We Validated It:**  
A trucking move was submitted through the React interface. FastAPI returned HTTP 201 Created, generated move reference CF-0001, and the React confirmation screen displayed the information returned by the API.


## Prompt 4 — API Validation and Error Handling

**Date:** October 31, 2026  
**Task:** Improve CargoFlow API validation and frontend error handling.

**Prompt Used:**  
Help me add backend business validation and error handling to POST /moves. The API should reject a delivery date earlier than the pickup date, return an error if the processed booking does not exist, allow Pydantic to reject invalid data types, and display API connection errors inside the React frontend.

**AI Tool:**  
ChatGPT

**Generated Result:**  
The AI suggested using FastAPI HTTPException for business validation and missing bookings, Pydantic for request validation, and a React apiError state for displaying backend or connection errors.

**What We Changed:**  
Backend validation was added for requested dates and appointment dates. React was updated to display a user-facing API error message instead of relying only on console errors.

**Was the Output Correct?**  
Yes.

**How We Validated It:**  
The following API scenarios were tested successfully:

- HTTP 201 — Valid trucking move created successfully.
- HTTP 400 — Delivery date earlier than pickup date.
- HTTP 404 — Processed booking not found.
- HTTP 422 — Invalid request data type.
- API unavailable — React displayed “Unable to connect to the CargoFlow API.”
- API restored — Valid trucking move creation worked normally again.