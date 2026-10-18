# Kopi Nusantara

Website kedai kopi sederhana, dibuat dengan Next.js dan React Bootstrap.

## Cara Menjalankan

npm install
npm run dev

Buka http://localhost:3000

## Struktur

- `app/page.tsx` : halaman utama (navbar, promo, carousel, menu, checkout)
- `components/` : bagian-bagian halaman (tentang, faq, kontak, keranjang, stepper)

## Komponen React Bootstrap

| Bagian | Komponen |
|---|---|
| Navbar | Navbar, Nav, Badge, Image |
| Promo | Alert, CloseButton |
| Carousel | Carousel, Image |
| Menu | Card, Badge, OverlayTrigger, Tooltip, Row, Col |
| Stepper (+ − qty) | Button, ButtonGroup |
| Detail menu | Modal, Badge, ButtonGroup, Image |
| Keranjang | Offcanvas, Alert, ListGroup, Image |
| Checkout | Modal, Form, ToggleButton, ButtonGroup, ListGroup |
| Notifikasi | Toast, ToastContainer |
| Tentang Kami | Container, Row, Col, Image, Badge, Button |
| FAQ | Accordion |
| Kontak | Container, Row, Col, Badge, Alert, Form, Button, Image |

Ikon memakai `react-bootstrap-icons`.