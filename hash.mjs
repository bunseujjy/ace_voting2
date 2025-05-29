// hash.js
import bcrypt from "bcryptjs";

const plainPassword = "adminpass"; // Replace with your actual admin password

bcrypt.hash(plainPassword, 10).then((hash) => {
  console.log("Hashed Password:", hash);
});
