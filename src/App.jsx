import { useEffect, useState } from "react";
import Random from "./Random";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function App() {
  const [fact, setFact] = useState({});
  const [number, setNumber] = useState(0);
  const [countries, setCountries] = useState([]);

  const [colors, setColors] = useState([
    "red",
    "blue",
    "orange",
    "green",
    "purple",
  ]);

  async function getRandomFact() {
    const response = await fetch("http://numbersapi.com/random?json");
    const data = await response.json();
    setFact(data);
  }

  async function getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data);
  }

  useEffect(() => {
    getCountries();
  }, []);

  async function getNumberFact(number) {
    const response = await fetch("http://numbersapi.com/" + number + "?json");
    const data = await response.json();
    setFact(data);
  }

  useEffect(() => {
    getRandomFact();
  }, []);

  useEffect(() => {
    getNumberFact(number);
  }, [number]);

  return (
    <div className="container">
      {countries
        .filter((country) => country.region == "Asia")
        .map((country) => (
          <p>{country.name.common}</p>
        ))}

      {colors.map((color) => (
        <p>{color}</p>
      ))}
      <Input
        placeholder="Vnesi število, ki te zanima..."
        type="number"
        onChange={(e) => setNumber(e.target.value)}
      />
      <Random fact={fact}></Random>
    </div>
  );
}
