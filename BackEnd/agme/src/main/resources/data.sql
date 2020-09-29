INSERT INTO account (id, email, password, first_name, last_name) VALUES
  (1, 'admin@agme', 'admin1234', 'admin', 'account');

INSERT INTO admin (id, account_id) VALUES
  (1, (SELECT id from account WHERE id=1));

INSERT INTO service_name (service) VALUES
  ('Consult'),
  ('Appointment');