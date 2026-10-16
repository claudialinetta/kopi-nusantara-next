"use client";

import { Badge, Button, Col, Container, Image, Row } from "react-bootstrap";
import { BagCheckFill, ClockFill, GeoAltFill } from "react-bootstrap-icons";
import { kontak } from "../lib/helpers";

const jamBuka = [
  { hari: "Senin - Jumat", jam: "08.00 - 22.00", idx: [1, 2, 3, 4, 5] },
  { hari: "Sabtu - Minggu", jam: "09.00 - 23.00", idx: [0, 6] },
];

const linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kontak.alamat)}`;

export default function TentangKami({ hariIni }: { hariIni: number }) {
  return (
    <>
      <section id="tentang" className="py-5">
        <Container>
          <Row className="g-4 g-lg-5 align-items-center">
            <Col lg={5}>
              <Image
                src="/hero-2.jpg"
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
              <h2 className="judul-seksi mb-3">Cerita Kopi Nusantara</h2>
              <p>
                Kopi Nusantara berdiri dari kecintaan pada kopi single origin
                Indonesia. Kami bekerja sama langsung dengan petani di Aceh,
                Toraja, dan Bali, lalu menyangrai bijinya segar setiap minggu.
              </p>
              <p>
                Kami juga memilih kerja sama yang adil, supaya petani lokal ikut
                merasakan hasilnya.
              </p>
              <p className="mb-0">
                Belum biasa minum kopi hitam? Coba kopi susu gula aren dulu.
                Menu non-kopi dan camilan juga ada.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* info kunjungan */}
      <section id="info" className="info-kunjungan py-5">
        <Container>
          <h2 className="judul-seksi text-center mb-1">Info Kunjungan</h2>
          <p className="info-sub text-center mb-4">
            Jam buka, alamat, dan cara pesan.
          </p>
          <Row className="g-3 g-lg-4">
            <Col md={4}>
              <div className="kartu-info">
                <div className="ikon-bulat">
                  <ClockFill />
                </div>
                <h3>Jam Buka</h3>
                {jamBuka.map((j) => {
                  const aktif = j.idx.includes(hariIni);
                  return (
                    <div
                      key={j.hari}
                      className={`baris-jam ${aktif ? "aktif" : ""}`}
                    >
                      <span>{j.hari}</span>
                      <span>
                        {aktif && (
                          <Badge bg="success" className="me-2">
                            Hari ini
                          </Badge>
                        )}
                        <strong>{j.jam}</strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </Col>

            <Col md={4}>
              <div className="kartu-info">
                <div className="ikon-bulat">
                  <GeoAltFill />
                </div>
                <h3>Lokasi</h3>
                <p className="text-secondary">{kontak.alamat}</p>
                <Button
                  variant="outline-dark"
                  size="sm"
                  href={linkMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka di Maps
                </Button>
              </div>
            </Col>

            <Col md={4}>
              <div className="kartu-info">
                <div className="ikon-bulat">
                  <BagCheckFill />
                </div>
                <h3>Cara Pesan</h3>
                <p className="text-secondary">
                  Dine in atau take away langsung di kafe, bisa juga diantar
                  lewat ojek online. Bayar pakai QRIS, tunai, atau transfer.
                </p>
                <Button variant="outline-dark" size="sm" href="#menu">
                  Lihat Menu
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}