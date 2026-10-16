"use client";

import {
  Accordion,
  Badge,
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  ClockFill,
  CupHotFill,
  GeoAltFill,
  Instagram,
  PeopleFill,
  TelephoneFill,
  Wifi,
} from "react-bootstrap-icons";
import type { Icon } from "react-bootstrap-icons";

const nilai: { ikon: Icon; judul: string; teks: string }[] = [
  {
    ikon: CupHotFill,
    judul: "Biji dari daerah",
    teks: "Kopi kami berasal dari daerah penghasil di Indonesia, seperti Gayo di Aceh.",
  },
  {
    ikon: PeopleFill,
    judul: "Barista yang ramah",
    teks: "Bingung pilih menu? Tanya saja, kami senang jelasin bedanya.",
  },
  {
    ikon: Wifi,
    judul: "Enak buat lama-lama",
    teks: "Wi-Fi kencang dan colokan banyak, cocok buat nugas atau ngobrol.",
  },
];

const jamBuka = [
  { hari: "Senin - Jumat", jam: "08.00 - 22.00", idx: [1, 2, 3, 4, 5] },
  { hari: "Sabtu - Minggu", jam: "09.00 - 23.00", idx: [0, 6] },
];

const faq = [
  [
    "Bisa beli biji kopi untuk dibawa pulang?",
    "Bisa. Tersedia kemasan 200 gram dan 1 kg, dan bisa digiling sesuai alat seduhmu.",
  ],
  [
    "Bisa pesan antar?",
    "Bisa lewat aplikasi ojek online atau chat langsung ke kami.",
  ],
  [
    "Apakah ada menu tanpa kafein?",
    "Ada. Pilih kategori Non-Kopi seperti Matcha Latte, Susu Cokelat, dan Lemon Tea.",
  ],
  ["Metode pembayaran apa saja?", "QRIS, tunai, dan transfer bank."],
];

export default function TentangKami({ hariIni }: { hariIni: number }) {
  return (
    <section id="tentang" className="bagian-info py-5">
      <Container>
        <Row className="g-4 g-lg-5 align-items-center mb-5">
          <Col lg={5}>
            <Image
              src="/tentang.png"
              alt="Barista menyeduh kopi di Kopi Nusantara"
              className="tentang-gambar"
            />
          </Col>
          <Col lg={7}>
            <Badge
              bg="warning"
              text="dark"
              className="px-3 py-2 rounded-pill mb-3"
            >
              TENTANG KAMI
            </Badge>
            <h2 className="judul-seksi mb-3">Kopi lokal, tanpa ribet</h2>
            <p>
              Kopi Nusantara mulai dari satu pertanyaan sederhana: kenapa kopi
              dari negeri sendiri jarang jadi pilihan pertama? Padahal tiap
              daerah punya rasa yang beda. Gayo terasa rempah dan cokelat, Jawa
              kuat dan pekat.
            </p>
            <p>
              Karena itu kami memilih biji dari beberapa daerah di Indonesia,
              lalu menyeduhnya sesuai karakter masing-masing. Ada yang cocok
              jadi espresso, ada yang lebih enak diseduh manual.
            </p>
            <p className="mb-0">
              Belum terbiasa minum kopi? Tenang, ada kopi susu gula aren yang
              manis, matcha, cokelat, dan camilan hangat. Duduk saja dulu,
              pesannya belakangan.
            </p>
          </Col>
        </Row>

        <Row className="g-3 mb-5">
          {nilai.map(({ ikon: Ikon, judul, teks }) => (
            <Col md={4} key={judul}>
              <div className="nilai-kartu">
                <Ikon className="nilai-ikon" />
                <h3>{judul}</h3>
                <p>{teks}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <h3 className="h5 text-center mb-3">Info Kunjungan</h3>
            <Tabs defaultActiveKey="jam" id="tab-info" fill className="mb-0">
              <Tab eventKey="jam" title="Jam Buka">
                <ListGroup variant="flush">
                  {jamBuka.map((j) => (
                    <ListGroup.Item
                      key={j.hari}
                      className="d-flex justify-content-between align-items-center bg-transparent"
                    >
                      <span>
                        <ClockFill className="me-2" />
                        {j.hari}
                      </span>
                      <span>
                        {j.idx.includes(hariIni) && (
                          <Badge bg="success" className="me-2">
                            Hari ini
                          </Badge>
                        )}
                        <strong>{j.jam}</strong>
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>

              <Tab eventKey="lokasi" title="Lokasi">
                <ListGroup variant="flush" className="mb-3">
                  <ListGroup.Item className="bg-transparent">
                    <GeoAltFill className="me-2" />
                    Jl. Kopi No. 1
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="bg-transparent"
                    action
                    href="tel:081234567890"
                  >
                    <TelephoneFill className="me-2" />
                    0812-3456-7890
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent">
                    <Instagram className="me-2" />
                    @kopinusantara
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="outline-dark"
                  href="https://instagram.com"
                  target="_blank"
                >
                  Kunjungi Instagram
                </Button>
              </Tab>

              <Tab eventKey="faq" title="FAQ">
                <Accordion defaultActiveKey="0" flush>
                  {faq.map(([tanya, jawab], i) => (
                    <Accordion.Item eventKey={`${i}`} key={tanya}>
                      <Accordion.Header>{tanya}</Accordion.Header>
                      <Accordion.Body>{jawab}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </section>
  );
}