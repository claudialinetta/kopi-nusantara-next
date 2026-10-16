export type Menu = {
  id: number;
  nama: string;
  kategori: "Kopi" | "Non-Kopi" | "Makanan";
  harga: number;
  gambar: string;
  deskripsi: string;
  label?: string;
};

export type Item = { menu: Menu; qty: number };

export const rupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export const kontak = {
  wa: "0812-3456-7890",
  waLink: "https://wa.me/6281234567890",
  email: "kopi_nusantara@gmail.com",
  alamat: "Jl. Letjen S. Parman, Jakarta Barat",
};