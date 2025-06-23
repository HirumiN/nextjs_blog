// (Catatan Awal)
// Komponen ini adalah form pencarian. Tugasnya adalah untuk menampilkan input teks,
// menerima kata kunci pencarian dari pengguna, dan mengirimkannya kembali ke server
// ketika disubmit.

// Impor ini kemungkinan besar adalah sebuah kesalahan pengetikan atau merujuk
// pada komponen kustom (custom component) yang dibuat di dalam proyek ini.
// Next.js tidak memiliki komponen bawaan bernama 'next/form'.
// Seharusnya, ini adalah tag standar HTML `<form>`, atau sebuah komponen wrapper
// yang dibuat secara spesifik untuk proyek ini.
import Form from 'next/form' 

// Mengimpor komponen lain yang kemungkinan berfungsi sebagai tombol reset/hapus.
import { Search } from 'lucide-react';
import SearchFormReset from './SearchFormReset';

// Mendefinisikan komponen React bernama 'SearchForm'.
// Komponen ini menerima satu prop opsional bernama 'query' yang bertipe string.
// Prop ini didapat dari komponen induknya (dalam kasus sebelumnya, dari halaman Home).
const SearchForm = ({query} : {query? : string}) => {

    return (
        // - action="/": Ketika form disubmit, data akan dikirim ke halaman utama ('/').
        //   Ini akan menyebabkan halaman tersebut dirender ulang dengan searchParams baru.
        // - scroll={false}: Prop khusus Next.js yang mencegah browser scroll ke atas
        //   halaman setelah form disubmit. Ini memberikan pengalaman pengguna yang lebih mulus.
        <Form action="/" scroll={false} className="search-form">
            
            <input 
                type="text"
                // 'name' adalah atribut yang sangat penting. Ketika form disubmit, nilai dari
                // input ini akan dikirim dengan nama 'query'. Contoh: ?query=startup
                name='query'
                defaultValue={query}
                className='search-input'
                placeholder='Search Startups' 
            />
            <div className='flex gap-2'>
                {/* Ini adalah bagian untuk rendering kondisional.
                  Komponen <SearchFormReset /> (tombol reset) HANYA akan ditampilkan
                  JIKA variabel 'query' memiliki nilai (bukan string kosong atau undefined).
                  Ini adalah UX yang baik: tombol reset hanya muncul saat ada yang bisa di-reset.
                */}
                {query && (
                    <SearchFormReset />
                )}

                {/* Tombol untuk men-submit form */}
                <button type='submit' className='search-btn text-white'>
                    <Search/>
                </button>
            </div>
        </Form>
    )
}

export default SearchForm