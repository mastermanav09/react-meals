This is a typical food order web application in which user can select food items from various categories and can order them.
For frontend, ReactJS is used and for backend service firebase gave the hand.

--Build Flow--

For authentication and authorization, firebase authentication service has been used in the app.
The user can authenticate with google.

The user can choose the food items from the categories and can add them to the cart.
Then for payments services, stripe API is used.

The app uses various hooks, contextAPI for better state management.
For styling, concept of CSS modules are used.

--Storage--

The food-items data and the user's orders data are stored in the realtime database and is fetched from there.
The images specifically are stored in the firebase storage.
