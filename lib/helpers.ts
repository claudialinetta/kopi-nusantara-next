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