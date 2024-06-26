import Head from "next/head";
import { useRouter } from "next/router";
import { Card, Container } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AppHeader from "components/global/AppHeader";
import SalesPanel from "components/entities/sales/SalesPanel";
import ClientsPanel from "components/entities/clients/ClientsPanel";
import ProductsPanel from "components/entities/products/ProductsPanel";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container marginTop={8}>
        <AppHeader />
        <Card p={4}>
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>💰 Ventas</Tab>
              <Tab>🤝 Clientes</Tab>
              <Tab>🛒 Productos</Tab>
            </TabList>
            <TabPanels>
              <SalesPanel />
              <ClientsPanel />
              <ProductsPanel />
            </TabPanels>
          </Tabs>
        </Card>
      </Container>
    </>
  );
}