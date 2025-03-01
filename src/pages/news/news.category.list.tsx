import { Flex } from "@/module/module";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";



export async function getServerSideProps(context: any) {
    const { p, l, s, o, t } = context.query;
    const response = await axios.get(`http://localhost:3000/api/news/table/category?p=${p}&l=${l}&s=${s}&o=${o}`);
    return {
        props: {
            data: response.data.data,
            totalPages: response.data.totalPages,
            totalPosts: response.data.totalPosts,
            currentPage: response.data.currentPage,
            title: t ? t === "e" ? "Kategori Düzenle" : "Yeni Kategori" : "Kategori Listesi",
            path: t ? t === "e" ? "Kategori Düzenle" : "Yeni Kategori" : "Kategori Listesi",
        },
    };
}


const CategoryList = ({ props }: any) => {

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
        router.push(`/haberler/kategori?p=${p}&l=${e}${s}&o=${o}`)
    }
    const OnPage = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const l = params.get("l") || 10;
        const o = params.get("o") ? params.get("o") : "DESC";
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        router.push(`/haberler/kategori?p=${e}&l=${l}${s}&o=${o}`);
    };
    const OnSearch = (e: any) => {
        const params = new URLSearchParams(window.location.search);
        const p = 1;
        const l = params.get("l") || 10;
        const o = params.get("o") ? params.get("o") : "DESC";
        const s = e ? `&s=${decodeURIComponent(e)}` : ``
        router.push(`/haberler/kategori?p=${p}&l=${l}${s}&o=${o}`);
    }
    const [Order, setOrder] = useState<any>(1)
    const OnOrder = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const p = 1;
        const l = params.get("l") || 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = e === 1 ? "DESC" : "ASC"
        router.push(`/haberler/kategori?p=${p}&l=${l}${s}&o=${o}`);
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

    const Seo = (e: any) => {

        const turkishMap: any = {
            'ç': 'c',
            'Ç': 'C',
            'ğ': 'g',
            'Ğ': 'G',
            'ı': 'i',
            'I': 'I',
            'İ': 'i',
            'ö': 'o',
            'Ö': 'O',
            'ş': 's',
            'Ş': 'S',
            'ü': 'u',
            'Ü': 'U',
            ' ': '-',
            '/': '-',
            '&': 've',
            '.': '-',
        };
        return e.toLowerCase()
            .replace(/[çğışüöÇĞİŞÜÖ&/. ]/g, function (m: any) { return turkishMap[m]; })
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

    }


    return (
        <>
            <div className="d-flex mb-5">
                <div className="w-800px d-flex justify-content-start me-2">
                    <Flex.Search onChange={(e: any) => { OnSearch(e) }} SearchSession={"NewsCategory"} />
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
                    <button className="btn btn-primary fs-6 d-flex align-items-center" style={{ height: "43.52px" }} onClick={() => { router.push("/haberler/kategori?t=NEW") }}>
                        <i className="fa-solid fa-circle-plus fs-4"></i>
                        <div className="fs-7">Yeni Kategori</div>
                    </button>
                </div>
            </div>
            <table className="table bg-white table-striped table-bordered">
                <thead className="w-100">
                    <tr className="fw-bold fs-6 text-gray-800 bg-gray-200 border border-gray-400">
                        <th className="text-center">
                            <div className="fs-7">Id</div>
                        </th>
                        <th>
                            <div className="fs-7">Adı</div>
                        </th>
                        <th className="text-start">
                            <div className="fs-7">Tür</div>
                        </th>
                        <th className="text-start">
                            <div className="fs-7">Bağlı</div>
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
                                <tr key={`category-list-${x}`} className={`${parseInt(OldProgress) === d.id ? "bg-light-success" : ""} ${d.post_featured === 1 ? "bg-light-info" : ""} position-relative`}>
                                    <td>
                                        <div className="h-50px d-flex align-items-center justify-content-center fw-bold lh-sm">
                                            {d.id}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-50px d-flex align-items-center ">
                                            <div className="w-100">
                                                <div className="fs-6 fw-bold lh-sm mt-3">
                                                    {Capitalize(d.name)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-50px d-flex align-items-center ">
                                            <div className="w-100">
                                                <div className="fs-6 fw-bold lh-sm mt-3 popover-container">
                                                    <div className={`badge badge-light-primary border border-primary w-80px ${d.type === 1 ? "d-flex" : "d-none"}`}>
                                                        Üst Kategori
                                                    </div>
                                                    <div className={`badge badge-light-info border border-info w-80px ${d.type === 2 ? "d-flex" : "d-none"}`}>
                                                        Alt Kategori
                                                    </div>
                                                    <div className="popover">Kateorinin Konumunu Gösterir. Üst Kategori Header Logo sırasını belirtir.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-50px d-flex align-items-center justify-content-center">
                                            <div className="d-flex align-items-center justify-content-start text-light-secondary me-2  popover-container w-80px" style={{ borderRadius: "100%" }}>
                                                <b className="fw-bolder text-info fs-5">{d.total_posts}</b>
                                                <div className="popover">Bu Kategoriye Bağlı {d.total_posts} Haber Bulunmaktadır.</div>
                                            </div>
                                            <div className="w-100">
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">
                                                    Bağlı Haber var
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-50px d-flex align-items-center justify-content-center">
                                            <div className={`fs-7 fw-bold ${d.status === 0 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-regular fa-circle-xmark me-1 lh-sm text-danger fs-7"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-danger">Yayınlanmadı</div>
                                                <div className="popover">Kategoriniz Yayınlanmamış</div>
                                            </div>

                                            <div className={`fs-7 fw-bold ${d.status === 1 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-regular fa-circle-check me-1 lh-sm text-success fs-3"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-success">Yayında</div>
                                                <div className="popover">Kategoriniz Yayınlanmış</div>
                                            </div>

                                            <div className={`fs-7 fw-bold ${d.status === 2 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-solid fa-clock-rotate-left me-1 lh-sm text-warning fs-7"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-warning">Taslak</div>
                                                <div className="popover">Kategoriniz Taslak Olarak Kaydedilmiş</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-50px d-flex align-items-center justify-content-center">
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-regular fa-calendar-days fs-5 lh-sm"></i>
                                            </div>
                                            <div className="d-flex">
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">{ConvertDate(d.creation_date)}</div>
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">{ConvertTime(d.creation_date)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-50px d-flex align-items-center justify-content-center">
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { setDrawer("analytics"); setMonthly(d.monthly_views) }}>
                                                <i className="fa-solid fa-chart-simple fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { router.push(`/haberler/kategori?t=EDIT&n=${Seo(d.name)}&i=${d.id}`) }}>
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

                            <li
                                className={`page-item cursor-pointer m-1 ${currentPage == 1 ? "disabled" : ""}`}
                                onClick={() => currentPage > 1 && OnPage(currentPage - 1)}
                            >
                                <div className="page-link border border-gray-300">«</div>
                            </li>

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

                            {pages.map((pageNum) => (
                                <li
                                    key={pageNum}
                                    className={`page-item cursor-pointer m-1 ${currentPage == pageNum ? "active" : ""}`}
                                    onClick={() => OnPage(pageNum)}
                                >
                                    <div className="page-link border border-gray-300">{pageNum}</div>
                                </li>
                            ))}

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
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Kategori Analizi</a>
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
            <div className="drawer-overlay" onClick={() => { setDrawer("") }} style={{ zIndex: 109, display: Drawer !== "" ? "block" : "none" }}></div>
        </>
    )

}
const CategoryNew = ({ props }: any) => {
    const router = useRouter()

    const InputLabel = ({ t }: { t: any }) => {
        return (
            <>
                <label className="form-label mb-1 fs-6 text-gray-600 fw-bold">{t}</label>
            </>
        )
    }
    const SectionLabel = ({ t }: { t: any }) => {
        return (
            <>
                <div className="h-20px d-flex align-items-center p-4 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                    <div className="fs-6 fw-bold w-100">{t}</div>
                    <i className="fa-solid fa-angle-down fs-1"></i>
                </div>
            </>
        )
    }
    return (
        <>

            <div className="row">
                <div className="col-8">
                    <div className="card mb-5">
                        <SectionLabel t={"Haber İçerği"} />
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-12 mb-10">
                                    <div className="form-group">
                                        <InputLabel t={"Kategori Başlığı"} />
                                        <input className="form-control" placeholder="Kategori Başlığı" value={""} onChange={(e: any) => { }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Seo Başlığı"} />
                                        <input className="form-control" placeholder="Seo Başlığı" value={""} onChange={(e: any) => { }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Seo Açıklaması"} />
                                        <textarea className="form-control" placeholder="Seo Açıklaması" value={""} onChange={(e: any) => { }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Seo Anahtar Kelimeler"} />
                                        <Flex.Tagger value={""} onChange={(e: any) => { }} placeholder={"Anahtar kelime girin ve Enter'a basın"} />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card mb-5">
                        <SectionLabel t={"Haber İçerği"} />
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-12 mb-10">
                                    <div className="form-group">
                                        <InputLabel t={"Kategori Başlığı"} />
                                        <input className="form-control" placeholder="Kategori Başlığı" value={""} onChange={(e: any) => { }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Seo Başlığı"} />
                                        <input className="form-control" placeholder="Seo Başlığı" value={""} onChange={(e: any) => { }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Seo Açıklaması"} />
                                        <textarea className="form-control" placeholder="Seo Açıklaması" value={""} onChange={(e: any) => { }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky-container">
                <div className="sticky-inner shadow-sm border border-gray-300">
                    <div className="w-100 d-flex">
                        <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-paper-plane me-1"></i>
                                Yayınla
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>

                        <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off" hidden={true}>
                            <span className="indicator-label">
                                <i className="fa-solid fa-paper-plane me-1"></i>
                                Onaya Gönder
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>


                        <button type="button" className="btn btn-secondary btn-sm me-5 border border-gray-300" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-box-archive me-1"></i>
                                Taslak
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>

                        <button type="button" className="btn btn-secondary btn-sm border border-gray-300 me-20" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-eye me-1"></i>
                                Ön İzleme
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary btn-sm border border-gray-300" data-kt-indicator="off" onClick={() => { router.push("/haberler/kategori") }}>
                            <span className="indicator-label">
                                <i className="fa-regular fa-circle-left me-1"></i>
                                Listeye Geri Dön
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>


                </div>
            </div>
        </>
    )
}


function Page(props: { data: [], totalPages: any, totalPosts: any, currentPage: any }) {
    const { query } = useRouter()

    return (
        <>
            {query.t ? <CategoryNew /> : <CategoryList props={props} />}
        </>
    )
}
export default Page;

