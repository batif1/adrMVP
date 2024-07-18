import React, { useState, useRef } from 'react';
import { Account, NetworkType } from "@dhealth/sdk";
import SignatureCanvas from 'react-signature-canvas';
import './CreatePatientIdentity.css';
import rocheLogo from './roche.jpg';  // Ensure the image is saved in the same directory

const CreatePatientIdentity = () => {
  const [patientHistory, setPatientHistory] = useState('');
  const [conditions, setConditions] = useState('');
  const [otherDrugs, setOtherDrugs] = useState('');
  const [recentTravel, setRecentTravel] = useState('');
  const [allergies, setAllergies] = useState('');
  const [signature, setSignature] = useState('');
  const [patientIdentity, setPatientIdentity] = useState(null);
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(signatureData);
    createPatientIdentity();
  };

  const createPatientIdentity = () => {
    const patientAccount = Account.generateNewAccount(NetworkType.MAIN_NET);
    setPatientIdentity({
      address: patientAccount.address.plain(),
      privateKey: patientAccount.privateKey,
      publicKey: patientAccount.publicKey
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
        <title>Create Patient Identity</title>
      </div>
      <div className="container">
        <h1>Create Patient Identity</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient History</label>
            <textarea
              placeholder="Patient History"
              value={patientHistory}
              onChange={(e) => setPatientHistory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Conditions</label>
            <textarea
              placeholder="Conditions"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Other Drugs Taken</label>
            <textarea
              placeholder="Other Drugs Taken"
              value={otherDrugs}
              onChange={(e) => setOtherDrugs(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Recent Travel</label>
            <textarea
              placeholder="Recent Travel"
              value={recentTravel}
              onChange={(e) => setRecentTravel(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Allergies</label>
            <textarea
              placeholder="Allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
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
        {patientIdentity && (
          <div className="response">
            <h2>Patient Identity</h2>
            <div className="response-box">
              <p><strong>Address:</strong> {patientIdentity.address}</p>
              <p><strong>Private Key:</strong> {patientIdentity.privateKey}</p>
              <p><strong>Public Key:</strong> {patientIdentity.publicKey}</p>
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
      </div>
    </div>
  );
};

export default CreatePatientIdentity;
