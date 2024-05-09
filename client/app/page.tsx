import React from "react";
import { Button } from "@mui/material";
import Navbar from "@/components/Navbar";
const Index = () => {
  return (
    <>
    <Navbar/>
    <div className="center">
      <h1>Welcome to spotify!</h1>
      <h3>Here we have the best traks!</h3>
      <Button>Button</Button>
    </div>
    {/* <style jsx > */}
    <style >
{`
.center{
  margin-top:150px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`
  
  
}
    </style>
    </>
  );
};
export default Index;
