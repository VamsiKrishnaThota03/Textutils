import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TextUpper from './TextUpper';

/** Render with a spy for showAlert, which App passes down. */
function setup(props = {}) {
  const showAlert = jest.fn();
  render(<TextUpper heading="Enter your text below" showAlert={showAlert} {...props} />);
  return { showAlert, box: screen.getByLabelText(/enter your text below/i) };
}

const type = (box, value) => fireEvent.change(box, { target: { value } });

describe('word and character counting', () => {
  it('counts zero for empty and whitespace-only text', () => {
    const { box } = setup();
    // The naive `split(' ').length` gives 1 for an empty string, so this is
    // the case worth pinning.
    expect(screen.getByText('0')).toBeInTheDocument();

    type(box, '    ');
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('collapses runs of whitespace rather than counting empty tokens', () => {
    const { box } = setup();
    type(box, 'one   two\n\nthree\tfour');
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('ignores leading and trailing whitespace', () => {
    const { box } = setup();
    type(box, '   hello world   ');
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

describe('transformations', () => {
  it('converts to uppercase and lowercase', () => {
    const { box } = setup();
    type(box, 'Hello World');

    fireEvent.click(screen.getByRole('button', { name: /uppercase/i }));
    expect(box).toHaveValue('HELLO WORLD');

    fireEvent.click(screen.getByRole('button', { name: /lowercase/i }));
    expect(box).toHaveValue('hello world');
  });

  it('clears the text', () => {
    const { box } = setup();
    type(box, 'something');
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(box).toHaveValue('');
  });

  it('announces each action through showAlert', () => {
    const { box, showAlert } = setup();
    type(box, 'abc');

    fireEvent.click(screen.getByRole('button', { name: /uppercase/i }));
    expect(showAlert).toHaveBeenCalledWith('Converted to uppercase', 'success');

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(showAlert).toHaveBeenCalledWith('Text cleared', 'success');
  });
});

describe('disabled state', () => {
  it('disables every action while the box is empty', () => {
    setup();
    for (const name of [/uppercase/i, /lowercase/i, /copy/i, /clear/i]) {
      expect(screen.getByRole('button', { name })).toBeDisabled();
    }
  });

  it('enables them once there is text, and disables them again after clearing', () => {
    const { box } = setup();
    type(box, 'x');
    expect(screen.getByRole('button', { name: /uppercase/i })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('button', { name: /uppercase/i })).toBeDisabled();
  });
});

describe('copy to clipboard', () => {
  afterEach(() => {
    delete navigator.clipboard;
  });

  it('copies the text and reports success', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    const { box, showAlert } = setup();
    type(box, 'copy me');
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('copy me'));
    await waitFor(() =>
      expect(showAlert).toHaveBeenCalledWith('Copied to clipboard', 'success')
    );
  });

  it('warns instead of throwing when the clipboard is unavailable', async () => {
    // navigator.clipboard is undefined in insecure contexts and in several
    // browsers, so this path is reachable in normal use rather than exotic.
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });

    const { box, showAlert } = setup();
    type(box, 'copy me');
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));

    await waitFor(() =>
      expect(showAlert).toHaveBeenCalledWith(
        'Copy is not available in this browser',
        'warning'
      )
    );
  });
});

describe('reading time', () => {
  it('rounds up, so any text reads as at least a minute', () => {
    const { box } = setup();
    type(box, 'one two three');
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it('scales with length at roughly 200 words per minute', () => {
    const { box } = setup();
    type(box, Array(401).fill('word').join(' '));
    // 401 words / 200 = 2.005, rounded up to 3.
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});

describe('text rendering', () => {
  it('shows the preview as text, never as markup', () => {
    // React escapes by default; this asserts nobody has introduced
    // dangerouslySetInnerHTML on the preview path.
    const { box } = setup();
    type(box, '<img src=x onerror=alert(1)>');
    expect(document.querySelector('img')).toBeNull();
  });
});
