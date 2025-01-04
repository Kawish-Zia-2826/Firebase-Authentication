import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  sendEmailVerification, // Import this function
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDY6rUqD1a29FFhAF6-YKvDSR5QTamof7Y",
  authDomain: "st-project-in-firebase-b719d.firebaseapp.com",
  projectId: "st-project-in-firebase-b719d",
  storageBucket: "st-project-in-firebase-b719d.appspot.com", // Fixed the storageBucket URL
  messagingSenderId: "527639407874",
  appId: "1:527639407874:web:9a43fa8c389b6e0379261b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// // Test Firebase Auths
// function testAuth() {
//   console.log("Firebase auth initialized:", auth);
// }
// testAuth();

// function signup() {
//   // Sign-Up Method
//   createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//     .then((res) => {
//       const user = res.user;
//       console.log(res);
//       // console.log("User created successfully:", user);
//       // console.log("User UID:", user.uid);

//       // Send Email Verification
//       //   sendEmailVerification(user)
//       //     .then(() => {
//       //       console.log("Verification email sent.");
//       //       console.log(user.emailVerified);
//       //       if (user.emailVerified) {
//       //         alert("email verified successfully");
//       //       }
//       //     })
//       //     .catch((error) => {
//       //       console.error("Error sending verification email:", error.message);
//       //     });
//     })
//     .catch((error) => {
//       console.error("Error creating user:", error.message);
//       console.error("Error code:", error.code);
//     });
// }

// Swal.fire("Hello World!");

$(document).ready(function () {
  $("#signupBtn").click(function (e) {
    e.preventDefault();
    let signupName = $("#signupName").val();
    let signupEmail = $("#signupEmail").val();
    let signupPassword = $("#signupPassword").val();
    // Sign-Up Method
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((res) => {
        const user = res.user;
        console.log("User created successfully:", user);
        console.log("User UID:", user.uid);
        console.log(res);

        Swal.fire("please check your email for verification");
        // Send Email Verification
        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent.");
            console.log(user.emailVerified);
            if (user.emailVerified) {
              Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success",
              });
              alert("email verified successfully");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          })
          .catch((error) => {
            console.error("Error sending verification email:", error.message);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        console.error("Error code:", error.code);
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "please login ",
            title: "Oops...",
            text: "Email already in use!",
          });
        }
      });
  });
});

//login
$(document).ready(function () {
  $("#login").click(function (e) {
    e.preventDefault();

    let loginEmail = $("#loginEmail").val();
    let loginPassword = $("#loginPassword").val();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user.uid);
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        console.error("Error code:", error.code);
      });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User hai yha:", user.uid);
        Swal.fire({
          title: "Hurray Welcome",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });

        // ...
      } else {
        console.log("user nahi hai");
        Swal.fire({
          title: "kya ap apna password bhool gye hain?",
          text: "agr ha tw forget password pr click kren",
          icon: "ya frr sign in kren",
        });
      }
    });
  });
});

// foget password

$("#forget").click(function (e) {
  e.preventDefault();
  let forgetEmail = $("#forgetEmail").val();
  sendPasswordResetEmail(auth, forgetEmail)
    .then(() => {
      Swal.fire("check your email for password reset");
    })
    .catch((error) => {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
});
