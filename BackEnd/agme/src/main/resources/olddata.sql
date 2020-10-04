INSERT INTO user (id, username, password, first_name, last_name, address) VALUES
  (1, 'admin1@agme', '$2a$10$Hg2dEleOIioj0g2WT6EF7eWWYW719QPa19Gwqm3YfvIQzaDD0LgHW', 'admin', 'user', 'na');

INSERT INTO admin (id, user_id) VALUES
  (1, (SELECT id from user WHERE id=1));

INSERT INTO service_name (service) VALUES
  ('Consult'),
  ('Appointment');

INSERT INTO role (name) VALUES
  ('ROLE_CUSTOMER'),
  ('ROLE_WORKER'),
  ('ROLE_ADMIN')