import { Flex } from "@/module/module";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export async function getServerSideProps(context: any) {
    const { p, l, s, o } = context.query;
    const response = await axios.get(`http://localhost:3000/api/news/table/news?p=${p}&l=${l}&s=${s}&o=${o}`);
    return {
        props: {

            data: response.data.data,
            totalPages: response.data.totalPages,
            totalPosts: response.data.totalPosts,
            currentPage: response.data.currentPage,

            title: "Haberler",
            path: "Haber Listesi"
        },
    };
}
function Page(props: { data: [], totalPages: any, totalPosts: any, currentPage: any }) {

    const router = useRouter()
    const [Tabs, setTabs] = useState<any>(3)
    const [Drawer, setDrawer] = useState<string>("")
    const [AuthorData, setAuthorData] = useState<any>([])
    useEffect(() => {
        const GetAuthors = async () => {
            const response = await axios.get("/api/authors/select")
            setAuthorData(response.data.data)
        }
        GetAuthors();
    }, [])
    const [CategoryData, setCategoryData] = useState<any>([])
    useEffect(() => {
        const GetCategory = async () => {
            const response = await axios.get("/api/news/category/select")
            setCategoryData(response.data.data)
        }
        GetCategory();
    }, [])

    const InputLabel = ({ t }: { t: any }) => {
        return (
            <>
                <label className="form-label mb-1 fs-6 text-gray-600 fw-bold">{t}</label>
            </>
        )
    }
    const ConvertDate = (dateString: string) => {
        if (!dateString) return "";
        const aylar = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];
        const date = new Date(dateString);
        const gun = date.getDate();
        const ay = aylar[date.getMonth()];
        const yil = date.getFullYear();
        const saat = date.getHours().toString().padStart(2, "0");
        const dakika = date.getMinutes().toString().padStart(2, "0");
        return `${gun} ${ay} ${yil}`;
    };
    const ConvertTime = (dateString: string) => {
        if (!dateString) return "";
        const aylar = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];
        const date = new Date(dateString);
        const gun = date.getDate();
        const ay = aylar[date.getMonth()];
        const yil = date.getFullYear();
        const saat = date.getHours().toString().padStart(2, "0");
        const dakika = date.getMinutes().toString().padStart(2, "0");
        return `${saat}:${dakika}`;
    };
    const FindAuthor = (id: any) => {
        const result = AuthorData.filter((f: any) => { return (f.id === id) })
        if (result.length > 0) {
            return `${result[0]["name"]} ${result[0]["surname"]}`
        } else {
            return ""
        }
    }
    const FindCategory = (id: any) => {
        const result = CategoryData.filter((f: any) => { return (f.id === id) })
        if (result.length > 0) {
            return `${result[0]["name"]}`
        } else {
            return ""
        }
    }
    const Capitalize = (text: any) => {
        if (!text) return '';
        const charMap: any = {
            'i': 'İ',
            'ı': 'I',
            'İ': 'i',
            'I': 'ı',
        };
        const result = text
            .split(' ')
            .map((word: any) => {
                const lowerCaseWord = word
                    .split('')
                    .map((char: any) => charMap[char] || char.toLowerCase())
                    .join('');
                const firstChar = charMap[lowerCaseWord.charAt(0)] || lowerCaseWord.charAt(0).toUpperCase();
                return firstChar + lowerCaseWord.slice(1);
            })
            .join(' ');
        return result;
    }



    const totalPages = props.totalPages;
    const currentPage = props.currentPage;
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const [Limit, setLimit] = useState<any>(10)
    const OnLimit = (e: any) => {
        const params: any = new URLSearchParams(window.location.search);
        const p = 1;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = params.get("o") ? params.get("o") : "DESC";
        router.push(`/haberler/liste?p=${p}&l=${e}${s}&o=${o}`)
    }
    const OnPage = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const l = params.get("l") || 10;
        const o = params.get("o") ? params.get("o") : "DESC";
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        router.push(`/haberler/liste?p=${e}&l=${l}${s}&o=${o}`);
    };
    const OnSearch = (e: any) => {
        const params = new URLSearchParams(window.location.search);
        const p = 1;
        const l = params.get("l") || 10;
        const o = params.get("o") ? params.get("o") : "DESC";
        const s = e ? `&s=${decodeURIComponent(e)}` : ``
        router.push(`/haberler/liste?p=${p}&l=${l}${s}&o=${o}`);
    }
    const [Order, setOrder] = useState<any>(1)
    const OnOrder = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const p = 1;
        const l = params.get("l") || 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = e === 1 ? "DESC" : "ASC"
        router.push(`/haberler/liste?p=${p}&l=${l}${s}&o=${o}`);
    };
    const OnEdit = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const p = params.get("p") ? params.get("p") : 1;
        const l = params.get("l") ? params.get("l") : 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = params.get("o") ? params.get("o") : "DESC";
        router.push(`/haberler/yeni?p=${p}&l=${l}${s}&o=${o}&i=${e}`);
    };
    const [OldProgress, setOldProgress] = useState<any>(0)
    useEffect(() => {
        const params: any = new URLSearchParams(window.location.search);
        setLimit(parseInt(params.get("l")))
        setOrder(params.get("o") === "ASC" ? 2 : 1)
        const i = params.get("i") ? params.get("i") : null;
        if (i) {
            setOldProgress(i)
        } else {
            setOldProgress(0)
        }

    }, [])
    const [Monthly, setMonthly] = useState<any>([])
    return (
        <>


            <div className="d-flex mb-5">
                <div className="w-800px d-flex justify-content-start">
                    <Flex.Search onChange={(e: any) => { OnSearch(e) }} SearchSession={"News"} />
                </div>
                <div className="w-100 d-flex justify-content-end">
                    <div className="me-2 w-225px" >
                        <Flex.Select.Single
                            value={Order}
                            data={[
                                { id: 1, value: "Tarihe Göre Azalan" },
                                { id: 2, value: "Tarihe Göre Artan" },

                            ]}
                            column={["id", "value"]}
                            placeholder="Gösteri (10)"
                            settings={{ search: false }}
                            onChange={(e: any) => {
                                setOrder(e)
                                OnOrder(e)
                            }}
                        />
                    </div>
                    <div className="me-2 w-150px" >
                        <Flex.Select.Single
                            value={Limit}
                            data={[
                                { id: 10, value: 10 },
                                { id: 25, value: 25 },
                                { id: 50, value: 50 },
                                { id: 150, value: 150 },
                                { id: 250, value: 250 },
                                { id: 500, value: 500 },
                            ]}
                            column={["id", "value"]}
                            placeholder="Gösteri (10)"
                            settings={{ search: false }}
                            onChange={(e: any) => {
                                setLimit(e)
                                OnLimit(e)
                            }}
                        />
                    </div>
                    <button className="btn btn-primary fs-6 d-none align-items-center" style={{ height: "43.52px" }} onClick={() => { setDrawer("filter") }}>
                        <i className="fa-solid fa-filter fs-4"></i>
                        <div className="fs-7">Gelişmiş Filtre</div>
                    </button>
                </div>
            </div>
            <table className="table bg-white table-striped table-bordered">
                <thead className="w-100">
                    <tr className="fw-bold fs-6 text-gray-800 bg-gray-200 border border-gray-400">
                        <th>
                            <div className="fs-7">İçerik</div>
                        </th>
                        <th>
                            <div className="fs-7">Medya Türü</div>
                        </th>
                        <th className="text-center">
                            <div className="fs-7">Durum</div>
                        </th>
                        <th className="text-center">
                            <div className="fs-7">Tarih</div>
                        </th>
                        <th className="text-center">
                            <div className="fs-7">İşlem</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (props.data || []).map((d: any, x: number) => {
                            return (
                                <tr key={`news-list-${x}`} className={`${parseInt(OldProgress) === d.id ? "bg-light-success" : ""} ${d.post_featured === 1 ? "bg-light-info" : ""} position-relative`}>

                                    <td className="w-500px">
                                        <div className="h-85px d-flex align-items-center ">
                                            <div className="w-200px h-85px me-4">
                                                <Flex.Imager src={`https://api.pusulaswiss.ch/upload/posts/${d.post_preview}`} />
                                            </div>
                                            <div className="w-100">
                                                <div className="d-flex ">
                                                    <div className="d-flex align-items-center me-5">
                                                        <div className="d-flex align-items-center justify-content-center bg-light-secondary me-1 h-20px w-20px" style={{ borderRadius: "100%" }}>
                                                            <i className="fa-solid fa-circle-user fs-7 text-gray-700 lh-sm"></i>
                                                        </div>
                                                        <div className="fs-7 fw-semibold text-gray-700">{FindAuthor(d.created_by)} {d.id}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex align-items-center justify-content-center bg-light-secondary me-1 h-20px w-20px" style={{ borderRadius: "100%" }}>
                                                            <i className="fa-solid fa-layer-group fs-7 text-gray-700 lh-sm"></i>
                                                        </div>
                                                        <div className="fs-7 fw-semibold text-gray-700">{Capitalize(FindCategory(d.post_category))}</div>
                                                    </div>
                                                </div>
                                                <div className="fs-6 fw-bold lh-sm mt-3">
                                                    {d.post_title}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-80px">
                                        <div className="h-85px d-flex align-items-center justify-content-center">
                                            <div className="d-flex align-items-center justify-content-center text-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-image fs-6 text-gray-500"></i>
                                                <div className="popover">Haber İçeriğine Galeri Eklenmiş</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-video fs-6 text-gray-500"></i>
                                                <div className="popover">Haber İçeriğine Video Eklenmiş</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-microphone fs-6 text-gray-500"></i>
                                                <div className="popover">Haber İçeriğine Ses Kaydı Eklenmiş</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-chart-pie fs-6 text-gray-500"></i>
                                                <div className="popover">Haberin SEO çalışması yapılmış</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-map-pin fs-6 text-gray-500"></i>
                                                <div className="popover">Bu Bir Etkinlik Haberi</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-paper-plane fs-6 text-gray-500"></i>
                                                <div className="popover">Haber 27.02.2025 - 17:25 tarihine Kadar Öne Çıkarılmış</div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-calendar-check fs-6 text-gray-500"></i>
                                                <div className="popover">27.02.2025 - 17:25 tarihi için Planlandı</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-50px">
                                        <div className="h-85px d-flex align-items-center justify-content-center">
                                            <div className={`fs-7 fw-bold ${d.post_status === 0 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-regular fa-circle-xmark me-1 lh-sm text-danger fs-7"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-danger">Yayınlanmadı</div>
                                                <div className="popover">Haberiniz Yayınlanmamış</div>
                                            </div>

                                            <div className={`fs-7 fw-bold ${d.post_status === 1 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-regular fa-circle-check me-1 lh-sm text-success fs-3"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-success">Yayında</div>
                                                <div className="popover">Haberiniz Yayınlanmış</div>
                                            </div>

                                            <div className={`fs-7 fw-bold ${d.post_status === 2 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-solid fa-clock-rotate-left me-1 lh-sm text-warning fs-7"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-warning">Taslak</div>
                                                <div className="popover">Haberiniz Taslak Olarak Kaydedilmiş</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-150px">
                                        <div className="h-85px d-flex align-items-center justify-content-center">
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-regular fa-calendar-days fs-5 lh-sm"></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">{ConvertDate(d.creation_date)}</div>
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">{ConvertTime(d.creation_date)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-50px">
                                        <div className="h-85px d-flex align-items-center justify-content-center">
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { setDrawer("analytics"); setMonthly(d.monthly_views) }}>
                                                <i className="fa-solid fa-chart-simple fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-paper-plane fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { OnEdit(d.id); }}>
                                                <i className="fa-solid fa-square-pen fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-danger toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-trash-can fs-6 text-gray-500"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="sticky-container">
                <div className="sticky-inner shadow-sm border border-gray-300">


                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <ul className="pagination pagination-outline mt-4">

                            {/* Önceki Sayfa */}
                            <li
                                className={`page-item cursor-pointer m-1 ${currentPage == 1 ? "disabled" : ""}`}
                                onClick={() => currentPage > 1 && OnPage(currentPage - 1)}
                            >
                                <div className="page-link border border-gray-300">«</div>
                            </li>

                            {/* İlk Sayfa ve "..." */}
                            {startPage > 1 && (
                                <>
                                    <li className="page-item cursor-pointer m-1" onClick={() => OnPage(1)}>
                                        <div className="page-link border border-gray-300">1</div>
                                    </li>
                                    <li className="page-item cursor-pointer m-1 disabled">
                                        <div className="page-link border border-gray-300">...</div>
                                    </li>
                                </>
                            )}

                            {/* Sayfa Numaraları */}
                            {pages.map((pageNum) => (
                                <li
                                    key={pageNum}
                                    className={`page-item cursor-pointer m-1 ${currentPage == pageNum ? "active" : ""}`}
                                    onClick={() => OnPage(pageNum)}
                                >
                                    <div className="page-link border border-gray-300">{pageNum}</div>
                                </li>
                            ))}

                            {/* Son Sayfa ve "..." */}
                            {endPage < totalPages && (
                                <>
                                    <li className="page-item cursor-pointer m-1 disabled">
                                        <div className="page-link border border-gray-300">...</div>
                                    </li>
                                    <li className="page-item cursor-pointer m-1" onClick={() => OnPage(totalPages)}>
                                        <div className="page-link border border-gray-300">{totalPages}</div>
                                    </li>
                                </>
                            )}

                            {/* Sonraki Sayfa */}
                            <li
                                className={`page-item cursor-pointer m-1 ${currentPage == totalPages ? "disabled" : ""}`}
                                onClick={() => currentPage < totalPages && OnPage(currentPage + 1)}
                            >
                                <div className="page-link border border-gray-300">»</div>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>


            <div className={`bg-white drawer drawer-end ${Drawer === "analytics" ? "drawer-on" : ""}`} style={{ width: "1200px" }}>
                <div className="card w-100 rounded-0">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Haberin Analizi</a>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" onClick={() => { setDrawer("") }}>
                                <i className="ki-duotone ki-cross fs-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Flex.Charter type="mounth" data={Monthly} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`bg-white drawer drawer-end ${Drawer === "filter" ? "drawer-on" : ""}`} style={{ width: "800px" }}>
                <div className="card w-100 rounded-0">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Filtre</a>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" onClick={() => { setDrawer("") }}>
                                <i className="ki-duotone ki-cross fs-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body hover-scroll-overlay-y">
                        <div className="row">
                            <div className="col-12 mb-5">
                                <InputLabel t={"Kelimeler"} />
                                <input
                                    style={{ paddingRight: 40 }}
                                    className="form-control"
                                    placeholder="Haberde Geçen Kelime Öbekleri"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-6 mb-5">
                                <InputLabel t={"Medya Türü"} />
                                <Flex.Select.Single
                                    data={[
                                        { id: 1, value: "Video Ekli" },
                                        { id: 2, value: "Galeri Ekli" },
                                        { id: 3, value: "Podcast Ekli" },
                                        { id: 4, value: "Etkinlik Haberi" },
                                        { id: 5, value: "Döküman Ekli" },
                                    ]}
                                    column={["id", "value"]}
                                    placeholder="Medya Türü"
                                    settings={{ search: false }}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-6 mb-5">
                                <InputLabel t={"Kategori"} />
                                <Flex.Select.Single
                                    data={CategoryData}
                                    column={["id", "name"]}
                                    placeholder="Katagori"
                                    settings={{ search: false }}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-6 mb-5">
                                <InputLabel t={"Başlangıç Tarihi"} />
                                <Flex.Picker.Date value={""} onChange={(e: any) => { }} />
                            </div>
                            <div className="col-6 mb-5">
                                <InputLabel t={"Bitiş Tarihi"} />
                                <Flex.Picker.Date value={""} onChange={(e: any) => { }} />
                            </div>
                        </div>
                        <div className="col-12 mb-5">
                            <div className="h-450px border border-gray-300 rounded-2 p-2 hover-scroll-overlay-y h-250px no-scrool">

                                <div className="card card-body p-2 mb-2">
                                    <div className="d-flex">
                                        <div>
                                            <Flex.Imager src={`https://api.pusulaswiss.ch/upload/posts/`} />
                                        </div>
                                        <div className="w-100 ms-2 h-80px d-flex align-items-center">
                                            <div>
                                                <div className="fw-semibold">kategori</div>
                                                <div className="fw-bold fs-5 lh-sm">Migros’tan büyük dönüşüm: Micasa satıldı, ‘Do it + Garden’ kapanıyor</div>
                                            </div>
                                        </div>
                                        <div className="ms-2 h-80px d-flex align-items-center">
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-chart-simple fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-paper-plane fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-square-pen fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-danger toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-trash-can fs-6 text-gray-500"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer pt-2 pb-2">
                        <button type="button" className="btn btn-primary me-5" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-paper-plane me-1"></i>
                                Filtrele
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="drawer-overlay" onClick={() => { setDrawer("") }} style={{ zIndex: 109, display: Drawer !== "" ? "block" : "none" }}></div>


        </>
    )
}
export default Page;