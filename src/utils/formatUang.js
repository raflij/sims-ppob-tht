export default function formatUang(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }