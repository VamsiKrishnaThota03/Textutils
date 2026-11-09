import React, { useState } from 'react';
import PropTypes from 'prop-types';

const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

export default function TextUpper({ heading, showAlert = () => {} }) {
  const [text, setText] = useState('');

  const apply = (transform, message) => {
    setText(transform(text));
    showAlert(message, 'success');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showAlert('Copied to clipboard', 'success');
    } catch {
      showAlert('Copy is not available in this browser', 'warning');
    }
  };

  const words = countWords(text);
  const minutes = Math.ceil(words / 200);
  const empty = text.length === 0;

  return (
    <div className="row g-4">
      <section className="col-lg-8">
        <div className="tu-card p-4 h-100">
          <label htmlFor="my-box" className="h4 fw-bold d-block mb-3">{heading}</label>
          <textarea
            className="form-control tu-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="my-box"
            rows="8"
            placeholder="Type or paste some text…"
          ></textarea>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <button type="button" className="btn btn-primary" disabled={empty} onClick={() => apply((t) => t.toUpperCase(), 'Converted to uppercase')}>
              Convert to uppercase
            </button>
            <button type="button" className="btn btn-primary" disabled={empty} onClick={() => apply((t) => t.toLowerCase(), 'Converted to lowercase')}>
              Convert to lowercase
            </button>
            <button type="button" className="btn btn-outline-secondary" disabled={empty} onClick={handleCopy}>
              Copy
            </button>
            <button type="button" className="btn btn-outline-danger ms-sm-auto" disabled={empty} onClick={() => apply(() => '', 'Text cleared')}>
              Clear
            </button>
          </div>
        </div>
      </section>

      <aside className="col-lg-4">
        <div className="tu-card p-4 h-100">
          <h2 className="h5 fw-bold mb-3">Text summary</h2>
          <div className="row g-2 mb-4 text-center">
            <div className="col-4"><div className="tu-stat p-2"><strong>{words}</strong><span className="small text-body-secondary">words</span></div></div>
            <div className="col-4"><div className="tu-stat p-2"><strong>{text.length}</strong><span className="small text-body-secondary">characters</span></div></div>
            <div className="col-4"><div className="tu-stat p-2"><strong>{minutes}</strong><span className="small text-body-secondary">min read</span></div></div>
          </div>
          <h2 className="h6 fw-bold">Preview</h2>
          <p className={`tu-preview mb-0 ${empty ? 'text-body-secondary fst-italic' : ''}`}>
            {empty ? 'Nothing to preview yet.' : text}
          </p>
        </div>
      </aside>
    </div>
  );
}

TextUpper.propTypes = {
  heading: PropTypes.string.isRequired,
  showAlert: PropTypes.func,
};
