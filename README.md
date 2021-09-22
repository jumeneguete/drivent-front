<h1 align="center"><img width="30px" src="/assets/driven.jpeg"/> Driven.t</h1>

Driven.t is an application that manages the enrollment of participants in a event, their payment, hotel booking during the event days and activities booking for those who will be attending in the event site. <br/>

<p align="center"><img width="600px" src="/assets/drivent.gif" /></p>

Try it out now at https://drivent-front-psi.vercel.app/


### 🔹🔹About

This is a web application that manages steps from enrollment to selection of activities that will occur in an event. Below are the implemented features:

- Sign up
- Sign in
- Password recovery
- Enrollment form
- Selection of different types of tickets combos:
   - Online
   - On site with hotel
   - On site without hotel
- Received payment
- Selection of different types of hotels (for those who selected a ticked that includes hotel);
   - Driven Resort
   - Driven Palace
   - Driven World
- Selection of vaccancies in a hotel room
- List of activities per day
- Selection of activities (for those who selected a ticked type on site, because online ones does not need to book an activity)
- Digital certificate of attendance

### 🔹🔹Technologies
- ReactJS
- Style-components
- React-router-dom
- Material-UI
- Axios
- DayJs
- React-credit-cards
- React-input-mask
- React-loader-spinner
- React-shimmer-effect
- React-toastify
- EsLint
- API from https://github.com/EduardoVedooto/drivent-back

### 🔹🔹How to run

1. Clone this repository
2. Clone the back-end repository at https://github.com/jumeneguete/repo-provas-back
3. Follow instructions to run back-end at https://github.com/jumeneguete/repo-provas-back
4. Install dependencies
```bash
npm i
```
5. Fullfill environmental variables following the example at .env.example
6. Run the front-end with
```bash
npm start
```
7. You can optionally build the project running
```bash
npm run build
```
8. Finally access http://localhost:3000 on your favorite browser.
