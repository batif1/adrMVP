import React, { useState, useRef } from 'react';
import { Account, NetworkType } from "@dhealth/sdk";
import SignatureCanvas from 'react-signature-canvas';
import './VerifyAccount.css';
import rocheLogo from './roche.jpg';  // Ensure the image is saved in the same directory

const VerifyAccount = () => {
  const [clinicAddress, setClinicAddress] = useState('');
  const [medicalNumber, setMedicalNumber] = useState('');
  const [country, setCountry] = useState('');
  const [signature, setSignature] = useState('');
  const [verifierIdentity, setVerifierIdentity] = useState(null);
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(signatureData);
    createVerifierIdentity();
  };

  const createVerifierIdentity = () => {
    const verifierAccount = Account.generateNewAccount(NetworkType.MAIN_NET);
    setVerifierIdentity({
      address: verifierAccount.address.plain(),
      privateKey: verifierAccount.privateKey,
      publicKey: verifierAccount.publicKey
    });
    setLoading(false);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={rocheLogo} alt="Roche Logo" />
        </div>
        <nav className="nav">
          <a href="/create-identity-doctor">Create Medical Professional Identity</a>
          <a href="/create-identity-patient">Create Patient Identity</a>
          <a href="#">Help</a>
          <a href="#">About Roche</a>
        </nav>
      </header>

      <div>
        <title>Medical Professional Verification Form</title>
      </div>
      <div className="container">
        <h1>Medical Professional Verification Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Clinic Address</label>
            <input
              type="text"
              placeholder="Clinic Address"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>CPSO Number/Registered Medical Professional Number</label>
            <input
              type="text"
              placeholder="CPSO Number"
              value={medicalNumber}
              onChange={(e) => setMedicalNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Signature</label>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            />
          </div>
          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {verifierIdentity && (
          <div className="response">
            <h2>Verifier Identity</h2>
            <div className="response-box">
              <p><strong>Address:</strong> {verifierIdentity.address}</p>
              <p><strong>Private Key:</strong> {verifierIdentity.privateKey}</p>
              <p><strong>Public Key:</strong> {verifierIdentity.publicKey}</p>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div>
          <a href="#">Privacy policy</a>
        </div>
        <br />
        <a href="#">Legal statement</a>
        <br /><br />
        <div>
          <a href="#">Cookies</a>
        </div>
        <br />
        <p>This website contains information on products which is targeted to a wide range of audiences and could contain product details or information otherwise not accessible or valid in your country. Please be aware that we do not take any responsibility for accessing such information which may not comply with any legal process, regulation, registration or usage in the country of your origin.</p>
        <br />
      </footer>
      <div className="bashSign">
        <p>V1 Developed in Zurich Switzerland 🇨🇭 by Bashshar Atif built on the Dhealth SDK</p>
        <p>&copy; 2024 B. Atif 7/18/2024</p>
        <br></br>
        <br></br>
        <br></br>

      </div>
    </div>
  );
};

export default VerifyAccount;
