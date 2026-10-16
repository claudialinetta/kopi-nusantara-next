"use client";

import { Alert, Button, Image, ListGroup, Offcanvas } from "react-bootstrap";
import { Cart3, Gift } from "react-bootstrap-icons";
import Stepper from "../components/stepper";
import { rupiah, type Item, type Menu } from "@/lib/helpers";

type Props = {
  show: boolean;
  onHide: () => void;
  keranjang: Item[];
  jumlahItem: number;
  subtotal: number;
  diskon: number;
  pajak: number;
  total: number;
  qtyGula: number;
  adaCroissant: boolean;
  onUbah: (menu: Menu, delta: number) => void;
  onKosongkan: () => void;
  onCheckout: () => void;
  onTambahCroissant: () => void;
};

export default function Keranjang({
  show,
  onHide,
  keranjang,
  jumlahItem,
  subtotal,
  diskon,
  pajak,
  total,
  qtyGula,
  adaCroissant,
  onUbah,
  onKosongkan,
  onCheckout,
  onTambahCroissant,
}: Props) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Pesanan Saya ({jumlahItem})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        {keranjang.length === 0 ? (
          <div className="keranjang-kosong text-center my-auto">
            <Cart3 size={44} className="mb-3" />
            <h6 className="mb-1">Pesananmu masih kosong</h6>
            <p className="small mb-3">
              Pilih menu favoritmu dulu, nanti muncul di sini.
            </p>
            <Button variant="warning" href="#menu" onClick={onHide}>
              Lihat Menu
            </Button>
          </div>
        ) : (
          <>
            {diskon > 0 ? (
              <Alert variant="success" className="small py-2">
                <Gift className="me-2" />
                Promo aktif: 1 Croissant Mentega gratis.
              </Alert>
            ) : qtyGula >= 2 && !adaCroissant ? (
              <Alert
                variant="warning"
                className="small py-2 d-flex justify-content-between align-items-center gap-2"
              >
                <span>
                  <Gift className="me-2" />
                  Kamu dapat 1 Croissant gratis!
                </span>
                <Button size="sm" variant="warning" onClick={onTambahCroissant}>
                  Ambil
                </Button>
              </Alert>
            ) : qtyGula === 1 ? (
              <Alert variant="light" className="small py-2 border">
                Tambah 1 Kopi Susu Gula Aren lagi, dapat Croissant gratis.
              </Alert>
            ) : null}

            <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
              {keranjang.map(({ menu, qty }) => (
                <ListGroup.Item
                  key={menu.id}
                  className="bg-transparent px-0 d-flex gap-3 align-items-center"
                >
                  <Image
                    src={menu.gambar}
                    alt={menu.nama}
                    rounded
                    className="thumb"
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{menu.nama}</div>
                    <div className="small text-secondary mb-1">
                      {rupiah(menu.harga)}
                    </div>
                    <Stepper menu={menu} qty={qty} onUbah={onUbah} />
                  </div>
                  <strong className="small">{rupiah(menu.harga * qty)}</strong>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="rincian small mt-3">
              <div>
                <span>Subtotal</span>
                <span>{rupiah(subtotal)}</span>
              </div>
              {diskon > 0 && (
                <div className="text-success">
                  <span>Promo gratis croissant</span>
                  <span>-{rupiah(diskon)}</span>
                </div>
              )}
              <div>
                <span>Pajak 10%</span>
                <span>{rupiah(pajak)}</span>
              </div>
              <div className="fw-bold fs-6 pt-2 border-top">
                <span>Total</span>
                <span>{rupiah(total)}</span>
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <Button variant="success" onClick={onCheckout}>
                Checkout · {rupiah(total)}
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-danger"
                onClick={() => {
                  if (window.confirm("Kosongkan semua pesanan?")) onKosongkan();
                }}
              >
                Kosongkan pesanan
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}