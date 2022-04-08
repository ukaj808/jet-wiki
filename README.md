# Jet Wiki

Jet Wiki is Just Eat Takeaway's version of a wiki. An online encyclopedia based solely on Food & Beverages.

*Currently only catalogueing cocktails at this moment*

## Tech Stack: Reasoning
This webapp was designed to be a single page application. I'll defer you to wikipedias definition for what that means:
*A single-page application is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages.*

This webapp is also designed to be a "Micro Frontend" that leverages Webpack's [Module Federation](https://webpack.js.org/concepts/module-federation/) plugin to provide you with a runtime module library! At the highest level that means with some configurations here and there, you're application will have a (almost) live view of the latest and greatest deployed Jet Wiki components (juxtapose this with "buildtime" node modules where what you deployed is what your stuck with until you build and deploy again).
Although this app is built in React, you don't need to use React yourself to use our components! This is one of the many awesome benefits of federated modules.

This webapp technically doubles as both a host (landing page) and a component library because of module federation. We specifically leverage the [Search Profiler Components](https://github.com/ukaj808/search-profiler-components) library for our search engine (that's what technically makes us a host) and we will provide "Wiki-Like" components in the future ourselves.

## Additional Notes
Majority of the components were built myself using HTML and pure CSS to give it that Takeaway feel. In two cases (arguably the hardest), I opted to use Material UI components for development speed ([ImageViewList](https://mui.com/components/image-list/) & [Checkbox](https://mui.com/components/checkboxes/)).

**This app works well!! (for the most part)!! I urge you to please run it locally to test it yourselves!!**
**For the best experience, please use a mobile display in your browser (it still looks decent in fullscreen though).**
**Please ensure your running both the [Search Profiler Components](https://github.com/ukaj808/search-profiler-components) and the [Search Profiler API](https://github.com/ukaj808/search-profiler-components) locally to get the full functionality of this app**

## Screenshots
![image](https://user-images.githubusercontent.com/96708453/162379182-a17e4c4f-788d-41e5-bd00-dcaa9e167558.png)
![image](https://user-images.githubusercontent.com/96708453/162379455-7a9498cc-ba8c-4fc3-9d69-8476b274bb56.png)
![image](https://user-images.githubusercontent.com/96708453/162379618-e607f317-6eee-46f3-a92b-277f9183193d.png)
![image](https://user-images.githubusercontent.com/96708453/162381217-7cfd32bb-0515-4a7d-b069-7cf145ae4a68.png)


## Installation

Clone the repo and install the npm packages in the root directory of the project.

```bash
npm install
```

## To Run...
```bash
npm start // This application runs on port 3000.
```

## Run Unit Tests
```bash
No tests at the moment.
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
