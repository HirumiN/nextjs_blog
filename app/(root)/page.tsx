import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/query";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

// (Penjelasan di luar kode)
// File ini mendefinisikan komponen Halaman Utama (Home) untuk aplikasi Next.js
// yang menggunakan App Router. Komponen ini bersifat 'async' karena perlu
// memproses 'searchParams' yang datang sebagai sebuah Promise.

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
 
  const query = (await searchParams).query || '';
  const params = {search : query || null};
  const {data : posts} = await sanityFetch({query: STARTUP_QUERY, params});


  console.log(JSON.stringify(posts, null, 2));


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch your startup, <br /> connect with entrepreneurs</h1>
        <p className=" sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        {/*
          2. Menggunakan Variabel `query`
          
          Variabel `query` yang sudah kita dapatkan dari URL tadi kemudian
          diteruskan (passed) sebagai prop ke komponen <SearchForm />.
          
          Ini memungkinkan komponen <SearchForm /> untuk menampilkan nilai pencarian
          awal sesuai dengan apa yang ada di URL. Misalnya, jika pengguna membuka
          URL `/?query=AI`, maka input pencarian di dalam <SearchForm /> akan
          langsung terisi dengan tulisan "AI".
        */}
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query
            ? `Showing results for "${query}"` : 'All startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard
                key={post?._id}
                post={post}
              />
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}