import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// npx nodemon src/server.ts
// import yt_dlp

// def get_video_info(url):
//     with yt_dlp.YoutubeDL() as ydl:
//         info = ydl.extract_info(url, download=False)
//         return {
//             "title": info.get("title"),
//             "author": info.get("uploader"),
//             "length": info.get("duration"),
//             "views": info.get("view_count"),
//         }

// def download_video(url):
//     with yt_dlp.YoutubeDL({"format": "best"}) as ydl:
//         ydl.download([url])
//     return "Download completed!"

// # Example usage
// url = input("Enter YouTube video URL: ")
// print(get_video_info(url))
// print(download_video(url))
