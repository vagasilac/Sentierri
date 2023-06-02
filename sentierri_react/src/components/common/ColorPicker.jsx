import { HexColorPicker } from "react-colorful";

export default function ColorPicker() {
  const [color, setColor] = useState("#aabbcc");

  return <HexColorPicker color={color} onChange={setColor} />;
}
