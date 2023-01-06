use std::io;

pub fn input(msg: &str, default: &str) -> String {
    let mut input = String::new();

    println!("{} (default: {}):", msg, default);

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    input = input.trim().to_string();

    if input.is_empty() {
        input = default.to_string();
    }

    input
}
