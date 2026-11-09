import React from 'react';

const ITEMS = [
  {
    id: 'what',
    title: 'What is TextUtils?',
    body: 'TextUtils is a small utility for quickly changing the case of a piece of text. Paste your text, pick a conversion and copy the result.',
  },
  {
    id: 'features',
    title: 'What can it do?',
    body: 'Convert text to UPPERCASE or lowercase, copy or clear it, and see a live word count, character count and estimated reading time. It also has a light and dark theme that is remembered between visits.',
  },
  {
    id: 'privacy',
    title: 'Is my text sent anywhere?',
    body: 'No. Everything happens in your browser. Nothing you type is uploaded or stored on a server.',
  },
];

export default function About() {
  return (
    <div className="tu-card p-4 p-md-5 mx-auto" style={{ maxWidth: 820 }}>
      <h1 className="h3 fw-bold mb-4">About TextUtils</h1>
      <div className="accordion" id="aboutAccordion">
        {ITEMS.map((item, i) => (
          <div className="accordion-item" key={item.id}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${i === 0 ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#about-${item.id}`}
                aria-expanded={i === 0}
                aria-controls={`about-${item.id}`}
              >
                {item.title}
              </button>
            </h2>
            <div id={`about-${item.id}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#aboutAccordion">
              <div className="accordion-body">{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
