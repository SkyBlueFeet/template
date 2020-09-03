// import "babel-polyfill";
// import update from './update.js';
function updates() {
    console.log("update");
  }
  
  console.log(Array.from("test").includes("t"));
  // even though Rollup is bundling all your files together, errors and
  // logs will still point to your original source modules
  const t = "one";
  console.log(`this is ${t}`);
  console.log(
    "if you have sourcemaps enabled in your devtools, click on main.js:5 -->"
  );
  
  Array.from("test").forEach((i)=>{
    console.log(i);
  })
  
  // update();
  