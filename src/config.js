


const config = {};

//config.mongoUrl = "mongodb://localhost/nodeTests" ;

config.mongoUrl = "mongodb://admin:admin@ds123146.mlab.com:23146/kayed"
config.jwtSecret = "App"  ;
config.adminFirebase= {
  "type": "service_account",
  "project_id": "kayed-c0a37",
  "private_key_id": "8ba6b9a1330d935509771a4bd6d6950580b20b59",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyltMNKzdao1if\n4+OOprfhYky0gdg1Qt+cEna8H5Gl7Bmbl185PXrtL9MsIBSopuYHyHnd8YJiOaL0\nhcftVUZciBlfnO5RgdPaYsggw/Fdmh/oSvLTwq92SEmRlQDEuu9cGsAtAXbLElKF\nSYLa8m/q+spos17mbD+Obr2fuYgnOH7BHF5mPPuidZD9M5PixKla08yXfFpJcfhQ\nfGmnftAjvXulTdCuzrzz3kQrEcTtEC9cPHsKgjU0qqHYhIgjKcQJSibslNXuegvY\ndVPu5XXZvp0x/3U0ubREtw0PVhWJaIoldwZQkiGNfjQNPBUpVkBwGi7syK5wJOEb\nlfB9M44HAgMBAAECggEAKTD4hPUO020Rp+9cMS7rAqU1o/y+7an7AXiQwltVsLuA\nPI7xe7ZegA6j2m2b1jqInAr1cOefdyBsIZIpxugATp9lmtQLc+lJ//kAx+3p4fkG\nmwGOeKFS7ylFLrr7bmTfiJLy+G56A+S5+9w0vmNkxQILZZLZtLQLBMMuIYUdjk3q\npUsxOtycfncvsbkodjelFy8/Z98C5zTf3VWkT5MQl9FhGrmZuw4tlAv8+8jiJ52Y\nafUTLTOEhRU4+x5+SGrZ+l2AOeMzfCDnIxcxLEibroTGPiLj+RRFHh2crorxpfZK\niI+v8Ey4v/cxWRb+wicM39tyciUKxGpTGDAMuMTBwQKBgQDmZykIZ7N6t2YTS5H2\nfRvNkueaegkZNMpowdG3TIV2RWRspDVvvzWGVDQXLbnIsnjG/ySQ+xFS9LUDbgJ3\nS9znAa+VnGp/VMr4HyHDqZ9/bmu/Z7qb18O6YrafYCahzuKrZCRJ2S393bufeHxG\nqoDmUyKLP0QSVkF9oZPS7wQ9HwKBgQDGbgn8rKwy5Oa9sgX4/vWwyLrVy+op4AWr\n1hwjVGnedcmQUtChnoMM/e+pkoyoBCFmNBV006VsTKpjrWENIjReIHllw8/g3+01\nqcYctdTmg7QQeuxGBehBPknzIo7DT6A2tGoZV4p2y5p0VKikIwLkQlsdUSAhu6O3\n+h/W0W2qGQKBgQCvDn5stm31tVbHHkneoBv5y75Q7pvvHN8VTP4MaQWWYQ72RKWd\nLAh88YlKeyGHTaLaf4zG4xu8jdTisDkLbwZ+Nhe0cs2vxTsZ3n2G7mATMFCJc0Sj\nmAJMoSfkW+e+VTR/yGyR94MsOcaOWbsC7hVV6qB6cC1GSWclDxkD0TrFPQKBgCNI\nS6RO+6ttAg42ylMU2pDdkEMVqARcHgYI4yXxC4YPwZBU+V3Tdo/n0yZ+tV3mph2r\nIymLvH0+QInKuVgBffhCo/NRVvQwPNhu4JgYSMvYHTtU8BAfWsXHEpUVzvaxgNZZ\nTAhHhYpL96G5r+bHhusZVWQoGaOF3r2GzwR+ZpZ5AoGBAL4ubE8MsNzPXuIA4paB\nlLfYz5reho0DDaW7I5d8YIBUkCuZhzK2hXBwMcqfQTnT6DwjCHI/Z43jCFQG1bkl\nONQ23wesmJTVRNPJYDYC7FxD6cJvTfgQ7caaGWqiZwyO8GkB7NXZa53JVdTsZkvw\n4nyNgP4MMmjeMvokrx+xWexI\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-sx8wc@kayed-c0a37.iam.gserviceaccount.com",
  "client_id": "107537050566778411688",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sx8wc%40kayed-c0a37.iam.gserviceaccount.com"
};
config.serverKeyFirebase = "AAAAH1caNVA:APA91bHLvP5LVxrbM0gK-Rl6fkXqcCJ2vr8qR3uaugciPFb5-S5hHwSv6APihEeuZvNWgzGH0bFvdiTWydgJfvIqtI-RPhyXmgWHRXOepWGhmbDM9yN7n7VOfJbWIj-qsrDwCLYgrr80"
config.clientUrl = "localhost:4200"
export default config ;
