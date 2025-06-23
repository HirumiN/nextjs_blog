import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

// (Penjelasan di luar kode)
// File ini mendefinisikan komponen Halaman Utama (Home) untuk aplikasi Next.js
// yang menggunakan App Router. Komponen ini bersifat 'async' karena perlu
// memproses 'searchParams' yang datang sebagai sebuah Promise.

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  // --- PENJELASAN BAGIAN 'query' DIMULAI DI SINI ---

  // 1. Mengambil Nilai dari URL Query Parameter
  //
  // `searchParams` adalah sebuah prop khusus yang disediakan oleh Next.js di dalam App Router.
  // Prop ini berisi parameter query dari URL. Contoh: jika URL adalah `/home?query=startup`,
  // maka `searchParams` akan berisi objek `{ query: 'startup' }`.
  //
  // Di Next.js, `searchParams` diberikan sebagai sebuah 'Promise'. Oleh karena itu, kita
  // harus menggunakan keyword `await` untuk "menunggu" dan mendapatkan objek yang sebenarnya.
  // `(await searchParams)` akan menghasilkan objek seperti `{ query: 'nilai_pencarian' }`.
  //
  // `.query` kemudian digunakan untuk mengakses properti 'query' dari objek tersebut.
  //
  // `|| ''` (Operator OR) digunakan sebagai nilai default.
  // - Jika `(await searchParams).query` ada isinya (misalnya, 'startup'), maka `query` akan bernilai 'startup'.
  // - Jika `(await searchParams).query` tidak ada (misalnya, URL hanya `/home` tanpa parameter),
  //   maka hasilnya akan `undefined`. Operator OR akan memberikan nilai fallback, yaitu string kosong `''`.
  // Ini memastikan variabel `query` selalu berupa string dan tidak pernah `undefined`,
  // sehingga aman untuk digunakan di komponen lain.
  const query = (await searchParams).query || '';

  const posts = [{
    _createdAt: new Date(),
    _id: '1',
    views: 100,
    author: { _id: '1' , name: 'John Doe', image: 'https://placehold.co/48x48' },
    description: 'This is a sample startup pitch description.',
    image: 'https://placehold.co/800?text=Hello+World&font=roboto',
    category: 'Tech',
    title: 'Sample Startup Pitch',
  }]
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
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard
                key={post?._id}
                post={post}
                index={index} />
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </ul>
      </section>
    </>
  );
}