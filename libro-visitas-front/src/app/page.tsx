"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@chakra-ui/react";

export default function Home() {
  const [flagMakeTx, setFlagMakeTx] = React.useState(false);
  const [flagGetOne, setFlagGetOne] = React.useState(false);
  const [flagGetAll, setFlagGetAll] = React.useState(false);
  const [oneSaludo, setOneSaludo] = React.useState<{
    address: string;
    message: string;
    timestamp: number;
  } | null>(null);

  const [allSaludos, setAllSaludos] = React.useState<
    {
      autor: string;
      mensaje: string;
      timestamp: number;
    }[][]
  >([]);

  async function sendTransaction() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const appID = process.env.NEXT_PUBLIC_APP_ID;

    setFlagMakeTx(true);

    console.log("API Key:", apiKey);
    console.log("App ID:", appID);

    const url = "https://api.vottun.tech/core/v1/evm/transact/mutable";

    const bodyData = {
      contractAddress: "0xE5FBBB17a2c55D895dAB55Aad93370e25Ad34BEC",
      contractSpecsId: 12210,
      sender: "0xf2234A7E0D9cCc8684Bbb6A3ed20A5cd430493D9",
      blockchainNetwork: 421614,
      method: "escribirSaludo",
      params: ["hola"],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "x-application-vkn": `${appID}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transaction successful:", data);

      setFlagMakeTx(false);

      // Puedes manejar la respuesta aquí
      return data;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  async function getOne() {
    setFlagGetOne(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const appID = process.env.NEXT_PUBLIC_APP_ID;

    const id = (document.getElementById("idGetOne") as HTMLInputElement)?.value;

    console.log("ID:", id);
    console.log("API Key:", apiKey);
    console.log("App ID:", appID);

    const url = "https://api.vottun.tech/core/v1/evm/transact/view";

    const bodyData = {
      contractAddress: "0xE5FBBB17a2c55D895dAB55Aad93370e25Ad34BEC",
      contractSpecsId: 12210,
      sender: "0xf2234A7E0D9cCc8684Bbb6A3ed20A5cd430493D9",
      blockchainNetwork: 421614,
      method: "obtenerSaludo",
      params: [Number(id)],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "x-application-vkn": `${appID}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transaction successful:", data);
      setOneSaludo({
        address: data[0],
        message: data[1],
        timestamp: data[2],
      });
      setFlagGetOne(false);
      console.log("One saludo:", oneSaludo);

      // Puedes manejar la respuesta aquí
      return data;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  async function getAll() {
    setFlagGetAll(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const appID = process.env.NEXT_PUBLIC_APP_ID;

    const id = (document.getElementById("idGetOne") as HTMLInputElement)?.value;

    console.log("ID:", id);
    console.log("API Key:", apiKey);
    console.log("App ID:", appID);

    const url = "https://api.vottun.tech/core/v1/evm/transact/view";

    const bodyData = {
      contractAddress: "0xE5FBBB17a2c55D895dAB55Aad93370e25Ad34BEC",
      contractSpecsId: 12210,
      sender: "0xf2234A7E0D9cCc8684Bbb6A3ed20A5cd430493D9",
      blockchainNetwork: 421614,
      method: "obtenerTodosSaludos",
      params: [],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "x-application-vkn": `${appID}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transaction successful:", data);
      setAllSaludos(data);
      setFlagGetAll(false);
      console.log("All saludos:", allSaludos);

      // Puedes manejar la respuesta aquí
      return data;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Card
          style={{
            backgroundColor: "#FAF9F6",
          }}
        >
          <CardHeader>
            <h1>Libro de visitas</h1>
          </CardHeader>
          <CardBody>
            <p>Deja tu mensaje en nuestro libro de visitas.</p>
            <br />
            <Input placeholder="Hola..." />

            <Button
              colorScheme="teal"
              size="sm"
              onClick={sendTransaction}
              style={{
                marginTop: "1rem",
              }}
              isLoading={flagMakeTx}
            >
              Enviar
            </Button>
          </CardBody>
          <Divider />

          <CardBody>
            <p>Ver mensajes</p>
            <br />
            <p>Buscar por numero de saludo:</p>
            <Input placeholder="1" id="idGetOne" />

            <Button
              colorScheme="teal"
              size="sm"
              style={{
                marginBottom: "1rem",
              }}
              onClick={getOne}
              isLoading={flagGetOne}
            >
              Buscar
            </Button>

            {oneSaludo && (
              <div>
                <p>Saludo: {oneSaludo.message}</p>
                <p>Autor: {oneSaludo.address}</p>{" "}
                {/* Muestra la dirección del autor */}
                <p>
                  Timestamp:{" "}
                  {new Date(oneSaludo.timestamp * 1000).toLocaleString()}{" "}
                  {/* Formatea el timestamp */}
                </p>
              </div>
            )}

            <br />
            <p>Ultimos saludos:</p>
            <Button
              colorScheme="teal"
              size="sm"
              style={{
                marginBottom: "1rem",
              }}
              onClick={getAll}
              isLoading={flagGetAll}
            >
              Ver todos
            </Button>
            {allSaludos.length > 0 && allSaludos[0].length > 0 ? ( // Verifica si hay saludos en el primer arreglo
              allSaludos[0].map(
                (
                  saludo,
                  index // Accede al primer elemento de allSaludos
                ) => (
                  <div key={index}>
                    <p>Saludo: {saludo.mensaje}</p>
                    <p>
                      Autor: {saludo.autor}
                      <br /> {/* Muestra el autor */}
                      Timestamp:{" "}
                      {new Date(saludo.timestamp * 1000).toLocaleString()}{" "}
                      {/* Formatea el timestamp */}
                    </p>
                  </div>
                )
              )
            ) : (
              <p>No hay saludos disponibles.</p>
            )}
          </CardBody>
        </Card>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
