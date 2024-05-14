// import * as React from "react";
// import "../Pages/Verification.css";
// import CTAButton from "../Components/CTAButton";

// function VerificationCodeInput({ digit }) {
//   const [code, setCode] = React.useState("");

//   function handleVerify(e) {
//     e.preventDefault();
//   }

//   return (
//     <input
//       type="text"
//       maxLength="1"
//       className="verification-code-input"
//       value={code}
//       onChange={(e) => setCode(e.target.value)}
//       onSubmit={handleVerify}
//     />
//   );
// }

// export default function VerificationPage() {
//   return (
//     <>
//       <header className="Ver-header">
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0a312d70048a81c3e0b97420bdbb31a4d89d2fb5982aec87ed80114733eedd2?apiKey=66cde03c14284deb81366fe06ee3971c&"
//           alt="Media Hub Logo"
//           className="logo"
//         />
//         <h1 className="title">Media Hub</h1>
//       </header>
//       <main className="container">
//         <h2 className="subtitle">Enter Verification Code</h2>
//         <p className="description">
//           Check your email for the verification code, we sent you a 4 digits
//           code to your email.
//         </p>
//         <div className="verification-code-inputs">
//           {[...Array(4)].map((_, index) => (
//             <VerificationCodeInput key={index} digit={index + 1} />
//           ))}
//         </div>
//         <p className="timer">00:30</p>
//         <div className="resend-code">
//           <span className="resend-code-text">Did not get Code?</span>
//           <button className="resend-code-button">Resend Code</button>
//         </div>
//         <CTAButton text="Submit" />
//       </main>
//     </>
//   );
// }

// import * as React from "react";
// import "../Pages/Verification.css";
// import CTAButton from "../Components/CTAButton";

// function VerificationCodeInput({ digit, setCode }) {
//   return (
//     <input
//       type="text"
//       maxLength="1"
//       className="verification-code-input"
//       value={digit}
//       onChange={(e) => setCode(Number(e.target.value))}
//     />
//   );
// }

// export default function VerificationPage() {
//   const [verificationCode, setVerificationCode] = React.useState("");
//   const [verificationStatus, setVerificationStatus] = React.useState(null);

//   async function handleVerify(e) {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://data-be-13-4.onrender.com/api/v1/auth/verifyCode",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ code: verificationCode }),
//         }
//       );
//       const data = await response.json();
//       // Assuming the API returns some data indicating verification status
//       setVerificationStatus(data.status);
//     } catch (error) {
//       console.error("Error verifying code:", error);
//     }
//   }

//   return (
//     <>
//       <header className="Ver-header">
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0a312d70048a81c3e0b97420bdbb31a4d89d2fb5982aec87ed80114733eedd2?apiKey=66cde03c14284deb81366fe06ee3971c&"
//           alt="Media Hub Logo"
//           className="logo"
//         />
//         <h1 className="title">Media Hub</h1>
//       </header>
//       <main className="container">
//         <h2 className="subtitle">Enter Verification Code</h2>
//         <p className="description">
//           Check your email for the verification code, we sent you a 4 digits
//           code to your email.
//         </p>
//         <div className="verification-code-inputs">
//           {[...Array(4)].map((_, index) => (
//             <VerificationCodeInput
//               key={index}
//               digit={verificationCode[index] || ""}
//               setCode={(newDigit) => {
//                 const newCode =
//                   verificationCode.slice(0, index) +
//                   newDigit +
//                   verificationCode.slice(index + 1);
//                 setVerificationCode(newCode);
//               }}
//             />
//           ))}
//         </div>
//         <p className="timer">00:30</p>
//         <div className="resend-code">
//           <span className="resend-code-text">Did not get Code?</span>
//           <button className="resend-code-button">Resend Code</button>
//         </div>
//         <CTAButton text="Submit" onClick={handleVerify} />
//         {verificationStatus && <p>{verificationStatus}</p>}
//       </main>
//     </>
//   );
// }

import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/Verification.css";
import CTAButton from "../Components/CTAButton";

function VerificationCodeInput({ value, onChange, index }) {
  return (
    <input
      type="text"
      maxLength="1"
      className="verification-code-input"
      value={value}
      onChange={(e) => onChange(e.target.value, index)}
    />
  );
}

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = React.useState([
    "",
    "",
    "",
    "",
  ]);
  const [verificationStatus, setVerificationStatus] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  async function handleVerify(e) {
    e.preventDefault();
    const code = verificationCode.join(""); // Combine the digits into a single string

    // Ensure the code is exactly 4 characters long
    if (code.length !== 4) {
      setVerificationStatus("Please enter the 4-digit verification code.");
      return;
    }

    console.log("Verification code being sent:", code);

    try {
      const response = await fetch(
        "https://data-be-13-4.onrender.com/api/v1/auth/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verificationCode: code }), // Send the code in the expected format
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        setVerificationStatus(
          errorData.message || "Verification failed. Please try again."
        );
        return;
      }

      const data = await response.json();
      if (data.status === "success") {
        navigate("/Login");
      } else {
        setVerificationStatus(
          data.message || "Verification failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setVerificationStatus("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <header className="Ver-header">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0a312d70048a81c3e0b97420bdbb31a4d89d2fb5982aec87ed80114733eedd2?apiKey=66cde03c14284deb81366fe06ee3971c&"
          alt="Media Hub Logo"
          className="logo"
        />
        <h1 className="title">Media Hub</h1>
      </header>
      <main className="container">
        <h2 className="subtitle">Enter Verification Code</h2>
        <p className="description">
          Check your email for the verification code, we sent you a 4-digit code
          to your email.
        </p>
        <form onSubmit={handleVerify}>
          <div className="verification-code-inputs">
            {verificationCode.map((digit, index) => (
              <VerificationCodeInput
                key={index}
                value={digit}
                index={index}
                onChange={handleChange}
              />
            ))}
          </div>
          <p className="timer">00:30</p>
          <div className="resend-code">
            <span className="resend-code-text">Did not get Code?</span>
            <button type="button" className="resend-code-button">
              Resend Code
            </button>
          </div>
          <CTAButton text="Submit" />
        </form>
        {verificationStatus && <p className="error">{verificationStatus}</p>}
      </main>
    </>
  );
}
