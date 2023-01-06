use admin::Admin;
use input::input;
use mongodb::{options::ClientOptions, Client};

const DEFAULT_USERNAME: &str = "admin";
const DEFAULT_PASSWORD: &str = "admin";
const DEFAULT_MONGO_URI: &str = "mongodb://localhost:27017";
const DEFAULT_FIRST_TOKEN: &str = "https://click.snapchat.com/aVHG?&af_web_dp";

const DB_NAME: &str = "shortUrls";
const COLLECTION_NAME: &str = "users";

mod admin;
mod input;

#[tokio::main]
async fn main() {
    // Get the admin credentials from the user
    let username = input("Enter the admin username", DEFAULT_USERNAME);
    let password = input("Enter the admin password", DEFAULT_PASSWORD);
    let first_token = input("Enter the first token", DEFAULT_FIRST_TOKEN);
    let mongo_url = input("Enter the MongoDB connection string", DEFAULT_MONGO_URI);

    // Create the admin document
    let admin = Admin::new(username, password, first_token);

    // Client options
    let client_options = ClientOptions::parse(&mongo_url)
        .await
        .expect("Failed to parse MongoDB URL");

    // Connect to MongoDB
    let client = Client::with_options(client_options).expect("Failed to create MongoDB client");
    // Get the database
    let db = client.database(DB_NAME);
    // Get the collection
    let coll = db.collection(COLLECTION_NAME);

    // Insert the admin document
    coll.insert_one(admin, None)
        .await
        .expect("Failed to insert document");

    println!("Admin created successfully!");
}
