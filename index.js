const app= require("./app.js");
let PORT= 5001;

app.listen(PORT, ()=>{
    console.log("Server is running on port ",PORT);
});