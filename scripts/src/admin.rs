use bcrypt::hash;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Admin {
    username: String,
    password: String,
    first_token: String,
    role: String,
    code: String,
    should_redirect_on_limit: bool,
}

impl Admin {
    pub fn new(username: String, password: String, first_token: String) -> Self {
        let hashed_password = hash(password, 10).unwrap();

        Admin {
            username,
            password: hashed_password,
            first_token,
            role: "admin".to_string(),
            code: "".to_string(),
            should_redirect_on_limit: true,
        }
    }
}
