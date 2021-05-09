import upperFirst from "lodash/upperFirst"
import camelCase from "lodash/camelCase"

const requireComponent = require.context(".", false, /[\w-].vue$/)

export default function (app) {
  requireComponent.keys().forEach((fileName) => {
    console.log(fileName)
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")))
    app.component(componentName, componentConfig.default || componentConfig)
  })
}

// // Globally register all base components for convenience, because they
// // will be used very frequently. Components are registered using the
// // PascalCased version of their file name.

// import Vue from "vue"

// // https://webpack.js.org/guides/dependency-management/#require-context
// const requireComponent = require.context(
//   // Look for files in the current directory
//   ".",
//   // Do not look in subdirectories
//   false,
//   // Only include "_base-" prefixed .vue files
//   /[\w-]+\.vue$/
// )

// // For each matching file name...
// requireComponent.keys().forEach((fileName) => {
//   console.log(fileName)
//   // Get the component config
//   const componentConfig = requireComponent(fileName)
//   // Get the PascalCase version of the component name
//   const componentName = fileName
//     // Remove the "./_" from the beginning
//     .replace(/^\.\/_/, "")
//     // Remove the file extension from the end
//     .replace(/\.\w+$/, "")
//     // Split up kebabs
//     .split("-")
//     // Upper case
//     .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
//     // Concatenated
//     .join("")

//   // Globally register the component
//   Vue.component(componentName, componentConfig.default || componentConfig)
// })
