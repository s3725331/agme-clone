INSERT INTO user (id, username, password, full_name) VALUES
  (1, 'admin@agme', 'admin1234', 'admin');

INSERT INTO admin (id, user_id) VALUES
  (1, (SELECT id from user WHERE id=1));

INSERT INTO service_name (service) VALUES
  ('Consult'),
  ('Appointment');

INSERT INTO role (name) VALUES
  ('ROLE_CUSTOMER'),
  ('ROLE_WORKER'),
  ('ROLE_ADMIN')