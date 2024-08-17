
 async function fetch_events() {
     try {
         const response = await fetch(`https://se-tasks.vercel.app/events`);
         if (!response.ok) {
             throw new Error('Failed to fetch events');
         }
         const data = await response.json();
         return data;
     } catch (error) {
         console.error('Error fetching events:', error);
         return [];
     }
 }

 async function fetch_event_details(eventId) {
     try {
         const response = await fetch(`https://se-tasks.vercel.app/events/${eventId}`);
         if (!response.ok) {
             throw new Error('Failed to fetch event details');
         }
         const data = await response.json();
         return data;
     } catch (error) {
         console.error('Error fetching event details:', error);
         return null;
     }
 }

 async function getEvents() {
     const events = await fetch_events();
     const eventContainer = document.getElementById('event-container');
     eventContainer.innerHTML = '';

     if (events.length === 0) {
         eventContainer.innerHTML = '<p>No events available.</p>';
         return;
     }

     events.forEach(event => {
         const eventCard = document.createElement('div');
         eventCard.classList.add('event-card');
         
         eventCard.innerHTML = `
             <h3>${event.name}</h3>
             <p>${event.date} | ${event.time}</p>
             <p>${event.venue}</p>
             <button class="details" onclick="show_event_details('${event.id}')">View Details</button>
             `;
         
         eventContainer.appendChild(eventCard);
     });
 }

 async function show_event_details(eventId) {
     const eventDetails = await fetch_event_details(eventId);
     const detailsContainer = document.getElementById('details-container');
     detailsContainer.innerHTML = "";

     if (!eventDetails) {
         detailsContainer.innerHTML = '<p>Event details could not be retrieved.</p>';
         return;
     }
     else{
        detailsContainer.innerHTML = `
        <h2>${eventDetails.name}</h2>
        <p>${eventDetails.description}</p>
        <p>Ticket Price: ${eventDetails.ticketPrice}</p>
        <p>Available Seats: ${eventDetails.availableSeats}</p>
        <button class = "booking" onclick="bookTicket('${eventDetails.id}')">Book Now</button>
        `;
     }
 }

 getEvents();