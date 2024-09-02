use actix_files as fs;
use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use tera::{Tera, Context};
use actix_web::web::Data;
use actix_files::NamedFile;     
use mime;




async fn tera_index(tera: web::Data<Tera>) -> impl Responder {
    let mut ctx = Context::new();
    ctx.insert("name", "Lukas Frotton");

    match tera.render("index.html", &ctx) {
        Ok(rendered) => HttpResponse::Ok().content_type("text/html").body(rendered),
        Err(_) => HttpResponse::InternalServerError().body("Template error"),
    }
}

async fn svelte_index() -> impl Responder {
    NamedFile::open("./static/svelte/index.html")
        .unwrap()
        .set_content_type(mime::TEXT_HTML_UTF_8)
}

async fn svelte_assets(path: web::Path<String>) -> impl Responder {
    let file_path = format!("./static/svelte/_app/immutable/{}", path.into_inner());
    
    // if the file path ends with .css set the correct MIME type
    if file_path.to_lowercase().ends_with(".css") {
        println!("Serving CSS file: {}", file_path);
        return NamedFile::open(file_path)
            .unwrap()
            .set_content_type(mime::TEXT_CSS_UTF_8);
    } else{
        NamedFile::open(file_path)
            .unwrap()
            .set_content_type(mime::APPLICATION_JAVASCRIPT) // Set correct MIME type
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let tera = Tera::new(concat!(env!("CARGO_MANIFEST_DIR"), "/static/templates/**/*")).unwrap();

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(tera.clone()))  // Share the Tera instance
            .route("/", web::get().to(tera_index))  // Route for the Tera template
            .service(
                fs::Files::new("/static", "./static")
                    .index_file("index.html"), // Set index file for static dir
            )
            .service(web::resource("/svelte").route(web::get().to(svelte_index)))  // Route for the Svelte template
            .service(web::resource("/_app/immutable/{filename:.*}").route(web::get().to(svelte_assets)))  // Serve Svelte assets with correct MIME type
        })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
