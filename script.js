// Fungsi format rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(angka);
}

// Fungsi hitung selisih hari jadi teks
function formatWaktuTempuh(totalHari) {
    let tahun = Math.floor(totalHari / 365);
    let sisaHariSetelahTahun = totalHari % 365;
    let bulan = Math.floor(sisaHariSetelahTahun / 30);
    let hari = Math.floor(sisaHariSetelahTahun % 30);

    let hasil = [];
    if (tahun > 0) hasil.push(`${tahun} tahun`);
    if (bulan > 0) hasil.push(`${bulan} bulan`);
    if (hari > 0) hasil.push(`${hari} hari`);

    return hasil.join(", ");
}

// Array motivasi
const motivasiList = [
    "Semangat! Setiap rupiah yang kamu tabung membawa kamu lebih dekat ke wishlist ini 💪✨",
    "Ayo terus konsisten, hasilnya akan terasa di akhir 💖",
    "Kamu sudah selangkah lebih dekat, jangan berhenti menabung 🌟",
    "Ingat tujuanmu, dan nabunglah dengan senyuman 😊",
    "Sedikit demi sedikit, lama-lama menjadi bukit 🏔️"
];

function lanjutKeStep2() {
    let judul = document.getElementById("judul").value;
    if (judul.trim() === "") {
        alert("Masukkan judul wishlist!");
        return;
    }
    document.getElementById("judulDisplay").innerText = "Wishlist: " + judul;
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
}

function hitungTabungan() {
    let harga = parseFloat(document.getElementById("harga").value);
    let tanggalMulai = new Date(document.getElementById("tanggalMulai").value);
    let tanggalTarget = new Date(document.getElementById("tanggalTarget").value);

    if (isNaN(harga) || harga <= 0) {
        alert("Masukkan harga wishlist yang valid!");
        return;
    }
    if (tanggalTarget <= tanggalMulai) {
        alert("Tanggal target harus lebih besar dari tanggal mulai!");
        return;
    }

    // Hitung jumlah hari
    let diffTime = tanggalTarget - tanggalMulai;
    let totalHari = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Hitung tabungan
    let perHari = harga / totalHari;
    let perMinggu = harga / (totalHari / 7);
    let perBulan = harga / (totalHari / 30);
    let perTahun = harga / (totalHari / 365);

    // Pilih motivasi random
    let motivasi = motivasiList[Math.floor(Math.random() * motivasiList.length)];

    // Tampilkan hasil
    document.getElementById("judulWishlist").innerText = "🎯 Wishlist: " + document.getElementById("judul").value;
    document.getElementById("totalKumpul").innerText = "💰 Total yang harus terkumpul: " + formatRupiah(harga);
    document.getElementById("waktuTempuh").innerText = "⏳ Waktu tempuh: " + formatWaktuTempuh(totalHari);

    document.getElementById("arahan").innerText = "Untuk bisa mencapai wishlist ini, kamu harus menabung sebagai berikut:";
    document.getElementById("perHari").innerText = "📅 Per Hari: " + formatRupiah(perHari);
    document.getElementById("perMinggu").innerText = "🗓️ Per Minggu: " + formatRupiah(perMinggu);
    document.getElementById("perBulan").innerText = "📆 Per Bulan: " + formatRupiah(perBulan);
    document.getElementById("perTahun").innerText = "📆 Per Tahun: " + formatRupiah(perTahun);

    document.getElementById("motivasi").innerText = motivasi;

    document.getElementById("step2").style.display = "none";
    document.getElementById("hasil").style.display = "block";
}