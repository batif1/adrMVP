import React, { useState } from 'react';
import './VerifyAccount.css';
import rocheLogo from './roche.jpg';  // Ensure the image is saved in the same directory

const VerifyAccount = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientAddress, setPatientAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [verifierPrivateKey, setVerifierPrivateKey] = useState('');
  const [recipientRawAddress, setRecipientRawAddress] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const questions = [
    "Do you have a fever?",
    "Do you have a cough?",
    "Do you feel tired?",
    "Do you have difficulty breathing?",
    "Do you have a sore throat?",
    "Have you experienced a loss of taste or smell?",
    "Do you have muscle or joint pain?",
    "Have you had headaches?",
    "Have you experienced chills or shivering?",
    "Do you have nausea or vomiting?",
    "Do you have diarrhea?",
    "Have you experienced nasal congestion?",
    "Do you have a runny nose?",
    "Have you had any eye symptoms?",
    "Have you experienced skin rashes?",
    "Do you have any known allergies?",
    "Have you had close contact with a confirmed COVID-19 case?",
    "Have you traveled internationally in the last 14 days?",
    "Have you been in quarantine or isolation in the last 14 days?",
    "On a scale of 1 to 10, how would you rate your overall health?",
    "On a scale of 1 to 10, how would you rate your energy levels?",
    "Have you experienced any changes in your symptoms after taking the drug?",
    "How satisfied are you with the drug's effectiveness?",
    "Have you noticed any side effects since starting the drug?",
    "Would you recommend this drug to others?"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setSymptoms(newAnswers.join('; '));
  };

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

  const questionsPerSlide = 4;
  const totalSlides = Math.ceil(questions.length / questionsPerSlide);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={rocheLogo} alt="Roche Logo" />
        </div>
        <nav className="nav">
        <a href="/create-identity-doctor">Create Medical Proffesional Identity</a>
          <a href="/create-identity-patient">Create Patient Identity</a>
          <a href="#">Help</a>
          <a href="#">About</a>

        </nav>
      </header>

      <div>
        <title>Adverse Side Effect Reporting Form</title>
      </div>
      <div className="container">
        <h1>Adverse Side Effect and Drug Feedback Form</h1>
     <br></br>
        <h2>Verify Identiy</h2>
        <div className="form-group">
          <label>Patient Address</label>
          <input
            type="text"
            placeholder="Patient Address"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Medical Proffesional Private Key</label>
          <input
            type="text"
            placeholder="Verifier Private Key"
            value={verifierPrivateKey}
            onChange={(e) => setVerifierPrivateKey(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Recipient Address</label>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipientRawAddress}
            onChange={(e) => setRecipientRawAddress(e.target.value)}
          />
        </div>
        <div className="questions-container">
          <div className="questions">
            <h2>Symptoms</h2>
            {questions.slice(currentSlide * questionsPerSlide, (currentSlide + 1) * questionsPerSlide).map((question, index) => (
              <div key={index} className="form-group">
                <label>{question}</label>
                <input
                  type="text"
                  placeholder="Your answer"
                  value={answers[currentSlide * questionsPerSlide + index]}
                  onChange={(e) => handleAnswerChange(currentSlide * questionsPerSlide + index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="navigation-buttons">
            {currentSlide > 0 && <button onClick={handlePrev}>Previous</button>}
            {currentSlide < totalSlides - 1 && <button onClick={handleNext}>Next</button>}
            {currentSlide === totalSlides - 1 && <button onClick={verify} disabled={loading}>{loading ? 'Verifying...' : 'Submit'}</button>}
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(currentSlide + 1) / totalSlides * 100}%` }}></div>
          </div>
        </div>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}

      </div>

      <footer className='footer'>
        <div>
          <a href="#">Privacy policy</a>
        </div>
        <br></br>

        <a href="#">Legal statement</a>
        <br></br>
        <br></br>

        <div>
          <a href="#">Cookies</a>
        </div>
        <br></br>

   

        <p>This website contains information on products which is targeted to a wide range of audiences and could contain product details or information otherwise not accessible or valid in your country. Please be aware that we do not take any responsibility for accessing such information which may not comply with any legal process, regulation, registration or usage in the country of your origin.</p>
        <br></br>

      
      </footer>
      <div className='bashSign'>
      <p>V1 Developed in Zurich Switzerland 🇨🇭 by Bashshar Atif built on the Dhealth SDK</p>
        <p>&copy; 2024 B. Atif 7/18/2024</p>
      </div>
    </div>
  );
};

export default VerifyAccount;
