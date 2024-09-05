import React, { useState } from 'react';
import AppDialogue from './AppDialogue';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const ParentComponent = () => {
  const [step, setStep] = useState(1); // State to track the step
  const [isOpen, setIsOpen] = useState(false); // State to open/close the dialogue

  const handleContinue = () => {
    if (step < 3) setStep(step + 1); // Increment step for next content
  };

  const handleCancel = () => {
    setIsOpen(false); // Close dialogue
  };

  const getContent = () => {
    switch (step) {
      case 1:
        return <Home />;
      case 2:
        return <About />;
      case 3:
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Verify</button>

      {isOpen && (
        <AppDialogue>
          {getContent()}
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </AppDialogue>
      )}
    </div>
  );
};

export default ParentComponent;









// 


import React, { useState } from 'react';
import AppDialogue from './AppDialogue';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const ParentComponent = () => {
  const [step, setStep] = useState(1); // State to track the step
  const [isOpen, setIsOpen] = useState(false); // State to open/close the dialogue

  const handleContinue = () => {
    if (step < 3) setStep(step + 1); // Increment step for next content
  };

  const handleCancel = () => {
    setIsOpen(false); // Close dialogue
  };

  const getContent = () => {
    switch (step) {
      case 1:
        return <Home />;
      case 2:
        return <About />;
      case 3:
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Verify</button>

      {isOpen && (
        <AppDialogue>
          {getContent()}
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </AppDialogue>
      )}
    </div>
  );
};

export default ParentComponent;
