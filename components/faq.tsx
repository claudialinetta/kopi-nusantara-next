"use client";

import { Accordion, Col, Container, Row } from "react-bootstrap";

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
  [
    "Bagaimana kalau mau bekerja sama?",
    "Silakan hubungi kami lewat form di bagian kontak.",
  ],
];

export default function Faq() {
  return (
    <section id="faq" className="faq py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="judul-seksi text-center mb-4">Pertanyaan Umum</h2>
            <Accordion defaultActiveKey="0">
              {faq.map(([tanya, jawab], i) => (
                <Accordion.Item eventKey={`${i}`} key={tanya}>
                  <Accordion.Header>{tanya}</Accordion.Header>
                  <Accordion.Body>{jawab}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}