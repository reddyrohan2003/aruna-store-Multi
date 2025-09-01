// js/firebase-init.js
// NOTE: save this file and add a script tag in shop.html: <script type="module" src="js/firebase-init.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ====== PASTE YOUR FIREBASE CONFIG BELOW ======
   Get this from Firebase Console -> Project settings -> Your apps (Web)
*/
const firebaseConfig = {
  apiKey: "AIzaSyCZpP-_TlI1dQhIWh00B4hRsZMrTPa9Qdc",
  authDomain: "nighties-shop.firebaseapp.com",
  projectId: "nighties-shop",
  storageBucket: "nighties-shop.firebasestorage.app",
  messagingSenderId: "856463502629",
  appId: "1:856463502629:web:691b953ed6aacde41c7ecc"
};
/* ============================================== */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * fetchProductsFromFirestore()
 * Returns an array of product objects:
 * { id, name, price, img, sizes:[], inStock:bool }
 */
window.fetchProductsFromFirestore = async function () {
  try {
    const snap = await getDocs(collection(db, "products"));
    const products = [];
    snap.forEach(d => {
      const p = d.data();
      products.push({
        id: d.id,
        name: p.name || "",
        price: Number(p.price) || 0,
        img: p.img || p.imageUrl || "",
        sizes: Array.isArray(p.sizes) ? p.sizes : (p.sizes ? String(p.sizes).split(",").map(s=>s.trim()) : []),
        inStock: (typeof p.inStock === "boolean") ? p.inStock : true
      });
    });
    return products;
  } catch (err) {
    console.error("fetchProductsFromFirestore error:", err);
    throw err;
  }
};
