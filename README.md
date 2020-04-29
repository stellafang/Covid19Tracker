# COVID-19 Tracker
This React-SPA aims to visualize COVID-19 cases across different countries. The dataset I used can be found [here](https://pomber.github.io/covid19/timeseries.json). The features of this app include:
1) The `home` page has a timeseries plot of confirmed cases by country over a selected timerange. This graph can plot multiple countries at once. The user can add and remove countries from the plot using a dropdown menu; and can adjust the time range using the datepicker.
2) Below the timeseries is a table of each country and their confirmed number cases, deaths, and recovered within the selected time range (so notice these numbers are adjusted when the time range is changed).
3) Each country in the timeseries plot and table can be assigned a color for better visualization. Follow the button at the bottom of the `home` page to go to the `settings` page of the SPA. Here, there is a panel to choose a country and a color and button to assign the color to that country. Below this panel is a table that lists country-color settings. Navigate back to the `home` page to see the colors reflected on the plot and table.
4) At the top of the `home` page is a summary of world total confirmed cases, deaths, and recovered.

## Notes
### Implementation
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- `Axios` is the HTTP client I used to fetch and cache our dataset.
- To manage global state, I used pure React to implement a `store`, `dispatch`, `actions` much like Redux but by only using `React's Context API` built on `React Hooks`.
- The components were largely built using `MaterialUI`. I aimed to make the components standalone so that they can be easily reused. This is with the exception of the `Timeseries` component because it very specific to the page and so didn't make sense to generalize. Also the `Card` component that shows the world stats was just added for fun so I didn't bother generalizing that one either.
- The timeseries chart was created using a popular charting library `React-Chartjs-2`
- To make the app as responsive as possible, I used a combination of CSS Media Queries and MaterialUI Grids. The timeseries chart did not have great responsive design capabilites to I created a plugin that resized the chart manually.
- I used `React-Router` to route between the `home` page and `settings` page.
- There are some tests written in `Jest`! I'm also using `Enzyme` to more easily test React components.
- To prevent jumping of components upon loading data from the server, notice that I have used placeholders where the components should go. This is only seen on the first load (or hard refresh) since the data is cached thereafter.

### Improvements
- CSS Preprocessor (i.e. SASS): Since this app is quite small with not much styling repetition and since much of the styling came with MaterialUI, I decided not to go the extra effort to use a css preprocessor.
- The dropdown menu to select countries was implemented using MaterialUI is slow! I chose to use a feature on their dropdown that allows multiple items to be selected and with the amount of countries there are, this became very slow. To optimize performance, I would either try to implement some sort of debounce so that not all the countries are rendered at once or maybe not use the MaterialUI component.
- The unit tests I've included are mostly for helper functions rather than React Components, but there are some!
- Other nice to haves that I would include in a project that was not included here: CircleCI integration; minifying build files; and a more complete testing suite for the React components + integration tests.

## Requirements
```
  node@^10.17.0
  npm@^5.7.1
```

## Setup

Install dependencies using npm:

```bash
npm i
```

## Run App

Run app with:

```bash
  npm start
```

## Testing

Run tests with:

```bash
  npm test
```

## Building

Run tests with:

```bash
  npm build
```