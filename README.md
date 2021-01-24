# Standup Worcester Hub

Through the web application StartUp Worcester Hub, you can display your startup to the Worcester community, support local startups, and explore entrepreneurship resources available in the city.

## Hosted on https://startupworcester.web.app/

## Video demo https://www.youtube.com/watch?v=uuWmU78ws7Q&feature=youtu.be

<img src="https://i.imgur.com/b6vsXbs.png" width="100%" border="0" />
<img src="https://i.imgur.com/sspxwps.png" width="100%" border="0" />
<img src="https://i.imgur.com/x8dniip.png" width="100%" border="0" />

## Inspiration

From the HACK@WPI Project Brainstorm document, I felt I could make an impact in providing a central hub of information for startup and entrepreneurship resources available in the city directly to students and the rest of the community. In combination with that, I could also make a social media app that displays and supports local startups and expose events and competitions located in Worcester for startups and businesses to participate and enter in. Therefore, I felt that this idea would fit well with both the Community and WPI Hack, in that this idea can help attract startups to the entrepreneuring events, competitions, and resources in Worcester and support and encourage local young students to explore and expose themselves to the world of business and entrepreneurship. 

## What it does

StartUp Worcester Hub is an all in one social media hub to attract and expose quality student startups around Worcester. Within the app has 3 main sections:

### My startup
This section is your startup dashboard. You can view your startup info, edit your startup info, view comments that users have created on your startup, or/and look at local events and competitions that are upcoming. 

### View Startups (Does not require login/account)
This section is the Startups Hub. You can view and search (filter by name or industry) through local startups from around the Worcester Area. You can expand each card to look for more information and post a comment about the business.

### Resources (Does not require login/account)
This section is the central hub of information for startup and entrepreneurship resources available in the city. Made for students and the rest of the community, you can explore the many resources organizations offer for innovation and entrepreneurship, and also recommend resources to the rest of the community.

## How I built it

React + HTML + CSS + JavaScript for the basic front-end of the application. React, with its ability to create large, fast, scalable, and simple web applications without the need to reload the page, made perfect sense for a multi-sectioned web application.
Libraries such as Material-UI and React Router made UI app creation smooth and seamless.

Firebase acted as my BaaS (Backend-as-a-Service). Authentication, real-time database, and hosting was all done through firebase, saving a lot of time, which is great for a hackathon.

## Challenges I ran into

This was one of my most challenging applications for CSS and styling. For any social media app, clean and elegant mobile compatible UI is a must. I used 30+ images/icons around the applications, making sure each image/icon is well-placed. I made sure that each page was adequately mobile compatible, from the navigation bar and its buttons to the startup and resource cards placed throughout. Material-UI and its component library played a large role in making the app creation not as painful as it should be.

For this specific application, I have never used authentication for any of the web applications that I have built in the past, so I am glad that Firebase Authentication was simple enough to use. However, keeping track of if a user is logged in and what actions that a logged in user can and cannot do was tricky to solve sometimes. 

There were a lot of features that I wanted to get done, so I had to make sure to focus on finishing the 3 main sections of the application and make sure that they all fit with each other before I could move on. UI changes such as adding icons, text fields, a comment section, and dialogs were time-consuming, but I felt that it would make the user experience much more enjoyable and easy to understand.

Finally, there was a lot of error and input-checking, as there is a lot of text-fields a user can fill out. Some checks include empty text-fields, character limits, and making sure certain items were filled in before a startup page could go public. One of the most challenging input-checks was a user submitting a youtube URL, in which I had to extract the YouTube ID using regex and use the ID to embed the YouTube Video player through a YouTube IFrame component. 

## Accomplishments that I'm proud of

- Mobile Compatibility! Not perfect, but I am proud of producing an adequate mobile web app purely through css.

- Finally learning authentication was nice, as I learned how to create and store user accounts and its associated data (startup info) in the database.

- I finished what I set out to do, learning a few nice tricks along the way! I mainly made sure to get all the core components done (the 3 sections of the application), adding features that I felt I could finish in time (comments section, icons, backgrounds, researching startup examples, adding text fields, etc.). I also made sure that the app was relatively robust through error and input checking.

## What I learned

I learned more about correct and clever ways to use CSS and JavaScript, Firebase Authentication and Database usage, using React Context for authentication, and tricks to route correctly for logged in and not logged in users. I also learned a lot about the entrepreneurial resources and startups located around WPI, and I hope to take advantage of some in the future (UMass isn't that far away)!

## What's next for StartUp Worcester Hub

- The comments section right now functions as one and done. I would love to add editing, deleting, and replies of comments on posts. 
- Edit startup Info flexibility, more freedom for the iser
- Better mobile compatibility -> Navbar UI can be much improved.
- Indicator that changes are unsaved when editing startup info
- Google Maps integration with location field of startup
- Likes, favorites, shares, and etc., everything that a social media app has to offer (Popularity/Fan Favorite startup competition?)
- More events, resources, competitions, opportunity listings, etc.
- Uploading of images and videos using Firebase Cloud storage
- Cleaning up code: comments, separation of concerns, less "big" files, lower the amount of uses of repeated code, consistent formatting, etc.
- Error checking and writing tests, I'm sure a few glitches/bugs/loopholes slipped through!

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
