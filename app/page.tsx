"use client";

import Stepper from "../components/stepper"; 
import { kontak, rupiah, type Item, type Menu } from "../lib/helpers";
import TentangKami from "../components/tentang";
import Keranjang from "../components/keranjang";
import Faq from "../components/faq";
import Kontak from "../components/kontak";

import { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CloseButton,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Modal,
  Nav,
  Navbar,
  OverlayTrigger,
  Row,
  ToggleButton,
  Toast,
  ToastContainer,
  Tooltip,
} from "react-bootstrap";
import {
  BagCheckFill,
  Cart3,
  CheckCircleFill,
  Dash,
  GeoAltFill,
  Plus,
  TelephoneFill,
} from "react-bootstrap-icons";

const NAMA = "Claudia Linetta Widjaja";
const NIM = "535250098";
const PAJAK = 0.1;

const daftarMenu: Menu[] = [
  {
    id: 1,
    nama: "Kopi Susu Gula Aren",
    kategori: "Kopi",
    harga: 22000,
    gambar: "/menu/gularen.png",
    deskripsi: "Espresso, susu segar, dan gula aren asli. Manisnya pas.",
    label: "Terlaris",
  },
  {
    id: 2,
    nama: "Single Origin Gayo",
    kategori: "Kopi",
    harga: 28000,
    gambar: "/menu/gayo.png",
    deskripsi: "Biji dari dataran tinggi Gayo, Aceh. Aroma rempah dan cokelat.",
    label: "Pilihan Barista",
  },
  {
    id: 3,
    nama: "Es Kopi Pandan",
    kategori: "Kopi",
    harga: 25000,
    gambar: "/menu/pandan.png",
    deskripsi: "Kopi dingin dengan sirup pandan. Segar buat siang hari.",
    label: "Baru",
  },
  {
    id: 4,
    nama: "Matcha Latte",
    kategori: "Non-Kopi",
    harga: 26000,
    gambar: "/menu/matcha.png",
    deskripsi: "Matcha lembut dengan susu, cocok buat yang nggak ngopi.",
  },
  {
    id: 5,
    nama: "Croissant Mentega",
    kategori: "Makanan",
    harga: 20000,
    gambar: "/menu/croiss.png",
    deskripsi: "Renyah di luar, lembut di dalam. Dipanggang tiap pagi.",
  },
  {
    id: 6,
    nama: "Roti Bakar Cokelat",
    kategori: "Makanan",
    harga: 18000,
    gambar: "/menu/roti.png",
    deskripsi: "Roti tebal dengan cokelat leleh dan taburan keju.",
  },
  {
    id: 7,
    nama: "Kentang Goreng",
    kategori: "Makanan",
    harga: 18000,
    gambar: "/menu/kentang.png",
    deskripsi: "Kentang goreng renyah dengan taburan bumbu gurih.",
  },
  {
    id: 8,
    nama: "Pisang Goreng",
    kategori: "Makanan",
    harga: 18000,
    gambar: "/menu/pisang.png",
    deskripsi:
      "Pisang goreng hangat dengan tekstur renyah di luar dan lembut di dalam.",
  },
  {
    id: 9,
    nama: "Vietnam Drip",
    kategori: "Kopi",
    harga: 25000,
    gambar: "/menu/vietnamdrip.png",
    deskripsi:
      "Kopi seduh perlahan dengan metode Vietnam drip, rasa pekat dan aroma khas.",
  },
  {
    id: 10,
    nama: "Americano",
    kategori: "Kopi",
    harga: 20000,
    gambar: "/menu/americano.png",
    deskripsi:
      "Espresso dengan tambahan air, rasa kopi yang ringan dan menyegarkan.",
  },
  {
    id: 11,
    nama: "Tubruk Jawa",
    kategori: "Kopi",
    harga: 18000,
    gambar: "/menu/tubruk.png",
    deskripsi:
      "Kopi tubruk khas Jawa dengan aroma kuat dan cita rasa tradisional.",
  },
  {
    id: 12,
    nama: "Susu Cokelat",
    kategori: "Non-Kopi",
    harga: 22000,
    gambar: "/menu/coklat.png",
    deskripsi: "Minuman cokelat dengan susu creamy dan rasa manis yang pas.",
  },
  {
    id: 13,
    nama: "Lemon Tea",
    kategori: "Non-Kopi",
    harga: 18000,
    gambar: "/menu/lemon.png",
    deskripsi: "Teh segar dengan perpaduan rasa manis dan asam lemon.",
  },
];

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

const slideHero = [
  {
    gambar: "/hero-1.jpg",
    judul: "Dari kebun lokal ke cangkirmu",
    teks: "Biji kopi pilihan dari berbagai daerah di Indonesia.",
  },
  {
    gambar: "/hero-2.jpg",
    judul: "Diseduh dengan sepenuh hati",
    teks: "Setiap cangkir dibuat langsung oleh barista kami.",
  },
  {
    gambar: "/hero-3.jpg",
    judul: "Tempat nyaman untuk kerja dan ngobrol",
    teks: "Wi-Fi kencang, colokan banyak, kopi enak.",
  },
];

const formAwal = {
  nama: "",
  tipe: "Dine In",
  meja: "",
  bayar: "QRIS",
  catatan: "",
};

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [kategori, setKategori] = useState("Semua");
  const [detail, setDetail] = useState<Menu | null>(null);
  const [qtyDetail, setQtyDetail] = useState(1);
  const [keranjang, setKeranjang] = useState<Item[]>([]);
  const [siap, setSiap] = useState(false);
  const [bukaKeranjang, setBukaKeranjang] = useState(false);
  const [bukaCheckout, setBukaCheckout] = useState(false);
  const [form, setForm] = useState(formAwal);
  const [validated, setValidated] = useState(false);
  const [struk, setStruk] = useState<{
    no: string;
    total: number;
    nama: string;
    daftar: Item[];
  } | null>(null);
  const [toast, setToast] = useState("");
  const [promo, setPromo] = useState(true);
  const [hariIni, setHariIni] = useState(-1);
  const [aktif, setAktif] = useState("beranda");

  useEffect(() => {
    try {
      const data = localStorage.getItem("keranjang-kopi");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (data) setKeranjang(JSON.parse(data));
    } catch {}
    setHariIni(new Date().getDay());
    setSiap(true);
  }, []);

  useEffect(() => {
    if (siap) localStorage.setItem("keranjang-kopi", JSON.stringify(keranjang));
  }, [keranjang, siap]);

  useEffect(() => {
    const idBagian = ["beranda", "menu", "tentang", "info", "faq", "kontak"];
    const cek = () => {
      let sekarang = idBagian[0];
      for (const id of idBagian) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) sekarang = id;
      }
      // kalau sudah mentok di bawah, anggap sedang di Kontak
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        sekarang = "kontak";
      }
      setAktif(sekarang === "info" || sekarang === "faq" ? "tentang" : sekarang);
    };
    window.addEventListener("scroll", cek, { passive: true });
    return () => window.removeEventListener("scroll", cek);
  }, []);
  
  const menuTampil =
    kategori === "Semua"
      ? daftarMenu
      : daftarMenu.filter((m) => m.kategori === kategori);
  const qtyDi = (id: number) =>
    keranjang.find((i) => i.menu.id === id)?.qty ?? 0;
  const jumlahItem = keranjang.reduce((a, i) => a + i.qty, 0);
  const subtotal = keranjang.reduce((a, i) => a + i.qty * i.menu.harga, 0);

  const diskon = qtyDi(1) >= 2 && qtyDi(5) > 0 ? daftarMenu[4].harga : 0;
  const pajak = Math.round((subtotal - diskon) * PAJAK);
  const total = subtotal - diskon + pajak;

  const ubah = (menu: Menu, delta: number) =>
    setKeranjang((prev) => {
      if (!prev.some((i) => i.menu.id === menu.id))
        return delta > 0 ? [...prev, { menu, qty: delta }] : prev;
      return prev
        .map((i) => (i.menu.id === menu.id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
    });

  const tambah = (menu: Menu, qty = 1) => {
    ubah(menu, qty);
    setToast(
      `${qty > 1 ? qty + "x " : ""}${menu.nama} ditambahkan ke pesanan.`,
    );
  };

  const bukaDetail = (m: Menu) => {
    setDetail(m);
    setQtyDetail(1);
  };
  const setField = (k: keyof typeof formAwal, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const kirimPesanan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return setValidated(true);
    setStruk({
      no: `KN-${Math.floor(1000 + Math.random() * 9000)}`,
      total,
      nama: form.nama,
      daftar: keranjang,
    });
    setKeranjang([]);
    setForm(formAwal);
    setValidated(false);
  };

  const tutupCheckout = () => {
    setBukaCheckout(false);
    setStruk(null);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="md" sticky="top" className="navbar-kopi">
        <Container>
          <Navbar.Brand
            href="#beranda"
            className="brand d-flex align-items-center"
          >
            <Image
              src="/logo.png"
              alt="Logo Kopi Nusantara"
              width={36}
              height={36}
              className="me-2"
            />
            Kopi Nusantara
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-navbar" />
          <Navbar.Collapse id="menu-navbar">
            <Nav className="ms-auto align-items-md-center">
              <Nav.Link href="#beranda" active={aktif === "beranda"}>Beranda</Nav.Link>
              <Nav.Link href="#menu" active={aktif === "menu"}>Menu</Nav.Link>
              <Nav.Link href="#tentang" active={aktif === "tentang"}>Tentang Kami</Nav.Link>
              <Nav.Link href="#kontak" active={aktif === "kontak"}>Kontak</Nav.Link>
              <Button
                variant="outline-warning"
                className="ms-md-3 mt-2 mt-md-0"
                onClick={() => setBukaKeranjang(true)}
              >
                <Cart3 className="me-2" />
                Pesanan{" "}
                <Badge bg="warning" text="dark">
                  {jumlahItem}
                </Badge>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* PROMO */}
      {promo && (
        <Container className="mt-3">
          <Alert
            variant="warning"
            className="promo-kopi d-flex justify-content-between align-items-center mb-0"
          >
            <span>
              Promo bulan ini: beli 2 Kopi Susu Gula Aren, gratis 1 Croissant!
            </span>
            <CloseButton onClick={() => setPromo(false)} />
          </Alert>
        </Container>
      )}

      {/* IDENTITAS */}
      <header id="beranda" className="intro text-center">
        <Container>
          <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
            Kopi Nusantara dengan Next.js
          </Badge>
          <h1 className="intro-judul">{NAMA}</h1>
          <p className="intro-nim">NIM: {NIM}</p>
        </Container>
      </header>

      {/* CAROUSEL */}
      <Carousel activeIndex={slide} onSelect={setSlide}>
        {slideHero.map((s) => (
          <Carousel.Item key={s.judul}>
            <Image
              src={s.gambar}
              alt={s.judul}
              className="d-block w-100 gambar-hero"
            />
            <Carousel.Caption>
              <h3>{s.judul}</h3>
              <p>{s.teks}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* MENU */}
      <section id="menu" className="py-5">
        <Container>
          <Badge
            bg="warning"
            text="dark"
            className="px-3 py-2 rounded-pill mb-3"
          >
            OUR MENU
          </Badge>
          <h2 className="judul-seksi mb-1">Temukan Favoritmu</h2>
          <p className="text-secondary">
            Dari kopi pilihan hingga camilan hangat. Tap gambar untuk lihat
            detail.
          </p>

          <div
            className="kategori-menu"
            role="group"
            aria-label="Filter kategori menu"
          >
            {daftarKategori.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kategori === k}
                className={`btn-kategori ${kategori === k ? "active" : ""}`}
                onClick={() => setKategori(k)}
              >
                {k}
              </button>
            ))}
          </div>

          <p className="small text-secondary mb-3">
            Menampilkan {menuTampil.length} menu
          </p>

          <Row className="g-3 g-lg-4">
            {menuTampil.map((item) => {
              const qty = qtyDi(item.id);
              return (
                <Col key={item.id} xs={6} lg={4} xl={3} className="d-flex">
                  <Card className="kartu-menu w-100">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Lihat detail</Tooltip>}
                    >
                      <div
                        className="menu-gambar"
                        role="button"
                        tabIndex={0}
                        aria-label={`Lihat detail ${item.nama}`}
                        onClick={() => bukaDetail(item)}
                        onKeyDown={(e) => e.key === "Enter" && bukaDetail(item)}
                      >
                        <Card.Img src={item.gambar} alt={item.nama} />
                        {item.label && (
                          <Badge
                            bg="warning"
                            text="dark"
                            className="label-menu"
                          >
                            {item.label}
                          </Badge>
                        )}
                      </div>
                    </OverlayTrigger>

                    <Card.Body>
                      <small className="text-secondary">{item.kategori}</small>
                      <Card.Title>{item.nama}</Card.Title>
                      <Card.Text>{item.deskripsi}</Card.Text>
                      <div className="mt-auto pt-3 border-top d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <span className="harga-menu">{rupiah(item.harga)}</span>
                        {qty > 0 ? (
                          <Stepper menu={item} qty={qty} onUbah={ubah} />
                        ) : (
                          <Button
                            size="sm"
                            className="btn-tambah"
                            onClick={() => tambah(item)}
                          >
                            <Plus size={18} /> Tambah
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* TENTANG KAMI */}
      <TentangKami hariIni={hariIni} />
      <Faq />
      <Kontak />

      {/* FOOTER */}
      <footer className="footer-kopi py-4">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>
            © 2026 Kopi Nusantara · {NAMA} ({NIM})
          </span>
          <span>
          <GeoAltFill className="me-1" /> {kontak.alamat}
          <TelephoneFill className="ms-3 me-1" /> {kontak.wa}
        </span>
        </Container>
      </footer>

      {/* MODAL DETAIL */}
      <Modal show={!!detail} onHide={() => setDetail(null)} centered>
        {detail && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{detail.nama}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={detail.gambar}
                alt={detail.nama}
                rounded
                className="modal-gambar mb-3"
              />
              <Badge bg="secondary" className="me-2">
                {detail.kategori}
              </Badge>
              {detail.label && (
                <Badge bg="warning" text="dark">
                  {detail.label}
                </Badge>
              )}
              <p className="mt-2">{detail.deskripsi}</p>
              <h5 className="mb-0">{rupiah(detail.harga)}</h5>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
              <ButtonGroup>
                <Button
                  variant="outline-dark"
                  disabled={qtyDetail <= 1}
                  onClick={() => setQtyDetail(qtyDetail - 1)}
                >
                  <Dash />
                </Button>
                <Button
                  variant="light"
                  disabled
                  className="fw-bold text-dark px-3"
                >
                  {qtyDetail}
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => setQtyDetail(qtyDetail + 1)}
                >
                  <Plus />
                </Button>
              </ButtonGroup>
              <Button
                variant="warning"
                onClick={() => {
                  tambah(detail, qtyDetail);
                  setDetail(null);
                }}
              >
                Tambah · {rupiah(detail.harga * qtyDetail)}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* KERANJANG */}
      <Keranjang
        show={bukaKeranjang}
        onHide={() => setBukaKeranjang(false)}
        keranjang={keranjang}
        jumlahItem={jumlahItem}
        subtotal={subtotal}
        diskon={diskon}
        pajak={pajak}
        total={total}
        qtyGula={qtyDi(1)}
        adaCroissant={qtyDi(5) > 0}
        onUbah={ubah}
        onKosongkan={() => setKeranjang([])}
        onCheckout={() => {
          setBukaKeranjang(false);
          setBukaCheckout(true);
        }}
        onTambahCroissant={() => tambah(daftarMenu[4])}
      />

      {/* CHECKOUT */}
      <Modal show={bukaCheckout} onHide={tutupCheckout} centered>
        {struk ? (
          <Modal.Body className="text-center py-5">
            <BagCheckFill size={52} className="text-success mb-3" />
            <h4>Pesanan diterima!</h4>
            <p className="text-secondary mb-1">
              Terima kasih, {struk.nama}. Nomor pesananmu:
            </p>
            <h3 className="mb-1">{struk.no}</h3>
            <ListGroup variant="flush" className="text-start small mb-3">
              {struk.daftar.map(({ menu, qty }) => (
                <ListGroup.Item
                  key={menu.id}
                  className="bg-transparent px-0 d-flex justify-content-between"
                >
                  <span>
                    {qty}x {menu.nama}
                  </span>
                  <span>{rupiah(menu.harga * qty)}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <p className="mb-4">Total bayar {rupiah(struk.total)}</p>
            <Button variant="warning" onClick={tutupCheckout}>
              Selesai
            </Button>
          </Modal.Body>
        ) : (
          <Form noValidate validated={validated} onSubmit={kirimPesanan}>
            <Modal.Header closeButton>
              <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="nama">
                <Form.Label>Nama pemesan</Form.Label>
                <Form.Control
                  required
                  minLength={3}
                  value={form.nama}
                  placeholder="Nama kamu"
                  onChange={(e) => setField("nama", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Isi nama minimal 3 huruf.
                </Form.Control.Feedback>
              </Form.Group>

              <ButtonGroup className="w-100 mb-3">
                {["Dine In", "Take Away"].map((t) => (
                  <ToggleButton
                    key={t}
                    id={`tipe-${t}`}
                    type="radio"
                    variant="outline-dark"
                    name="tipe"
                    value={t}
                    checked={form.tipe === t}
                    onChange={() => setField("tipe", t)}
                  >
                    {t}
                  </ToggleButton>
                ))}
              </ButtonGroup>

              {form.tipe === "Dine In" && (
                <Form.Group className="mb-3" controlId="meja">
                  <Form.Label>Nomor meja</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={1}
                    max={30}
                    value={form.meja}
                    placeholder="1 - 30"
                    onChange={(e) => setField("meja", e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Isi nomor meja 1 - 30.
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="bayar">
                <Form.Label>Metode pembayaran</Form.Label>
                <Form.Select
                  value={form.bayar}
                  onChange={(e) => setField("bayar", e.target.value)}
                >
                  <option>QRIS</option>
                  <option>Tunai di kasir</option>
                  <option>Transfer bank</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="catatan">
                <Form.Label>Catatan (opsional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={form.catatan}
                  placeholder="Contoh: less sugar"
                  onChange={(e) => setField("catatan", e.target.value)}
                />
              </Form.Group>

              <div className="rincian small">
                <div>
                  <span>{jumlahItem} item</span>
                  <span>{rupiah(subtotal)}</span>
                </div>
                {diskon > 0 && (
                  <div className="text-success">
                    <span>Promo</span>
                    <span>-{rupiah(diskon)}</span>
                  </div>
                )}
                <div>
                  <span>Pajak 10%</span>
                  <span>{rupiah(pajak)}</span>
                </div>
                <div className="fw-bold fs-6 pt-2 border-top">
                  <span>Total bayar</span>
                  <span>{rupiah(total)}</span>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={tutupCheckout}>
                Batal
              </Button>
              <Button
                type="submit"
                variant="success"
                disabled={keranjang.length === 0}
              >
                Pesan Sekarang
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>
      
      {jumlahItem > 0 && !bukaKeranjang && (
        <Button
          variant="warning"
          className="fab-keranjang d-md-none"
          onClick={() => setBukaKeranjang(true)}
          aria-label="Buka pesanan"
        >
          <Cart3 size={20} className="me-2" />
          {jumlahItem} item · {rupiah(total)}
        </Button>
      )}

      {/* TOAST */}
      <ToastContainer
        position="top-center"
        className="p-3 position-fixed"
        style={{ zIndex: 2000 }}
      >
        <Toast
          show={!!toast}
          onClose={() => setToast("")}
          delay={2500}
          autohide
        >
          <Toast.Header>
            <CheckCircleFill className="text-success me-2" />
            <strong className="me-auto">Kopi Nusantara</strong>
            <small>baru saja</small>
          </Toast.Header>
          <Toast.Body>{toast}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
