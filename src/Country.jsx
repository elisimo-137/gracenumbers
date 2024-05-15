import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Country(props) {
  const { flag, name, flags } = props.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {name.common} {flag}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={flags.png}></img>
      </CardContent>
    </Card>
  );
}
