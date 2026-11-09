import React from 'react';
import PropTypes from 'prop-types';

export default function Alert({ alert }) {
  if (!alert) return null;
  return (
    <div className={`alert alert-${alert.type} tu-toast py-2`} role="status" aria-live="polite">
      {alert.mssg}
    </div>
  );
}

Alert.propTypes = {
  alert: PropTypes.shape({ mssg: PropTypes.string, type: PropTypes.string }),
};
