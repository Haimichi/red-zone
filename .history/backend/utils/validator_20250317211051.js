exports.validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

exports.validateRequired = (fields, data) => {
  const missing = fields.filter(field => !data[field]);
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(', ')}`);
};

