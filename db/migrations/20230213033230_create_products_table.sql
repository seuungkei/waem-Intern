-- migrate:up
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  thumbnail VARCHAR(1000) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  content VARCHAR(2000) NOT NULL,
  category_id INT NOT NULL,
  product_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(category_id) REFERENCES categories(id),
  FOREIGN KEY(product_status_id) REFERENCES product_status(id)
);

-- migrate:down
DROP TABLE products;
