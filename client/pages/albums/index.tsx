import Navbar from "@/components/Navbar";
import MainLayout from "@/components/layouts/MainLayout";
import { Container } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <>

      <Navbar />
<Container style={{margin:'90px 0'}}>
      <div>Abums List</div>
      </Container>
    </>
  );
};

export default index;
