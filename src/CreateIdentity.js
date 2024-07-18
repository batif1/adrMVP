import React, { useState } from 'react';
import { Account, NetworkType } from "@dhealth/sdk";

const CreateIdentity = () => {
  const [patientIdentity, setPatientIdentity] = useState(null);
  const [verifierIdentity, setVerifierIdentity] = useState(null);

  const createPatientIdentity = () => {
    const patientAccount = Account.generateNewAccount(NetworkType.MAIN_NET);
    setPatientIdentity({
      address: patientAccount.address.plain(),
      privateKey: patientAccount.privateKey
    });
  };

  const createVerifierIdentity = () => {
    const verifierAccount = Account.generateNewAccount(NetworkType.MAIN_NET);
    setVerifierIdentity({
      address: verifierAccount.address.plain(),
      privateKey: verifierAccount.privateKey
    });
  };

  return (
    <div>
      <h1>Create Identity</h1>
      <button onClick={createPatientIdentity}>Create Patient Identity</button>
      {patientIdentity && (
        <div>
          <h2>Patient Identity</h2>
          <pre>{JSON.stringify(patientIdentity, null, 2)}</pre>
        </div>
      )}
      <button onClick={createVerifierIdentity}>Create Verifier Identity</button>
      {verifierIdentity && (
        <div>
          <h2>Verifier Identity</h2>
          <pre>{JSON.stringify(verifierIdentity, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateIdentity;
