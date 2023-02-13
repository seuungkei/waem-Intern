-- migrate:up
CREATE TABLE product_status (
  id INT NOT NULL AUTO_INCREMENT,
  status VARCHAR(20) NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE product_status;
