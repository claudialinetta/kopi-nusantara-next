"use client";

import { FormEvent, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { EnvelopeFill, GeoAltFill, Whatsapp } from "react-bootstrap-icons";
import { kontak } from "../lib/helpers";

const BATAS = 999;
const formKosong = { nama: "", email: "", keperluan: "" };

export default function Kontak() {
  const [data, setData] = useState(formKosong);
  const [validated, setValidated] = useState(false);
  const [terkirim, setTerkirim] = useState(false);

  const isi = (k: keyof typeof formKosong, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return setValidated(true);
    setTerkirim(true);
    setData(formKosong);
    setValidated(false);
  };

  return (
    <section id="kontak" className="bagian-info py-5">
      <Container>
        <Badge
          bg="warning"
          text="dark"
          className="px-3 py-2 rounded-pill mb-3"
        >
          KONTAK
        </Badge>
        <h2 className="judul-seksi mb-4">Kontak &amp; Hubungi Kami</h2>

        <Row className="g-3 g-lg-4">
          <Col lg={7}>
            <div className="kartu-info">
              {terkirim && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setTerkirim(false)}
                >
                  Pesan Anda berhasil dikirim!
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={kirim}>
                <Form.Group className="mb-3" controlId="kontak-nama">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    required
                    minLength={3}
                    value={data.nama}
                    placeholder="Nama kamu"
                    onChange={(e) => isi("nama", e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Isi nama minimal 3 huruf.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="kontak-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={data.email}
                    placeholder="nama@email.com"
                    onChange={(e) => isi("email", e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Isi email yang valid.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-1" controlId="kontak-keperluan">
                  <Form.Label>Keperluan</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={5}
                    maxLength={BATAS}
                    value={data.keperluan}
                    placeholder="Tulis pertanyaan atau keperluanmu"
                    onChange={(e) => isi("keperluan", e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Keperluan tidak boleh kosong.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="hitung-karakter mb-3">
                  {data.keperluan.length}/{BATAS}
                </div>

                <Button type="submit" className="btn-tambah">
                  Kirim Pesan
                </Button>
              </Form>
            </div>
          </Col>

          <Col lg={5}>
            <div className="kartu-info">
              <h3>Hubungi Kami</h3>
              <p className="small text-secondary">
                Untuk pertanyaan, pemesanan, atau kerja sama.
              </p>
              <ul className="daftar-kontak list-unstyled mb-0">
                <li>
                  <Whatsapp />
                  <a href={kontak.waLink} target="_blank" rel="noreferrer">
                    {kontak.wa}
                  </a>
                </li>
                <li>
                  <EnvelopeFill />
                  <a href={`mailto:${kontak.email}`}>{kontak.email}</a>
                </li>
                <li>
                  <GeoAltFill />
                  <span>{kontak.alamat}</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}