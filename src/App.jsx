import { useEffect, useState } from "react";
import Random from "./Random";
import { Input } from "@/components/ui/input";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Country from "./Country";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function App() {
  const [fact, setFact] = useState({});
  const [number, setNumber] = useState(0);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("Oceania");

  /*const [colors, setColors] = useState([
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
  ]);
*/
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
      <h3>izbrana regija: {region}</h3>
      <Select onValueChange={(x) => setRegion(x)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Europe">Europe</SelectItem>
          <SelectItem value="Asia">Asia</SelectItem>
          <SelectItem value="Africa">Africa</SelectItem>
          <SelectItem value="Oceania">Oceania</SelectItem>
          <SelectItem value="Americas">America</SelectItem>
        </SelectContent>
      </Select>

      <Carousel>
        <CarouselContent>
          {countries
            .filter((country) => country.region == region)
            .map((country) => (
              <>
                <CarouselItem className="basis-1/3">
                  <Country data={country}></Country>
                </CarouselItem>
              </>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* {colors.map((color) => (
        <p>{color}</p>
      ))} */}
      <Input
        placeholder="Vnesi število, ki te zanima..."
        type="number"
        onChange={(e) => setNumber(e.target.value)}
      />
      <Random fact={fact}></Random>
    </div>
  );
}
