import { Button, ButtonGroup } from "react-bootstrap";
import { Dash, Plus, Trash3 } from "react-bootstrap-icons";
import type { Menu } from "@/lib/helpers";

type Props = {
  menu: Menu;
  qty: number;
  onUbah: (menu: Menu, delta: number) => void;
};

export default function Stepper({ menu, qty, onUbah }: Props) {
  return (
    <ButtonGroup size="sm" aria-label={`Jumlah ${menu.nama}`}>
      <Button variant="outline-dark" onClick={() => onUbah(menu, -1)}>
        {qty === 1 ? <Trash3 /> : <Dash />}
      </Button>
      <Button variant="light" disabled className="fw-bold text-dark px-3">
        {qty}
      </Button>
      <Button variant="outline-dark" onClick={() => onUbah(menu, 1)}>
        <Plus />
      </Button>
    </ButtonGroup>
  );
}