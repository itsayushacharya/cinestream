// ============================================================
// WEB SERIES DATABASE
// ------------------------------------------------------------
// Extracted from the original contentDatabase (series section).
//
// To add a new series:
//   1. Copy any { ... } block below
//   2. Paste it before the closing ];
//   3. Fill in: id, title, genre, rating, poster,
//      streamUrl, releaseDate, description
//   4. Keep industry: "series" and type: "series"
// ============================================================

window.seriesDatabase = [
       {
        id: "Musafir-Cafe",
        title: "Musafir Cafe",
        type: "series",
        genre: "Drama",
        industry: "series", 
        rating: "7.1",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/1SbKjtoRKIpVQG5iYnumnfQIqhd.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt39665097",
        releaseDate: "2026-07-24",
        description: "Chander feels an undeniable connection with Sudha. Years later, he builds a new life in the hills with Preeti, but memories of the past linger."
    },
     {
        id: "Pritam-and-Pedro",
        title: "Pritam and Pedro",
        type: "series",
        genre: "Crime/Comedy",
        industry: "series", 
        rating: "8.3",
        poster: "https://image.tmdb.org/t/p/w500/uA5hAexR9Xis3BzSOMKjNuYQUsj.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt28077038",
        releaseDate: "2026-07-03",
        description: "The dynamic between the two contrasting personalities, a seasoned cop who prefers old-school methods and a tech-savvy cop who relies on modern technology for investigations, as they navigate their partnership in solving crimes."
    },
    {
        id: "A-Knight-of-the-Seven-Kingdoms",
        title: "A Knight of the Seven Kingdoms",
        type: "series",
        genre: "Epic/Dark Fantasy",
        industry: "series",
        rating: "8.6",
        poster: "https://m.media-amazon.com/images/M/MV5BYzg4M2U3YWMtMWY4MS00MzFkLTk2ZWQtOThiOGYxZDEyMGQ2XkEyXkFqcGc@._V1_.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt27497448",
        releaseDate: "2026-04-17",
        description: "A century before the events of 'Game of Thrones', Ser Duncan the Tall, and his squire, Egg, wander through Westeros while the Targaryen dynasty rule the Iron Throne."
    },
    {
        id: "The-Boys",
        title: "The Boys Season 1-5",
        type: "series",
        genre: "Satire/Dark Comedy",
        industry: "series",
        rating: "8.5",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhlx0wpKRG9fPPwRh9rXEV2Bw71HNMJHi5q3Q5q3iOxj09T1AxeWRwcg&s=10",
        streamUrl: "https://streamimdb.ru/embed/tv/tt1190634",
        releaseDate: "2026-04-08",
        description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers."
    },
    {
        id: "Matka-King",
        title: "Matka King",
        type: "series",
        genre: "Drama",
        industry: "series",
        rating: "7.2",
        poster: "https://m.media-amazon.com/images/M/MV5BNjg3ZmExNjctNGI3Yi00MWRlLWExYjMtODg5ZmE1Yjc4MTU2XkEyXkFqcGc@._V1_.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt16997004",
        releaseDate: "2026-04-17",
        description: "An enterprising cotton trader in Mumbai starts a new gambling game called Matka, taking the city by storm and democratizing a terrain previously reserved for the rich and elite."
    },
    {
        id: "gullak",
        title: "Gullak Season 1-5",
        type: "series",
        genre: "Family/Comedy/Drama",
        industry: "series",
        rating: "9.1",
        poster: "https://i.pinimg.com/736x/26/33/50/263350b944e1b0c5151cc9cb95b10b47.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt10530900",
        releaseDate: "2019-05-19",
        description: "Set in quaint by-lanes in the heart of India, Gullak is a collection of disarming and relatable tales of the Mishra family."
    },
    {
        id: "panchayat",
        title: "Panchayat Season 1-4",
        type: "series",
        genre: "Satire/Drama/Comedy",
        industry: "series",
        rating: "9.0",
        poster: "https://m.media-amazon.com/images/M/MV5BNjMwYWMxNjYtY2I2NC00OWE0LTg4MmQtMmI5ZGI2NzU4ODhiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt12004706",
        releaseDate: "2020-06-24",
        description: "A comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh."
    },
    {
        id: "taaza-khabar",
        title: "Taaza Khabar",
        type: "series",
        genre: "Thriller",
        industry: "series",
        rating: "8.0",
        poster: "https://m.media-amazon.com/images/M/MV5BNjAzMDEzZmUtYjgzMy00NTYxLWJlODItYTMyZGI4YzdmZGY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt22014226",
        releaseDate: "2023-01-06",
        description: "A Sanitation worker, how he stumbles upon magical powers which leads to a riveting new ride for the man, and how it stirs his humble life."
    },
    {
        id: "farzi",
        title: "Farzi",
        type: "series",
        genre: "Thriller",
        industry: "series",
        rating: "8.4",
        poster: "https://m.media-amazon.com/images/M/MV5BNDY2OWMxNzgtZGQ4Ny00ODI3LTk3MTAtYjM4N2U4ZGI3ZGY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        streamUrl: "https://streamimdb.ru/embed/tv/tt15477488",
        releaseDate: "2023-02-05",
        description: "Dive deep into a captivating, gritty fictionalization exploring the untold high-stakes underbelly of modern entertainment, power structures, and ambition."
    }
];