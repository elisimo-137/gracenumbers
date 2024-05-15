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
import Vaja from "./Vaja";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function App() {
  const [fact, setFact] = useState({});
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("Europe");
  const [number, setNumber] = useState(1);
  const [landlocked, setLandlocked] = useState(false);
  const [borders, setBorders] = useState(1);

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
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flag,borders,region,flags,landlocked",
    );
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
    <div container className="flex h-full flex-col items-center gap-4">
      <Vaja></Vaja>
      <h3>Izbrana regija: {region}</h3>
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>izbira regije</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(x) => setRegion(x)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
                <SelectItem value="Americas">America</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Države brez morja</CardTitle>
          </CardHeader>
          <CardContent>
            <Checkbox
              checked={landlocked}
              onCheckedChange={(value) => setLandlocked(value)}
            ></Checkbox>
            označi, če nima morja
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Število sosednjih držav: {borders}</CardHeader>
          <CardContent>
            <Slider
              defaultValue={[33]}
              max={14}
              step={1}
              onValueChange={(value) => setBorders(value)}
            />
          </CardContent>
        </Card>
      </div>

      <Carousel className="w-2/3">
        <CarouselContent>
          {countries
            .filter((country) => region == "all" || country.region == region)
            .filter((country) => country.landlocked == landlocked)
            .filter((country) => borders == country.borders.length)
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

      {/* { {colors.map((color) => (
        <p>{color}</p>
      ))} }
      <Input
        placeholder="Vnesi število, ki te zanima..."
        type="number"
        onChange={(e) => setNumber(e.target.value)}
      />
      <Random fact={fact}></Random> */}
    </div>
  );
}
