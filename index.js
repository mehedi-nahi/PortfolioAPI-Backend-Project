const app= require("./app.js");
let PORT= 5002;

app.listen(PORT, ()=>{
    console.log("Server is running on port ",PORT);
});