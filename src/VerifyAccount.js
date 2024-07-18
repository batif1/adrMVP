import React, { useState } from 'react';

const VerifyAccount = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientAddress, setPatientAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [verifierPrivateKey, setVerifierPrivateKey] = useState('');
  const [recipientRawAddress, setRecipientRawAddress] = useState('');

  const verify = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientAddress,
          symptoms,
          verifierAccountPrivateKey: verifierPrivateKey,
          recipientRawAddress
        })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error verifying account:', error);
      setResponse('Error verifying account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Verify Account</h1>
      <input
        type="text"
        placeholder="Patient Address"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <input
        type="text"
        placeholder="Verifier Private Key"
        value={verifierPrivateKey}
        onChange={(e) => setVerifierPrivateKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient Raw Address"
        value={recipientRawAddress}
        onChange={(e) => setRecipientRawAddress(e.target.value)}
      />
      <button onClick={verify} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify Account'}
      </button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default VerifyAccount;
