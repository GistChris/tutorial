import React, { Component } from "react";
import Navbar from "../Navbar";
import { Container } from "@mui/material";
import Player from "../Player";
import Head from "next/head";
interface MainLayoutProps {
  title?: string;
  description?: string;
  children: any;
  keywords?:string;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children /*ReactElement<any,string|JSXElementConstructor<any>> */,
  title,
  description,
  keywords
}) => {
  // const MainLayout: React.FC = () => {
  return (
    <>
      <Head>
        {/* dlia optimizatsii SEO  v zakladke ukazyvaetsia nazvanie 'Music platform'*/}
        <title>{title||'Music platform'}</title>
        <meta name="description" content={'Music plateform. Here every body can make youself' + description} />
        <meta name="robots" content="index,follow"/>
        <meta name="keywords" content={keywords ||"Music,tracks,artist"}/>
        <meta name="viewport" content="device-width,initial-scale=1"/>
      </Head>
      <Navbar />
      <Container style={{ margin: "90px 0" }}>{children}</Container>
      <Player />
    </>
  );
};

// const MainLayout: React.FC = ({ children }) => {
//   return (
//     <>
//       <Navbar />
//       <Container style={{margin:'90px 0'}}>
//       {children}
//       </Container>
//     </>
//   );
// };

export default MainLayout;
