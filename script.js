/* =========================
   KODEPUS - JAVASCRIPT
   JavaScript murni tanpa library
   ========================= */

"use strict";

// Ambil elemen yang dipakai pada beberapa fungsi.
const menuToggle = document.getElementById("menu-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

/* 1. HEADER & NAVIGASI RESPONSIF
   aria-expanded memberi tahu status menu kepada teknologi bantu.
   Escape menutup menu dan mengembalikan fokus ke tombol hamburger.
*/
function setMenuState(isOpen) {
    primaryNavigation.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
    );
}

menuToggle.addEventListener("click", () => {
    const isCurrentlyOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

    setMenuState(!isCurrentlyOpen);
});

primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" &&
        menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        menuToggle.focus();
    }
});

/* 2. KARTU PROPERTI & FITUR SIMPAN KOS
   data-id mengidentifikasi properti. Status favorit diperbarui langsung
   pada tombol tanpa perlu memuat ulang halaman.
*/
const saveButtons = document.querySelectorAll(".save-button");

saveButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const propertyId = button.dataset.id;
        const isSaved = button.getAttribute("aria-pressed") === "true";
        const nextState = !isSaved;

        button.setAttribute("aria-pressed", String(nextState));
        button.textContent = nextState ? "♥ Tersimpan" : "♡ Simpan Kos";

        // Label aksesibel mengikuti status dan identitas properti.
        const card = button.closest(".property-card");
        const propertyName = card.querySelector("h3").textContent;
        button.setAttribute(
            "aria-label",
            `${nextState ? "Hapus dari simpanan" : "Simpan"} ${propertyName}`
        );

        // Simpan ID favorit di memori halaman untuk contoh interaksi frontend.
        button.dataset.saved = nextState ? "true" : "false";
        console.info(`Properti ${propertyId}: ${nextState ? "disimpan" : "dihapus"}`);
    });
});

/* 3. FORM FILTER & PENCARIAN
   Validasi menggunakan aria-invalid dan aria-describedby.
   Fokus otomatis dipindahkan ke input pertama yang memiliki galat.
*/
const searchForm = document.getElementById("search-form");
const locationInput = document.getElementById("location");
const residentTypeInput = document.getElementById("resident-type");
const maxPriceInput = document.getElementById("max-price");
const formFeedback = document.getElementById("form-feedback");

const propertyCards = Array.from(
    document.querySelectorAll(".property-card")
);
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");

const validationFields = [
    {
        input: locationInput,
        error: document.getElementById("location-error")
    },
    {
        input: residentTypeInput,
        error: document.getElementById("resident-type-error")
    },
    {
        input: maxPriceInput,
        error: document.getElementById("max-price-error")
    }
];

function showFieldError(input, errorElement, message) {
    errorElement.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function clearValidation() {
    validationFields.forEach(({ input, error }) => {
        showFieldError(input, error, "");
    });
    formFeedback.textContent = "";
}

function validateSearchForm() {
    clearValidation();

    const location = locationInput.value.trim();
    let firstInvalidField = null;

    // Lokasi wajib diisi agar contoh validasi dapat diuji dengan jelas.
    if (location.length < 2) {
        showFieldError(
            locationInput,
            document.getElementById("location-error"),
            "Masukkan lokasi minimal 2 karakter."
        );
        firstInvalidField = locationInput;
    }

    // Pilihan jenis penghuni dan harga bersifat opsional.
    if (location.length > 80) {
        showFieldError(
            locationInput,
            document.getElementById("location-error"),
            "Lokasi maksimal 80 karakter."
        );
        firstInvalidField = locationInput;
    }

    if (firstInvalidField) {
        firstInvalidField.focus();
        formFeedback.textContent = "Periksa kembali kolom yang ditandai.";
        return false;
    }

    return true;
}

function applyPropertyFilters() {
    const location = locationInput.value.trim().toLowerCase();
    const residentType = residentTypeInput.value;
    const maxPrice = maxPriceInput.value
        ? Number(maxPriceInput.value)
        : Infinity;

    const selectedFacilities = Array.from(
        searchForm.querySelectorAll('input[name="facility"]:checked')
    ).map((checkbox) => checkbox.value);

    let visibleCount = 0;

    propertyCards.forEach((card) => {
        const cardLocation = card.dataset.location.toLowerCase();
        const cardType = card.dataset.type;
        const cardPrice = Number(card.dataset.price);
        const cardFacilities = card.dataset.facilities.split(" ");

        const matchesLocation =
            !location || cardLocation.includes(location);
        const matchesType =
            !residentType || cardType === residentType;
        const matchesPrice = cardPrice <= maxPrice;
        const matchesFacilities = selectedFacilities.every((facility) =>
            cardFacilities.includes(facility)
        );

        const isMatch =
            matchesLocation &&
            matchesType &&
            matchesPrice &&
            matchesFacilities;

        card.hidden = !isMatch;

        if (isMatch) {
            visibleCount += 1;
        }
    });

    resultCount.textContent = `${visibleCount} properti ditemukan`;
    emptyState.hidden = visibleCount !== 0;

    formFeedback.textContent = `Pencarian selesai. ${visibleCount} properti ditemukan.`;
}

searchForm.addEventListener("submit", (event) => {
    // Mencegah browser melakukan submit/reload halaman secara default.
    event.preventDefault();

    if (!validateSearchForm()) {
        return;
    }

    applyPropertyFilters();
});

searchForm.addEventListener("reset", () => {
    // Reset event berjalan sebelum nilai form sepenuhnya dikembalikan.
    window.setTimeout(() => {
        clearValidation();
        propertyCards.forEach((card) => {
            card.hidden = false;
        });
        resultCount.textContent = `${propertyCards.length} properti ditemukan`;
        emptyState.hidden = true;
    }, 0);
});

// Hapus status galat saat pengguna mulai memperbaiki kolom lokasi.
locationInput.addEventListener("input", () => {
    showFieldError(
        locationInput,
        document.getElementById("location-error"),
        ""
    );
});

/* 4. CTA HUBUNGI PEMILIK DENGAN STATUS MEMUAT
   Simulasi proses asinkron: tombol dinonaktifkan, status diumumkan,
   lalu tombol aktif kembali setelah jeda. Tidak ada klaim bahwa WhatsApp
   benar-benar terbuka karena proses ini hanya simulasi frontend.
*/
const contactButton = document.getElementById("contact-owner");
const contactStatus = document.getElementById("contact-status");
const contactTriggers = document.querySelectorAll(".contact-trigger");

function simulateContact(button, statusElement) {
    if (button.disabled) return;

    const originalText = button.textContent;

    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.textContent = "Menghubungkan…";
    statusElement.textContent = "Sedang menyiapkan informasi kontak pemilik.";

    window.setTimeout(() => {
        button.disabled = false;
        button.removeAttribute("aria-busy");
        button.textContent = originalText;
        statusElement.textContent =
            "Simulasi berhasil. Silakan hubungi pemilik melalui kontak yang tersedia.";
    }, 1600);
}

contactButton.addEventListener("click", () => {
    simulateContact(contactButton, contactStatus);
});

// Tombol pada tiap kartu mengarahkan pengguna ke area CTA utama,
// kemudian menjalankan simulasi status memuat yang sama.
contactTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const propertyId = trigger.dataset.property;
        const card = trigger.closest(".property-card");
        const propertyName = card.querySelector("h3").textContent;

        contactStatus.textContent = `Properti dipilih: ${propertyName}.`;
        document.getElementById("kontak").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        contactButton.dataset.selectedProperty = propertyId;
        window.setTimeout(() => {
            simulateContact(contactButton, contactStatus);
        }, 250);
    });
});
