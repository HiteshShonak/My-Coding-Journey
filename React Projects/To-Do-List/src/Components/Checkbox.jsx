import React from "react";
import styled from "styled-components";

const Checkbox = ({ checked, onChange, id, label }) => {
  return (
    <StyledWrapper>
      <label className="custom-checkbox" htmlFor={id}>
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className="checkmark" aria-hidden="true" />
        {label && <span className="label-text">{label}</span>}
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .custom-checkbox {
    display: inline-flex;
    align-items: center;
    gap: var(--gap-sm, 10px);
    cursor: pointer;
    user-select: none;
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.95);
  }

  /* Accessible, visually hidden checkbox input */
  .custom-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip-path: inset(50%);
    overflow: hidden;
  }

  .checkmark {
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.05);
    border: 1.4px solid rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(8px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.22);

    transition: background-color 180ms ease, border-color 180ms ease;
    position: relative;
  }

  /* Smooth SVG tick */
  .checkmark::before {
    content: "";
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M5 13l4 4L19 7'/></svg>");
    background-size: 100% 100%;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 150ms ease, transform 150ms ease;
  }

  /* Checked — clean, no glow */
  .custom-checkbox input[type="checkbox"]:checked + .checkmark {
    background: rgba(34, 197, 94, 0.9);
    border-color: rgba(34, 197, 94, 0.95);
    box-shadow: none;
  }

  .custom-checkbox input[type="checkbox"]:checked + .checkmark::before {
    opacity: 1;
    transform: scale(1);
  }

  /* Hover effect only */
  .custom-checkbox:hover .checkmark {
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  /* Subtle focus ring */
  .custom-checkbox input[type="checkbox"]:focus + .checkmark {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
  }

  .label-text {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
`;

export default Checkbox;
